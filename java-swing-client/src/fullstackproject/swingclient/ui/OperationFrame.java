package fullstackproject.swingclient.ui;

import fullstackproject.swingclient.pojos.User;
import fullstackproject.swingclient.ui.Jpanels.MainPage;
import fullstackproject.swingclient.ui.Jpanels.UserPanel;

import javax.swing.*;
import java.awt.*;
import java.net.MalformedURLException;


public class OperationFrame extends JFrame {
    private CardLayout cardLayout;
    private JPanel cardPanel;
    private UserListModelAdaptor userListModelAdaptor;

    public OperationFrame(String title) {
        setTitle(title);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        cardLayout = new CardLayout();
        cardPanel = new JPanel(cardLayout);
        MainPage loginFrameContent = new MainPage(this);

        cardPanel.add(loginFrameContent, "login");

        Container visibleArea = getContentPane();
        visibleArea.add(cardPanel);
        cardLayout.show(cardPanel, "login");

        pack();
        setLocationRelativeTo(null);





    }

   public void switchToTable() {
       cardLayout.show(cardPanel, "User List");
   }

   public  void switchToUserPanel(User user) throws MalformedURLException {
       UserPanel userFrameContent = new UserPanel(user, this, userListModelAdaptor);
       cardPanel.add(userFrameContent, "User Profile");
       cardLayout.show(cardPanel, "User Profile");

   }

   public void switchToLogin(){
       cardLayout.show(cardPanel, "login");

   }
    public static void main(String[] args) {
        SwingUtilities.invokeLater(new Runnable() {
            @Override
            public void run() {
                OperationFrame frame = new OperationFrame("Admin");
                frame.setVisible(true);
            }
        });
    }

}
