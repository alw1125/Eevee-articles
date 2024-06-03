package fullstackproject.swingclient.ui.Jpanels;

import fullstackproject.swingclient.pojos.DeleteQuery;
import fullstackproject.swingclient.pojos.User;
import fullstackproject.swingclient.web.API;

import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.IOException;

public class UserPanel extends JPanel implements ActionListener {
    JButton delete;
    int userId;


    public UserPanel(User user) {
        setLayout(new GridLayout(3, 1)); // Example layout, adjust as needed
        JLabel nameLabel = new JLabel("Name: " + user.getFirstName());

        JLabel id = new JLabel(("ID" + user.getId()));
        userId = user.getId();

        delete = new JButton("delete");




        this.add(nameLabel);
        this.add(id);
        this.add(delete);

        delete.addActionListener(this);


    }

    @Override
    public void actionPerformed(ActionEvent e) {
        if(e.getSource()==delete) {
            try {
//                DeleteQuery deleteQuery = new DeleteQuery();
//                deleteQuery.setUsername(userId);
//                deleteQuery.setIsAdmin(1);
                API.getInstance().removeUser(userId);
                System.out.println("Deleted go look at database.");
            } catch (IOException ex) {
                throw new RuntimeException(ex);
            } catch (InterruptedException ex) {
                throw new RuntimeException(ex);
            }
        }

    }
}





