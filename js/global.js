/**
INFO3130 Final Assignment: global.js

Created By: Michael Pantaleon
Email: mpantaleon5818@conestogac.on.ca
**/


// Reset Form Since HTML is one big page - need to set values as blank
function resetForm(){

    var contactName = $("#addName").val("");
    var contactPhone = $("#addPhone").val("");
    var contactEmail = $("#addEmail").val("");
    
    var contactAddress = $("#addAddress").val("");
    var contactCity = $("#addCity").val("");
    var contactProvSt = $("#addProvince").val("");
    var contactNotes = $("#addNotes").val("");
    
    $('#addVmDiv').hide();
    $("#addViewMore").prop("checked", false).checkboxradio('refresh');

}

// Save Contact
function btnSave_click() {
    if (validateAddForm()) {
        console.info("Successful: Valid Inputs");
        addContact();
        // redirect after add
        window.location.href = '#viewContactListPage';
    } 
    else console.info("Error: Check Validation Requirements");
}

// Update Contact 
function btnUpdate_click() {
    if (validateModifyForm()) {
        console.info("Successful: Valid Inputs");
        updateContact();
    } 
    else console.info("Error: Check Validation Requirements");
}

// Delete Contact
function btnDelete_click(){
    deleteContact();
}

// Testing Purpose - Uncomment to Enable
/* Clear Database
function btnDeleteDB_click(){
    clearDatabase();
}

//Saving Values to Local Storage
function btnSaveDefaults_click(){
    localStorage.setItem("Name", $('#txtDefaultName').val());
    localStorage.setItem("Phone", $('#txtDefaultPhone').val());
    localStorage.setItem("Email", $('#txtDefaultEmail').val());
    localStorage.setItem("Address", $('#txtDefaultAddress').val());
    localStorage.setItem("City", $('#txtDefaultCity').val());
    localStorage.setItem("Province / State", $('#txtDefaultProvinceState').val());
    localStorage.setItem("Notes", $('#txtDefaultNotes').val());
    $('#addVmDiv').show();
    alert("Defaults saved."); 
}

// Retrieving Values from LS and assigning to textboxes for sile populaton
function AddFeedbackPage_Show(){
    defaultName = localStorage.getItem('Name');
    $("#addName").val(defaultName);

    defaultPhone = localStorage.getItem('Phone');
    $("#addPhone").val(defaultPhone);

    defaultEmail = localStorage.getItem('Email');
    $("#addEmail").val(defaultEmail);
  
    defaultAddress = localStorage.getItem('Address');
    $("#addAddress").val(defaultAddress);

    defaultCity = localStorage.getItem('City');
    $("#addCity").val(defaultCity);

    defaultProvSt = localStorage.getItem('Province / State');
    $("#addProvince").val(defaultProvSt);

    defaultNotes = localStorage.getItem('Notes');
    $("#addNotes").val(defaultNotes);
}*/

function init() {
    
    // Hiding and Displaying Divs
    $('#addVmDiv').hide();
    $('#addViewMore').on('click', function() {
        showHideDiv('');
    });

    // Edit Contact List Page
    $('#editViewMore').on('click', function() {
        showHideDiv('');
    });

    // About Developer Page
    $('#developer').hide();
    $('#viewDeveloper').on('click', function() {
        showHideDiv('');
    });

    // Buttons for Cancel Redirect: Add, Edit Pages
    $("#btnCancel").on("click", function(){
        window.location.href = '#viewContactListPage';
    });
    $("#btnCancel2").on("click", function(){
        window.location.href = '#viewContactListPage';
    });
    
    // Buttons for CRUD
    $("#btnSave").on("click", btnSave_click);
    //$("#btnSaveDefaults").on("click", btnSaveDefaults_click); // Saves storage values
    $("#btnUpdate").on("click", btnUpdate_click);
    $("#btnDelete").on("click", btnDelete_click); // delete one
    //$("#btnClearDB").on("click", btnDeleteDB_click); // delete db

    // Event Handlers for Page Show: Add, View, Edit
    //$("#addContactPage").on("pageshow", AddFeedbackPage_Show);
    $('#viewContactListPage').on('pageshow', getContacts);
    $('#editContactPage').on('pageshow', showCurrentContact);

    // Populating the dropdown for Relationship Type
    updateTypesDropdown();
}

function initDB() {
    try{
        DB.CreateDatabase();
        if (db) {
            console.info("Creating Tables ...")
            DB.CreateTables();
        }
        else{
            console.error("Error: Cannot create tables: Database does not exist!");
        }
    } catch(e){
        console.error("Error: (Fatal) Error in initDB(), can not proceed");
    }
}

$(document).ready(function () {
    initDB();
    init();
});