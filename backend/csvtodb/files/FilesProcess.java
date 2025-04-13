package csvtodb.files;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

import csvtodb.database.DataBaseServer;

public class FilesProcess {

    private static Connection connection;
	

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

	// Clean data
	public void cleanData(List<String[]> data) {
		
		return;
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

