/**
INFO3130 Final Assignment: feedbackDAL.js

Created By: Michael Pantaleon
Email: mpantaleon5818@conestogac.on.ca
**/

// REVIEW TABLE CRUD: Insert, Select, Select All, Update, Delete
var contacts ={
    insert: function (options) {

        function txFunction(tx) {

            var sql ="INSERT INTO contacts (" +
                            "contactName, " +
                            "typeId, " +
                            "phoneNumber, " +
                            "contactEmail, " +
                            "viewMore, " +
                            "contactAddress, " +
                            "contactCity, " +
                            "contactProvStat, " +
                            "contactNotes) values " +
                            "(?, ?, ?, ?, ?, ?, ?, ?, ?);";

            function successInsert() {
                console.info("Success: Insert successful");
                alert("Contact has been added.");
            }
            tx.executeSql(sql, options, successInsert, errorHandler);
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    select: function (options, successSelectOne) {

        function txFunction(tx) {
            var sql = "SELECT * FROM contacts WHERE id=?;";
            tx.executeSql(sql, options, successSelectOne, errorHandler);
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    selectAll: function (successSelectAll) {

        function txFunction(tx) {
            var sql = "SELECT * FROM contacts;";
            var options= [];
            tx.executeSql(sql, options, successSelectAll, errorHandler);
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },

    update: function (options) {

        function txFunction(tx) {
            var sql = "UPDATE contacts SET " +
                            "contactName = ?, " +
                            "typeId = ?, " +
                            "phoneNumber = ?, " +
                            "contactEmail = ?, " +
                            "viewMore = ?, " +
                            "contactAddress = ?, " +
                            "contactCity = ?, " +
                            "contactProvStat = ?, " +
                            "contactNotes =? " +
                            "WHERE id=?;";

            function successUpdate() {
                console.info("Success: Update successful");
                alert("Contact has been updated.");
            }

            tx.executeSql(sql, options, successUpdate, errorHandler);
        }
        db.transaction(txFunction, errorHandler, successTransaction);

    },
    delete: function (options) {

        function txFunction(tx) {
            var sql = "DELETE FROM contacts WHERE id=?;";

            function successDelete() {
                console.info("Success: Delete successful");
                alert("Contact has been deleted.");
            }

            tx.executeSql(sql, options, successDelete, errorHandler);
        }

        db.transaction(txFunction, errorHandler, successTransaction);

    }
};

// TYPE TABLE CRUD: Select All
var type = {
    selectAll: function (successSelectAll) {

        function txFunction(tx) {
            var sql = "SELECT * FROM type;";
            var options = [];
            tx.executeSql(sql, options, successSelectAll, errorHandler);
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    }
};