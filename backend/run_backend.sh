# On Linux 
javac -cp .:mysql-connector-j-9.2.0.jar -d out csvtodb/*.java && java -cp .:mysql-connector-j-9.2.0.jar:out csvtodb.Main 
