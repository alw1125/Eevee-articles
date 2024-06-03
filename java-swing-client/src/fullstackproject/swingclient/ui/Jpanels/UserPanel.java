package fullstackproject.swingclient.ui.Jpanels;

import fullstackproject.swingclient.pojos.User;
import fullstackproject.swingclient.ui.OperationFrame;
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
    UserListModelAdaptor model;
    private JLabel imgSprite;


    public UserPanel(User user, OperationFrame operationFrame, UserListModelAdaptor model) throws MalformedURLException {
        this.operationFrame=operationFrame;
        this.model = model;

        setLayout(new GridLayout(3, 1));
        JLabel nameLabel = new JLabel("Name: " + user.getFirstName());

        JLabel id = new JLabel(("ID" + user.getId()));
        userId = user.getId();

        delete = new JButton("delete");
        back = new JButton("Go back");

        imgSprite = new JLabel();
        String url = "http://localhost:3000" + user.getAvatar();
        url.replaceAll("\\s+","");
        System.out.println(url);
        imgSprite.setIcon(new ImageIcon(new URL(url)));

        this.setLayout(new GridBagLayout());












        this.add(imgSprite);
        this.add(nameLabel);
        this.add(id);
        this.add(delete);
        this.add(back);


        delete.addActionListener(this);
        back.addActionListener(this);


    }

    @Override
    public void actionPerformed(ActionEvent e) {
        if(e.getSource()==delete) {
            try {

                API.getInstance().removeUser(userId);
                System.out.println("Deleted go look at database.");
                operationFrame.switchToLogin();

            } catch (IOException ex) {
                throw new RuntimeException(ex);
            } catch (InterruptedException ex) {
                throw new RuntimeException(ex);
            }
        }

        if(e.getSource()==back) {
            System.out.println("Hi");
            operationFrame.switchToLogin();
        }

    }
}





