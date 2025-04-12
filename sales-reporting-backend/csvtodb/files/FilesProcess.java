package csvtodb.files;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

import csvtodb.database.DataBaseConnection;

public class FilesProcess {

    private Connection connection;


    public FilesProcess(Connection connection) {
        this.connection = connection;
    }
	
	public boolean ConnectionExist() {
		try {
            return (this.connection != null && !this.connection.isClosed());
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
	}
	
	public void setConnection(Connection connection) {
		if(this.connection == null) return;
		this.connection = connection;
	}
	
	public Connection getConnection() {
		if(ConnectionExist()) {
			return this.connection;
		} return null;
	}

    public void printData(List<String[]> data)  {
        for(String[] d : data) {
            for(String walked : d) {
                System.out.print(walked + " ");
            } System.out.println();             
        }
    }

    public List<String[]> updateData(List<String[]> data) {
        return null;
    }

    public String[] getFirstColumn(List<String[]> data) {
        return data.get(0);        
    }

    public List<String[]> substractData(List<String[]> data, int start, int end) {
        List<String[]> newdata = new ArrayList<>();
        String[] tmp = null;
        String[] line = null;
        for(int i = start; i < end; i++) {
            tmp = new String[data.get(i).length];
            line = data.get(i);
            for(int j = 0; j < tmp.length; j++) {
                tmp[j] = line[j];
            }   newdata.add(tmp);        
        } return newdata;
    }


    public List<String[]> readCSV(String filePath) {
        List<String[]> data = new ArrayList<>();
        try (BufferedReader br = new BufferedReader(new FileReader(filePath))) {
            String line;
            while ((line = br.readLine()) != null) {
                data.add(line.split(","));
            }
        } catch (IOException e) {
            System.err.println("Error reading file: " + filePath);
            e.printStackTrace();
            return null;
        }
        return data;
    }

	/*
		Only work if the table is not exists
			or when its does, the columns in the csv file must be matched with the one on db
	*/ 
    public int uploadCSVToDB(List<String[]> data, String tableName) {
		
		if(data.isEmpty()) {
			System.err.println("CSV file is empty");
			return -1;
		}
		
        // Step 1: Create the SQL query to create the table
        String query_1 = null;
        try {
            query_1 = createTableQueryString(tableName, data);  // Handle SQLException
        } catch (SQLException e) {
            e.printStackTrace();
            return -1;  // Return -1 if table creation fails
        }
		
        // Step 2: Execute the CREATE TABLE query
        try (Statement stmt = this.connection.createStatement()) {
            stmt.executeUpdate(query_1);
            System.out.println("Table created or already exists.");

            // Step 3: Insert data into the table
            String insertQuery = createInsertQueryString(data, tableName);
			try (PreparedStatement pstmt = this.connection.prepareStatement(insertQuery))	{
				for(int i = 1; i < data.size(); i++) {
					String[] row = data.get(i);
					for(int j = 0; j < row.length; j++) {
						pstmt.setString(j+1, row[j]);
					} pstmt.addBatch(); // Add to batch for performance
				} pstmt.executeBatch(); // execute the batch inserted
				
				System.out.println("Data inserted to table.");
				return 0;
				
				
			} catch(SQLException e) {
				System.err.println("uploadCSVToDB: Error inserting data");
				e.printStackTrace();
				return -2;
			}

        } catch (SQLException e) {
            System.err.println("Error create new table: " + tableName);
            e.printStackTrace();
            return -1;  // Return -1 if query execution fails
        }		
		
    }


	public String inferDataType(List<String[]> data, int columnIndex) {
		String firstValue = data.get(1)[columnIndex];
		if(firstValue.matches("-?\\d+")) {
			// Integer
			return "INT";
		} else if(firstValue.matches("-?\\d*\\.\\d+")) {
			// Floating point number
			return "FLOAT";
		} else if(firstValue.matches("\\d{4}-\\d{2}-\\d{2}")) {
			// Date in YYYY-MM-DD format
			return "DATE";
		} else {
			// Default to VARCHAR for strings
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
	private String createTableQueryString(String tableName, List<String[]> data) throws SQLException {
		
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
	
	/*
		Query example:
			INSERT INTO users (username, password, email, created_at, updated_at) VALUES (?, ?, ?, ?, ?);

	*/
	private String createInsertQueryString(List<String[]> data, String tableName) {
		StringBuilder query = new StringBuilder("INSERT INTO " + tableName + " (");
		
		// Get column names (first row of CSV)
		String[] columns = data.get(0);
		for(int i = 0; i < columns.length; i++) {
			query.append(columns[i]);
			if(i < columns.length - 1) {
				query.append(", ");
			}
		}
		query.append(") VALUES (");
		
        // Create placeholders for the values (?)
        for (int i = 0; i < columns.length; i++) {
            if (!columns[i].equalsIgnoreCase("id")) { // Exclude id
                query.append("?");
                if (i < columns.length - 1) {
                    query.append(", ");
                }
            }
        }
		query.append(");");
		
		return query.toString();
	}

}

