package csvtodb.files;

import java.io.BufferedWriter;
import java.io.BufferedReader;
import java.io.FileWriter;
import java.io.FileReader;
import java.io.IOException;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.HashSet;
import java.util.Set;


import csvtodb.database.DataBaseServer;

public class FilesProcess {

    private static Connection connection;
//	private static String patter = "(){}[]""";

    public FilesProcess(Connection connection) {
        connection = connection;
    }
	
	public static boolean ConnectionExist() {
		try {
            return (connection != null && !connection.isClosed());
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
	}
	
	public static void setConnection(Connection connection) {
		if(connection == null) return;
		connection = connection;
	}
	
	public static Connection getConnection() {
		if(ConnectionExist()) {
			return connection;
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

    public String[] getFirstRow(List<String[]> data) {
        return data.get(0);        
    }

	public List<String[]> substractData(List<String[]> data, int start, int end) {
		List<String[]> newdata = new ArrayList<>();
		if (start < 0 || end > data.size() || start >= end) {
			System.err.println("Invalid range for substraction.");
			return newdata; // return empty list if range is invalid
		}
		for (int i = start; i < end; i++) {
			newdata.add(data.get(i));
		}
		return newdata;
	}

/*
	public boolean isNumber() {
		"11111", "11", "11.1", "111", "11,11",
	}
	
	public boolean isTimeStamp() {
		 "M/D/Y H:M"
	}
	
	public boolean isStatus() {
		"Shipped" "Disputed" "Cancelled" "On Hold" "Resolved"  "In Process"
	}
*/
	public Set<String> addNewElementWithNoRedundant(List<String[]> list, int index) {
		Set<String> mySet = new HashSet<>();
		String[] columns = readValueWithIndex(list, index);
		for(String walked : columns) {
			mySet.add(walked);
		} return mySet;
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
	
	public void ReadAndWriteColumnCSVwithIndex(String filepath, String filename, int index) {
		try (
			BufferedReader in = new BufferedReader(new FileReader(filepath));
			BufferedWriter  out = new BufferedWriter(new FileWriter(filename))
		) {
			String line;
			boolean isFirstLine = true;
			
			while((line = in.readLine()) != null) {
				String[] values = line.split(",");
				
				if(isFirstLine) {
					out.write(values[0]); // Write column name
					isFirstLine = false;
				} else if (values.length > 0) {
					out.write(values[index]); // Then write value from column
				}
				out.newLine();
				
			}
			System.out.println("ReadAndWriteColumnCSVwithIndex: write to " + filename + " successfull");
			
		} catch(IOException e) {
			System.err.println("ReadAndWriteColumnCSVwithIndex: error." + e.getMessage());
			e.printStackTrace();
		}
			
	}
	
	public int getLength(List<String[]> data) {
		return data.size();
	}
	
	public String[] readValueWithIndex(List<String[]> data, int index) {
		if (data == null || data.isEmpty()) {
			System.err.println("readValueWithIndex: data list is null or empty");
			return null;
		}

		String[] result = new String[data.size()]; 

		for (int i = 0; i < data.size(); i++) {
			String[] row = data.get(i);

			if (row == null) {
				System.err.println("readValueWithIndex: row " + i + " is null");
				result[i] = null; // or continue to the next row
				continue;
			}

			// Ensure the index is within bounds for the current row
			if (index >= row.length) {
				System.err.println("Invalid index " + index + " for row " + i + " (row length: " + row.length + ")");
				result[i] = null;  // or assign a default value or continue to the next row
			} else {
				result[i] = row[index];
			}
		}

		return result;
	}


	
	
	

	/*
		Only work if the table is not exists
			or when its does, the columns in the csv file must be matched with the one on db
	*/ 
    public static int uploadCSVToDB(List<String[]> data, String tableName) {
		
		if(data.isEmpty()) {
			System.err.println("CSV file is empty");
			return -1;
		}
		
		if(tableName.equalsIgnoreCase("")) {
			System.err.println("modify table name in main");
			return -1;
		}
		
		DataBaseServer.createNewTable(tableName, data);
		DataBaseServer.addDataToTable(tableName, data);	
		return 0;
    }



	

	



}

