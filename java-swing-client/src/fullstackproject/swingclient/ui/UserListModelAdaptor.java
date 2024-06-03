package fullstackproject.swingclient.ui;

import fullstackproject.swingclient.pojos.User;
import fullstackproject.swingclient.pojos.UserList;

import javax.swing.table.AbstractTableModel;

public class UserListModelAdaptor extends AbstractTableModel {
        private UserList userList;

        public UserListModelAdaptor(UserList userList) {
            this.userList = userList;
        }

        @Override
        public int getRowCount() {
            return userList.size();
        }

        @Override
        public int getColumnCount() {

            return 8;
        }

        @Override
        public Object getValueAt(int rowIndex, int columnIndex) {
            User user = userList.get(rowIndex);

            switch (columnIndex) {
                case 0:
                    return user.getId();
                case 1:
                    return user.getUsername();
                case 2:
                    return user.getFirstName();
                case 3:
                    return user.getLastName();
                case 4:
                    return user.getDob();
                case 5:
                    return user.getAdminStatus();
                case 6:
                    return user.getDesc();
                case 7:
                    return user.getAvatar();
                case 8:
                    return user.getPassword();
                default:
                    throw new IllegalArgumentException("Unexpected columnIndex");
            }
        }

        @Override
        public String getColumnName(int column) {
            switch (column) {
                case 0:
                    return "ID";
                case 1:
                    return "Username";
                case 2:
                    return "First Name";
                case 3:
                    return "Last Name";
                case 4:
                    return "DOB";
                case 5:
                    return "Admin Status";
                case 6:
                    return "Description";
                case 7:
                    return "Avatar";
                case 8:
                    return "Password";
                default:
                    throw new IllegalArgumentException("Unexpected column");
            }
        }
}
