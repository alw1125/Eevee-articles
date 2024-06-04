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
    private UserListModelAdaptor model;
    private JTable table;
    private JLabel imgSprite;
    private JLabel nameLabel;
    private JLabel id;


    public UserPanel(User user, OperationFrame operationFrame, JTable table, UserListModelAdaptor model) throws MalformedURLException {
        this.operationFrame=operationFrame;
        this.model = model;
        this.table=table;

        setLayout(new GridLayout(3, 1));
        nameLabel = new JLabel("Name: " + user.getFirstName());
        id = new JLabel(("ID" + user.getId()));
        userId = user.getId();

        delete = new JButton("delete");
        back = new JButton("Go back");

        imgSprite = new JLabel();
        String url = "http://localhost:3000" + user.getAvatar();
        url.replaceAll("\\s+","");
        System.out.println(url);
        imgSprite.setIcon(new ImageIcon(new URL(url)));
        imgSprite.setBounds(10,10,100,100);

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
            System.out.println("Hi");
            int index = table.getSelectedRow();
            System.out.println("INDEX IS "+index);
            operationFrame.switchToLogin();

        }

    }
}





