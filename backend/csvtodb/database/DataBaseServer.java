package csvtodb.database;

import java.sql.*;
import java.util.List;
import java.util.ArrayList;
import java.util.regex.Pattern; // Import this

public class DataBaseServer implements AutoCloseable {

    private static final String JDBC_URL = "jdbc:mysql://localhost:3306/training";
    private static final String JDBC_USERNAME = "root";
    private static final String JDBC_PASSWORD = "123321";

    private static Connection connection;

	private static final Pattern DATETIME_PATTERN = Pattern.compile("\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}:\\d{2}");

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
                System.out.println("checkColumnDataTypes: Table '" + tableName + "' does not exist or has no columns");
                return;
            }

            // Iteration over the result set and print column name and data types
            System.out.println("checkColumnDataTypes: Columns data types for talbe: " + tableName);
            do {
                System.out.print("     ");
                String columnName = columns.getString("COLUMN_NAME");
                System.out.print("     ");
                String columnType = columns.getString("TYPE_NAME");
                System.out.print("     ");
                System.out.println("Column: " + columnName + " | DataType: " + columnType);
            } while(columns.next());

        } catch(SQLException e) {
            System.out.println("checkColumnDataTypes: Error fetching column data types for table: " + tableName);
            e.printStackTrace();
        }
    }

    public static String inferDataType(List<String[]> data, int columnIndex) {
        if (data.size() < 2) return "VARCHAR(255)";  // Not enough data to infer

        // Get the header (column name) and the first data value for this column
        String header = data.get(0)[columnIndex].toLowerCase();
        String value = data.get(1)[columnIndex];  // Check the second row for sample data

        // Handle phone columns first for optimization
        if (isPhoneColumn(header)) {
            return "VARCHAR(20)";
        }

        // Check if the value is a valid integer or float, with a short-circuit for speed
        if (isInteger(value)) {
            return (value.length() > 9) ? "VARCHAR(20)" : "INT";
        }
        if (isFloat(value)) {
            return "FLOAT";
        }

        if (isDateTime(value)) {
            return "DATETIME";
        }

        // Check if the value is a boolean (true/false or 1/0)
        if (isBoolean(value)) {
            return "BOOLEAN";
        }

        // Default to VARCHAR with a reasonable maximum length of 255
        return "VARCHAR(255)";
    }

    private static boolean isPhoneColumn(String header) {
        return header.contains("phone") || header.contains("mobile") || header.contains("tel");
    }

    private static boolean isInteger(String value) {
        // A fast check to see if the value is a valid integer
        try {
            Integer.parseInt(value);
            return true;
        } catch (NumberFormatException e) {
            return false;
        }
    }

    private static boolean isFloat(String value) {
        // Fast check for float, considering edge cases like negative numbers or decimal points
        try {
            Float.parseFloat(value);
            return true;
        } catch (NumberFormatException e) {
            return false;
        }
    }

    private static boolean isDateTime(String value) {
		
        // Use precompiled regex for fast matching of datetime format
        return DATETIME_PATTERN.matcher(value).matches();
    }

    private static boolean isBoolean(String value) {
        // Check for boolean values (true/false or 1/0)
        return value.equalsIgnoreCase("true") || value.equalsIgnoreCase("false") || value.equals("1") || value.equals("0");
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

