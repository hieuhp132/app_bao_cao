package myapp.config;
public class MySqlConnector extends DatabaseConnect {
    @Override
    public void connect() {
        System.out.println("Đã kết nối tới Mysql: " + getUrl());
    }
}
