package myapp.payload;

public class AuthRequest {

    private String maillogin;
    private String password;

    public AuthRequest() {}

    public AuthRequest(String maillogin, String password) {
        this.maillogin = maillogin;
        this.password = password;
    }

    public String getMaillogin() {
        return maillogin;
    }

    public void setMaillogin(String maillogin) {
        this.maillogin = maillogin;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
