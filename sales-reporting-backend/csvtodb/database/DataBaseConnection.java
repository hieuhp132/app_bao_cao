package csvtodb.database;

import java.sql.*;
import java.util.List;

public class DataBaseConnection implements AutoCloseable {

    private static final String JDBC_URL = "jdbc:mysql://localhost:3306/training";
    private static final String JDBC_USERNAME = "root";
    private static final String JDBC_PASSWORD = "123321";

    private Connection connection;

    // Create the connection (if not already)
    public DataBaseConnection() throws SQLException {
        if (!ConnectionExist()) {
            System.out.println("Init database connection");
            try {
                Class.forName("com.mysql.cj.jdbc.Driver");
            } catch (ClassNotFoundException e) {
                e.printStackTrace();
            }
            this.connection = DriverManager.getConnection(JDBC_URL, JDBC_USERNAME, JDBC_PASSWORD);
            System.out.println("Connected to the database.");
        }
    }

    // Check column data types for a specific table
    public void checkColumnDataTypes(String tableName) {
        try {
            if(!ConnectionExist()) {
                System.out.println("checkColumnDataTypes: no available connection found");
                return;
            }

            // Get the metadata of the database
            DatabaseMetaData dbMeta = this.connection.getMetaData();

            // Query for columns of the specific table
            ResultSet columns = dbMeta.getColumns(null, null, tableName, null);
        
            // If there are no columns, print a message
            if(!columns.next()) {
                System.out.println("Table '" + tableName + "' does not exist or has no columns");
                return;
            }

            // Iteration over the result set and print column name and data types
            System.out.println("Columns data types for talbe: " + tableName);
            do {
                String columnName = columns.getString("COLUMN_NAME");
                String columnType = columns.getString("TYPE_NAME");
                System.out.println("Column: " + columnName + " | DataType: " + columnType);
            } while(columns.next());

        } catch(SQLException e) {
            System.out.println("checkColumnDataTypes: Error fetching column data types for table: " + tableName);
            e.printStackTrace();
        }
    }

    // Check if a connection with database is exists
    public boolean ConnectionExist() {
        try {
            if(this.connection == null || this.connection.isClosed()) {
                System.err.println("ConnectionExist: The connection is not exists");
                return false;
            }
        } catch(SQLException e) {
            e.printStackTrace();
        }
        return true;
    }


    public Connection getConnection() {
        
        if (!ConnectionExist()) {
            System.err.println("getConnection: Connection is not available. Call createConnection() first.");
            
        }
         
        return connection;
    }

    

    @Override
    public void close() throws SQLException {
        if (ConnectionExist()) {
            connection.close();
            System.out.println("Database connection closed.");
        }
    }
}

