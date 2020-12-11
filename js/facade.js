/**
INFO3130 Final Assignment: facade.js

Created By: Michael Pantaleon
Email: mpantaleon5818@conestogac.on.ca
**/


function updateTypesDropdown() {
    function successSelectAll(tx, results) {
        var htmlCode = "";
        
        $("#Type option").remove();
        $("#TypeEdit option").remove();

        for (var i = 0; i < results.rows.length; i++) {
            var row = results.rows[i];
            var sel = "";
            if (row['values'] == "Friend") {
                sel = "Friend"; 
            }
            $("#Type").append("<option value='" + row['id'] + "' " + sel + ">" + row['name'] + "</option>");
            $("#TypeEdit").append("<option value='" + row['id'] + "' " + sel + ">" + row['name'] + "</option>");
            console.info("id: " + row['id'] + " name: " + row['name']);
        }

    }
    type.selectAll(successSelectAll);
}

function addContact() {

    var contactName = $("#addName").val();
    var typeId = $("#Type").val();
    var phoneNumber = $("#addPhone").val(); 
    var contactEmail = $("#addEmail").val();
    var viewMore = $("#addViewMore").prop("checked");
    var contactAddress = null;
    var contactCity = null;
    var contactProvStat = null;
    var contactNotes = null;
    if (viewMore) {
        contactAddress = $("#addAddress").val();
        contactCity = $("#addCity").val();
        contactProvStat = $("#addProvince").val();
        contactNotes = $("#addNotes").val(); 
    }

    // insert into the table
    var options = [contactName, typeId, phoneNumber, contactEmail, viewMore, contactAddress, contactCity, contactProvStat, contactNotes];
    contacts.insert(options);
}

function getContacts(){
    function successSelectAll(tx, results) {
        var htmlCode = "";
        for (var i = 0; i < results.rows.length; i++) {
            var row = results.rows[i];

            htmlCode += "<li data-icon='true'>" +
                        "<a data-row-id='" + row['id'] +
                        "'class='ui-btn ui-btn-icon-right ui-icon-carat-r'>" +
                        "<h1> " + row['contactName'] + "</h1>";
            htmlCode += "</a></li>" ;
        }
        var lv = $("#FeedbackList");
        lv = lv.html(htmlCode); 
        lv.listview("refresh"); // very important

        
        $("#FeedbackList a").on("click", clickHandler);

        function clickHandler() {
            localStorage.setItem("id", $(this).attr("data-row-id"));
            //navigate to the detail page automatically
            $(location).prop('href', "#editContactPage");
        }

    }
    contacts.selectAll(successSelectAll);
}

function showCurrentContact() {
    var id = localStorage.getItem("id");
    var options = [id];

    function successSelectOne(tx, results) {
        var row = results.rows[0];

        $("#editName").val(row['contactName']);
        $("#TypeEdit").val(row['typeId']).change();
        $("#editPhone").val(row['phoneNumber']); 
        $("#callNumber").prop('href', "tel:" + row['phoneNumber']);   // Phone Icon
        $("#textNumber").prop('href', "sms:" + row['phoneNumber']); // Txt Msg
        $("#emailNumber").prop('href', "mailto:" + row['contactEmail']); // Email Msg
        $("#editEmail").val(row['contactEmail']);
        if (row['viewMore'] == 'true') {
            $("#editViewMore").prop('checked', true).checkboxradio('refresh');
            $("#editAddress").val(row['contactAddress']);
            $("#editCity").val(row['contactCity']);
            $("#editProvince").val(row['contactProvStat']);
            $("#editNotes").val(row['contactNotes']); 
                        
        } else {
            $("#editViewMore").prop('checked', false).checkboxradio('refresh');
            $("#editAddress").val("");
            $("#editCity").val("");
            $("#editProvince").val("");
            $("#editNotes").val(""); 
            
        }
        showHideDiv('');

    }
    contacts.select(options, successSelectOne);
}

function updateContact() {
    var id = localStorage.getItem("id");
    var contactName = $("#editName").val();
    var typeId = $("#TypeEdit").val();
    var phoneNumber = $("#editPhone").val();
    var contactEmail = $("#editEmail").val();
    var viewMore = $("#editViewMore").prop("checked");
    var contactAddress = null;
    var contactCity = null;
    var contactProvStat = null;
    var contactNotes = null;
    if (viewMore) {
        contactAddress = $("#editAddress").val();
        contactCity = $("#editCity").val();
        contactProvStat = $("#editProvince").val();
        contactNotes = $("#editNotes").val(); 
    }

    //update the data to a table
    var options = [contactName, typeId, phoneNumber, contactEmail, viewMore, contactAddress, contactCity, contactProvStat, contactNotes, id];
    contacts.update(options);

    $(location).prop('href', "#viewContactListPage");
}

function deleteContact() {
    var id = localStorage.getItem("id");
    var options = [id];
    contacts.delete(options);
    $(location).prop('href', "#viewContactListPage");

}

function clearDatabase() {
    var result = confirm("Are you sure you want to clear database?");
    try{
        if (db) {
            console.info("Database Cleared")
            $("#FeedbackList").ety();
            DB.DropTables();           
        }
    } catch(e){
        console.error("Error: (Fatal) Error in DropTables, can not proceed");
    }
}