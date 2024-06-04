package fullstackproject.swingclient.web;

import fullstackproject.swingclient.pojos.User;
import fullstackproject.swingclient.pojos.LoginQuery;
import fullstackproject.swingclient.pojos.UserList;
import fullstackproject.swingclient.util.JSONUtils;

import java.io.IOException;
import java.net.CookieManager;
import java.net.HttpCookie;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.util.List;

public class API {
    private static API instance;

    private static final String BASE_URL = "http://localhost:3000/api";

    public static API getInstance() {
        if (instance == null) {
            instance = new API();
        }
        return instance;
    }

    private final CookieManager cookieManager;
    private final HttpClient client;

    private API() {
        this.cookieManager = new CookieManager();

        this.client = HttpClient.newBuilder()
                .version(HttpClient.Version.HTTP_1_1)
                .followRedirects(HttpClient.Redirect.NEVER)
                .connectTimeout(Duration.ofSeconds(10))
                .cookieHandler(this.cookieManager)
                .build();
    }

    public User logIn(LoginQuery typeQuery) throws IOException, InterruptedException {
        String json = JSONUtils.toJSON(typeQuery);
        HttpRequest.Builder builder = HttpRequest.newBuilder()
                .uri(URI.create(BASE_URL + "/auth/login"))
                .setHeader("Content-Type", "application/json")
                .setHeader("Accept", "application/json")
                .method("POST", HttpRequest.BodyPublishers.ofString(json));

        HttpRequest request = builder.build();

        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        String responseJson = response.body();
        int statusCode = response.statusCode();


        if (statusCode == 200) {
            return JSONUtils.toObject(responseJson, User.class);
        } else if (response.statusCode() == 403 || responseJson.contains("Forbidden")) {
            throw new IOException("Unauthorised: User does not have the necessary permissions.");
        } else {
            throw new IOException("Unexpected response status: " + response.statusCode());
        }
    }

    public void logOut () throws IOException, InterruptedException {
        System.out.println("Log out is being called");

        HttpRequest.Builder builder = HttpRequest.newBuilder()
                .uri(URI.create(BASE_URL + "/auth/logout"))
                .method("POST", HttpRequest.BodyPublishers.noBody());

        HttpRequest request = builder.build();

        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());


    }

    public UserList getUserList() throws IOException, InterruptedException {
        HttpRequest.Builder builder = HttpRequest.newBuilder()
                .uri(URI.create(BASE_URL + "/users/admin"))
                .setHeader("Content-Type", "application/json")
                .setHeader("Accept", "application/json")
                .method("GET", HttpRequest.BodyPublishers.noBody());

        HttpRequest request = builder.build();

        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        String responseJson = response.body();
        int statusCode = response.statusCode();
        if (statusCode==200) {
            List<User> users = JSONUtils.toList(responseJson, User.class);
            return new UserList(users);
        }
        else if (statusCode==401) {throw new IOException("Unauthorised user");}
        else if (statusCode==403) {throw  new IOException("User needs to be an admin to access");}
        else throw new IOException("Unexpected response status: " + response.statusCode());


    }

    public void removeUser(int userId) throws IOException, InterruptedException {

        String json = "{ \"user_id\": " + userId + " }";

        HttpRequest.Builder builder = HttpRequest.newBuilder()
                .uri(URI.create(BASE_URL + "/users/" + userId))
                .setHeader("Content-Type", "application/json")
                .setHeader("Accept", "application/json")
                .method("DELETE", HttpRequest.BodyPublishers.ofString(json));

        HttpRequest request = builder.build();

        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        String responseJson = response.body();


    }

}
