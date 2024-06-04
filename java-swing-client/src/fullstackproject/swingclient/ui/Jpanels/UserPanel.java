package fullstackproject.swingclient.ui.Jpanels;

import fullstackproject.swingclient.pojos.User;
import fullstackproject.swingclient.OperationFrame;
import fullstackproject.swingclient.ui.UserListModelAdaptor;
import fullstackproject.swingclient.web.API;

import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;

public class UserPanel extends JPanel implements ActionListener {
    JButton delete;
    JButton back;
    int userId;
    private OperationFrame operationFrame;
    private UserListModelAdaptor model;
    private JTable table;
    private JLabel imgSprite;
    private JLabel firstName;
    private JLabel lastName;


    public UserPanel(User user, OperationFrame operationFrame, JTable table, UserListModelAdaptor model) throws MalformedURLException {
        this.operationFrame = operationFrame;
        this.model = model;
        this.table = table;

        userId=user.getId();

        setLayout(new BorderLayout(10, 10));

        imgSprite = new JLabel();
        String url = "http://localhost:3000" + user.getAvatar();
        ImageIcon imageIcon = new ImageIcon(new URL(url));
        Image image = imageIcon.getImage().getScaledInstance(100, 100, Image.SCALE_SMOOTH);
        imgSprite.setIcon(new ImageIcon(image));

        JPanel imagePanel = new JPanel(new GridBagLayout());
        imagePanel.add(imgSprite);
        add(imagePanel, BorderLayout.CENTER);

        JPanel infoPanel = new JPanel(new FlowLayout());
        firstName = new JLabel("First Name: " + user.getFirstName());
        lastName = new JLabel("Last Name: " + user.getLastName());
        infoPanel.add(firstName);
        infoPanel.add(Box.createHorizontalStrut(10));
        infoPanel.add(lastName);
        add(infoPanel, BorderLayout.NORTH);

        JPanel buttonPanel = new JPanel(new FlowLayout());
        delete = new JButton("Delete");
        back = new JButton("Go back");
        buttonPanel.add(delete);
        buttonPanel.add(Box.createHorizontalStrut(10));
        buttonPanel.add(back);
        add(buttonPanel, BorderLayout.PAGE_END);

        delete.addActionListener(this);
        back.addActionListener(this);
    }


    @Override
    public void actionPerformed(ActionEvent e) {
        if(e.getSource()==delete) {
            try {

                API.getInstance().removeUser(userId);

                int index = table.getSelectedRow();

                model.removeRow(index);
                model.update();
                operationFrame.switchToLogin();

            } catch (IOException ex) {
                throw new RuntimeException(ex);
            } catch (InterruptedException ex) {
                throw new RuntimeException(ex);
            }
        }

        if(e.getSource()==back) {

            int index = table.getSelectedRow();

            operationFrame.switchToLogin();

        }

    }
}





