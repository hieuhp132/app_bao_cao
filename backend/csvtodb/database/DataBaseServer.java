package csvtodb.database;

import java.sql.*;
import java.util.List;
import java.util.ArrayList;

public class DataBaseServer implements AutoCloseable {

    private static final String JDBC_URL = "jdbc:mysql://localhost:3306/training";
    private static final String JDBC_USERNAME = "root";
    private static final String JDBC_PASSWORD = "123321";

    private static Connection connection;

    // Create the connection (if not already)
    public DataBaseServer() throws SQLException {
        if (!ConnectionExist()) {
            System.out.println("Init database connection");
            try {
                Class.forName("com.mysql.cj.jdbc.Driver");
            } catch (ClassNotFoundException e) {
                e.printStackTrace();
            }
            connection = DriverManager.getConnection(JDBC_URL, JDBC_USERNAME, JDBC_PASSWORD);
            System.out.println("Connected to the database.");
        }
    }

    // display column data types from a specific table
    public static void checkColumnDataTypes(String tableName) {
        try {
            if(!ConnectionExist()) {
                System.out.println("checkColumnDataTypes: no available connection found");
                return;
            }

            // Get the metadata of the database
            DatabaseMetaData dbMeta = connection.getMetaData();

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


	
	// Define datatyp depend on values at column index
	public static String inferDataType(List<String[]> data, int columnIndex) {
		String header = data.get(0)[columnIndex].toLowerCase();
		String firstValue = data.get(1)[columnIndex];

		// Force VARCHAR for fields like phone, zip, etc.
		if (header.contains("phone") || header.contains("mobile") || header.contains("tel")) {
			return "VARCHAR(20)";
		}

		if (firstValue.matches("-?\\d+")) {
			// If value is longer than 10 digits, treat it as string to avoid int overflow
			if (firstValue.length() > 9) {
				return "VARCHAR(20)";
			}
			return "INT";
		} else if (firstValue.matches("-?\\d*\\.\\d+")) {
			return "FLOAT";
		} else if (firstValue.matches("\\d{4}-\\d{2}-\\d{2}")) {
			return "DATE";
		} else {
			return "VARCHAR(255)";
		}
	}	
	
	/*
		Query example:
				CREATE TABLE IF NOT EXISTS users (
				id INT AUTO_INCREMENT PRIMARY KEY,
				username VARCHAR(255),
				password VARCHAR(255),
				email VARCHAR(255),
				created_at DATE,
				updated_at DATE
			);
			   where the data type will be converted by function: String inferDataType(data, columnIndex)
	*/
	private static String createTableQueryString(String tableName, List<String[]> data) throws SQLException {
		
		StringBuilder query = new StringBuilder("CREATE TABLE IF NOT EXISTS " + tableName + " (id INT AUTO_INCREMENT PRIMARY KEY, ");

		
		// Get column names (first row of the CSV)
		String[] columns = data.get(0);
		
		// Loop through columns to create column definitions
		for(int i = 0; i < columns.length; i++) {
			String columnName = columns[i];
			String dataType = inferDataType(data, i);
			query.append(columnName).append(" ").append(dataType);
			
			// Add comma after each column definition except the last one
			if(i < columns.length-1) {
				query.append(", ");
			}
		}
		query.append(");");
		return query.toString();
	}
	public static int createNewTable(String tableName, List<String[]> data) {
		
		String query_1 = null;
        try {
            query_1 = createTableQueryString(tableName, data);  // Handle SQLException
			// Step 2: Execute the CREATE TABLE query
			try (Statement stmt = connection.createStatement()) {
				stmt.executeUpdate(query_1);
				System.out.println("Table created or already exists.");
				return 0; // Return 0 successfully created
	
			} catch (SQLException e) {
				System.err.println("createNewTable. Error create new table: " + tableName);
				e.printStackTrace();
				return -1;  // Return -1 if query execution fails
			}	
        } catch (SQLException e) {
            e.printStackTrace();
            return -1;  // Return -1 if table creation fails
        }

		
	}
	
	public static int addDataToTable(String tableName, List<String[]> data) {
		// Step 3: Insert data into the table
		String insertQuery = createInsertQueryString(data, tableName);
		try (PreparedStatement pstmt = connection.prepareStatement(insertQuery))	{
			for(int i = 1; i < data.size(); i++) {
				
				String[] row = data.get(i);
				int paramIndex = 1;
				
				for(int j = 0; j < data.get(0).length; j++) {
					if (!data.get(0)[j].equalsIgnoreCase("id")) {
						pstmt.setString(paramIndex++, row[j]);
					}
				} pstmt.addBatch(); // Add to batch for performance
			} pstmt.executeBatch(); // execute the batch inserted
			
			System.out.println("Data inserted to table.");
			return 0;
			
			
		} catch(SQLException e) {
			System.err.println("addDataToTable: Error inserting data");
			e.printStackTrace();
			return -2;
		}
	}


	/*
		Query example:
			INSERT INTO users (username, password, email, created_at, updated_at) VALUES (?, ?, ?, ?, ?);

	*/
	private static String createInsertQueryString(List<String[]> data, String tableName) {
		StringBuilder query = new StringBuilder("INSERT INTO " + tableName + " (");

		String[] columns = data.get(0);
		List<String> colList = new ArrayList<>();
		for (String col : columns) {
			if (!col.equalsIgnoreCase("id")) {
				colList.add(col);
			}
		}

		query.append(String.join(", ", colList)).append(") VALUES (");
		query.append("?,".repeat(colList.size()));
		query.setLength(query.length() - 1); // remove trailing comma
		query.append(");");

		return query.toString();
	}

    // Check if a connection with database is exists
    public static boolean ConnectionExist() {
        try {
            if(connection == null || connection.isClosed()) {
                System.err.println("ConnectionExist: The connection is not exists");
                return false;
            }
        } catch(SQLException e) {
            e.printStackTrace();
        }
        return true;
    }


	

    public static Connection getConnection() {
        
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

