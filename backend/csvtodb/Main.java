package csvtodb;

import csvtodb.database.DataBaseServer;
import csvtodb.files.FilesProcess;

import java.util.concurrent.TimeUnit;

import java.util.List;
import java.util.ArrayList;
import java.sql.SQLException;

public class Main {

	public static void loadData() {
		System.out.println("...................");
	}

    public static void printCharacter(char token, int len) {
        for(int i = 0; i < len; i++) {
            System.out.print(token);
        } System.out.println();
    }
    // Method to create the header style using StringBuilder
    public static String header() {
        StringBuilder header = new StringBuilder();
        
        // Adding the header line and the formatted title
        header.append("--------****-------------------------------------Header------------------------------------------------------------\n");
        header.append("--------****-------------------------------------------------------------------------------------------------------\n");
        
        // Return the header as a string
        return header.toString();
    }

    // Method to create the footer style using StringBuilder
    public static String footer() {
        StringBuilder footer = new StringBuilder();
        
        // Adding the footer line and the formatted footer text
        footer.append("--------****-------------------------------------------------------------------------------------------------------\n");
        footer.append("--------****-------------------------------------Footer------------------------------------------------------------\n"); 
        
        // Return the footer as a string
        return footer.toString();
    }

    public static void main(String[] args) {

        String csvPath = "./csvtodb/sales_data_sample.csv";
        String tableName = "orders1";

        System.out.print(Main.header());

        try(DataBaseServer dbs = new DataBaseServer()) {
            Main.printCharacter('*', Main.header().length() / 2);
                System.out.println("DATABASE PARTS");
                dbs.checkColumnDataTypes(tableName);    
            Main.printCharacter('*', Main.header().length() / 2);
            
            Main.printCharacter('*', Main.header().length() / 2);
                System.out.println("FILESPROCESSOR PARTS");

				// Create FilesProcess instance with database connection
				FilesProcess filesProcess = new FilesProcess(dbs.getConnection());
				
				Main.loadData();
				List<String[]> csvData = filesProcess.readCSV(csvPath);
				
				if(csvData != null) System.out.println("csv file read and store success.");
				
				// Upload CSV data to the database
				filesProcess.uploadCSVToDB(csvData, tableName);
					
            Main.printCharacter('*', Main.header().length() / 2);

        } catch(SQLException e) {
            System.err.println("Main: .");
            e.printStackTrace();
        } 
        


        // Read CSV File
/*        if(FilesProcess.readCSV("csvtodb/sales_data_sample.csv") != -1) {
            System.out.println("read CSV successful");
        } else {
            System.err.println("read CSV failed");
        }
*/
        
        Main.footer();

    }

}
