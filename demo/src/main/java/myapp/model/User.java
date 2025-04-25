package myapp.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String userName;
    private String userEmail;
    private String userRole;
    private String userState;
    public User() {}
    // Constructor with parameters
    public User(String userName, String userEmail, String userRole,
                   String userState) {
        this.userName = userName;
        this.userEmail = userEmail;
        this.userRole = userRole;
        this.userState = userState;
    }

// Getter and Setter for 'id'
public Long getId() {
    return id;
}

public void setId(Long id) {
    this.id = id;
}

// Getter and Setter for 'userName'
public String getUserName() {
    return userName;
}

public void setUserName(String userName) {
    this.userName = userName;
}

// Getter and Setter for 'userEmail'
public String getUserEmail() {
    return userEmail;
}

public void setUserEmail(String userEmail) {
    this.userEmail = userEmail;
}

// Getter and Setter for 'userRole'
public String getUserRole() {
    return userRole;
}

public void setUserRole(String userRole) {
    this.userRole = userRole;
}

// Getter and Setter for 'userState'
public String getUserState() {
    return userState;
}

public void setUserState(String userState) {
    this.userState = userState;
}
    // Add getter and setter for country if necessary
}
