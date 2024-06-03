package fullstackproject.swingclient.ui.Jpanels;

import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import fullstackproject.swingclient.pojos.User;
import fullstackproject.swingclient.pojos.LoginQuery;
import fullstackproject.swingclient.pojos.UserList;
import fullstackproject.swingclient.ui.OperationFrame;
import fullstackproject.swingclient.ui.UserListModelAdaptor;
import fullstackproject.swingclient.web.API;
import java.io.IOException;
import java.net.MalformedURLException;

import javax.swing.event.ListSelectionEvent;
import javax.swing.event.ListSelectionListener;


public class MainPage extends JPanel implements ActionListener {
    private JButton logInButton;
    private JButton resetButton;
    private JTextField userNameTextField1;
    private JPasswordField passwordField1;

    private JLabel userNameLabel;
    private JLabel passwordLabel;

    private OperationFrame operationFrame;

    private JButton logoutButton;

    private UserList list;
    private JTable table;

    private JScrollPane tablePane;

    public MainPage(OperationFrame operationFrame) {
        this.operationFrame=operationFrame;
        this.setLayout(null);
        setPreferredSize(new Dimension(500,400));


        beforeLogin();
    }

    @Override
    public void actionPerformed(ActionEvent e) {
        if (e.getSource() == logInButton) {
            String username = userNameTextField1.getText();
            String password = new String(passwordField1.getPassword());

            LoginQuery type = new LoginQuery();
            type.setUsername(username);
            type.setPassword(password);
            try {
                User loggedInUser = API.getInstance().logIn(type);
                if (loggedInUser != null) {
                    System.out.println("Login successful");
                  afterLogin();
                } else {
                    System.out.println("Login failed");
                }
            } catch (Exception ex) {
                System.out.println("Error during login: " + ex.getMessage());
            }
        } else if (e.getSource() == resetButton) {
            userNameTextField1.setText("");
            passwordField1.setText("");
        }
    }

    private void beforeLogin() {
        logInButton = new JButton("Login");
        logInButton.setBounds(150, 150, 100, 40);
        resetButton = new JButton("Clear");
        resetButton.setBounds(270, 150, 100, 40);
        userNameTextField1 = new JTextField();
        userNameTextField1.setBounds(150, 50, 300, 20);
        passwordField1 = new JPasswordField();
        passwordField1.setBounds(150, 90, 300, 20);
        userNameLabel = new JLabel("Username");
        userNameLabel.setBounds(50, 40, 100, 40);
        passwordLabel = new JLabel("Password");
        passwordLabel.setBounds(50, 80, 100, 40);
        this.add(userNameLabel);
        this.add(userNameTextField1);
        this.add(passwordLabel);
        this.add(passwordField1);
        this.add(logInButton);
        this.add(resetButton);
        logInButton.addActionListener(this);
        resetButton.addActionListener(this);

    }

    private void afterLogin() throws IOException, InterruptedException {

        this.removeAll();
        UserList preList= API.getInstance().getUserList();
        if(preList ==null){
            API.getInstance().logOut();
            System.out.println("Logout successful");
            reset();
        }
        list = preList;

       initTable();



       logoutButton = new JButton("Logout");
        logoutButton.setBounds(150, 150, 100, 40);
        this.add(logoutButton);


        logoutButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                try {
                    API.getInstance().logOut();
                    System.out.println("Logout successful");
                    reset();
                } catch (IOException | InterruptedException ex) {
                    System.out.println("Error during logout: " + ex.getMessage());
                }
            }
        });

        this.revalidate();
        this.repaint();
    }

    private void reset (){
        this.removeAll();
        beforeLogin();
        this.revalidate();
        this.repaint();
    }

    private void initTable() {
        table = new JTable(new UserListModelAdaptor(list));
        table.getSelectionModel().addListSelectionListener(new ListSelectionListener() {
            @Override
            public void valueChanged(ListSelectionEvent e) {
                if (!e.getValueIsAdjusting()) {
                    int selectedRow = table.getSelectedRow();
                    if (selectedRow != -1) {
                        User selectedUser = list.get(selectedRow);
                        try {
                            operationFrame.switchToUserPanel(selectedUser);
                        } catch (MalformedURLException ex) {
                            throw new RuntimeException(ex);
                        }
                    }
                }
            }
        });

        tablePane = new JScrollPane(table);
        tablePane.setBounds(50, 200, 400, 150);
        this.add(tablePane);
    }
}
