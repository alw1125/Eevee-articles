package fullstackproject.swingclient.pojos;

public class DeleteQuery {
    private int userId;
    private int isAdmin;

    public DeleteQuery() {

    }


    public int getUserId() {
        return userId;
    }

    public void setUsername(int userId) {
        this.userId = userId;
    }

    public int getIsAdmin() {
        return isAdmin;
    }

    public void setIsAdmin(int isAdmin) {
        this.isAdmin = isAdmin;
    }
}

