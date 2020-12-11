/**
INFO3130 Final Assignment: database.js

Created By: Michael Pantaleon
Email: mpantaleon5818@conestogac.on.ca

 * General purpose error handler
 * @param tx The transaction
 * @param error The error object

**/

var db;

function errorHandler(tx, error) {
    console.error("SQL error: " + tx + " (" + error.code + ") -- " + error.message);
}

function successTransaction(){
    console.info("Success: transaction is successful");
}

var DB ={ 
    CreateDatabase: function(){
        var shortName = "ContactDB";
        var version = "1.0";
        var displayName = "DB for Feedback DB app";
        var dbSize = 2 * 1024 * 1024;

        console.info("Creating Database ...");
        db = openDatabase(shortName, version, displayName, dbSize, dbCreateSuccess);

        function dbCreateSuccess(){
            console.info("Success: Database creation successful");
        }
    },
    CreateTables: function(){
        function txFunction(tx){
            var options = [];
            
            // 1. declare sql for drop table then call execute sql
            var sql = "DROP TABLE IF EXISTS type;";
            console.info("Droping table: type");
            tx.executeSql(sql, options, successCreate, errorHandler);

            // 2. declare sql for create table [TYPE] then call execute sql
            sql = "CREATE TABLE IF NOT EXISTS type(" +
                "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
                "name VARCHAR(20) NOT NULL);";
            console.info("Creating table: type");
            tx.executeSql(sql, options, successCreate, errorHandler);

            // 3-5. loop to insert row for type then call execute sql 
            var values = ["Friend", "Co-worker", "Family"];

            for (var i in values)
            {
                sql = "INSERT INTO type (name) VALUES ('" +
                    values[i] + "');";
                tx.executeSql(sql, options, successCreate, errorHandler);
            }

            // 6. delare sql for create table [Contacts] then call execute sql
            sql = "CREATE TABLE IF NOT EXISTS contacts(" +
                "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
                "contactName VARCHAR(30) NOT NULL," + 
                "typeId INTEGER NOT NULL," + 
                "phoneNumber VARCHAR(15), " + 
                "contactEmail VARCHAR(30)," + 
                "viewMore VARCHAR(1)," +
                "contactAddress VARCHAR(40)," +
                "contactCity VARCHAR(40)," +
                "contactProvStat VARCHAR(2)," +
                "contactNotes TEXT," +
                "FOREIGN KEY(typeId) REFERENCES type(id));";
            console.info("Creating table: contacts");
            tx.executeSql(sql, options, successCreate, errorHandler);

            function successCreate(){
                console.info("Success: table created successfully");
            }

        }
        // 7. just need one db.transaction and pass txFunction
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    DropTables: function () {

        function txFunction(tx) {
            var options = [];
            console.info("Dropping table: type");
            var sql = "DROP TABLE IF EXISTS type;";
            tx.executeSql(sql, options, successDropType, errorHandler);

            console.info("Dropping table: contacts");
            sql = "DROP TABLE IF EXISTS contacts;";
            tx.executeSql(sql, options, successDropReview, errorHandler);

            function successDropType() {
                console.info("Success: dropping table type successful");
            }

            function successDropReview() {
                console.info("Success: dropping table contacts successful");
                alert("Database cleared");
            }
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    }
};