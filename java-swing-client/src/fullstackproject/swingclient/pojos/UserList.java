package fullstackproject.swingclient.pojos;
import java.util.List;

public class UserList {

        private List<User> users;


        public UserList(List<User> users) {
            this.users = users;
        }


        public void setUsers(List<User> users) {
            this.users = users;
        }


        public int size() {
            return users.size();
        }

        public User get(int index) {
            return users.get(index);
        }

        public int getIndex(User user) {
            return users.indexOf(user);
        }
}
