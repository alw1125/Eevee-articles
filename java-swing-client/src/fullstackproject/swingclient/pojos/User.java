package fullstackproject.swingclient.pojos;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Date;

public class User {

    @JsonProperty("user_id")
    private int userId;
    private String username;
    private String firstName;
    private String lastName;
    private Date dob;
    @JsonProperty("is_admin")
    private int adminStatus;
    private String desc;

    private String avatar;

    private String password;

     public int getId() {
        return userId;
    }

    public void setId(int user_id) {
        this.userId = user_id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }


    public Date getDob() {
        return dob;
    }

    public void setDob(Date dob) {
        this.dob = dob;
    }

    public int getAdminStatus() {
        return adminStatus;
    }

    public void setAdminStatus(int adminStatus) {
        this.adminStatus = adminStatus;
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public String getPassword(){return password;}
}
