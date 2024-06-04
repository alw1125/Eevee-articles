package fullstackproject.swingclient.pojos;
import fullstackproject.swingclient.ui.Listener;

import java.util.Iterator;
import java.util.List;

public class UserList  {

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

    public void remove(int index) {
        if (index >= 0 && index < users.size()) {users.remove(index);} }

    public void removeIfAdmin() {
        Iterator<User> iterator = users.iterator();
        while (iterator.hasNext()) {
            User user = iterator.next();
            if (user.getAdminStatus() == 1) {
                iterator.remove();
            }
        }
    }



}
