/**
INFO3130 Final Assignment: util.js

Created By: Michael Pantaleon
Email: mpantaleon5818@conestogac.on.ca
**/


// Show and Hide Additonal Information 
function showHideDiv() {
    // Add Contact Page
    var div = "#addVmDiv";
    var checkBoxName = "#addViewMore";
    if ($(checkBoxName).prop('checked') == true) {
        $(div).show();
    } else {
        $(div).hide();
    }

    //Edit Contact Page
    var div = "#editVmDiv";
    var checkBoxName = "#editViewMore";
    if ($(checkBoxName).prop('checked') == true) {
        $(div).show();
    } else {
        $(div).hide();
    }

    /*Developer Options
    var div = "#developer";
    var checkBoxName = "#viewDeveloper";
    if ($(checkBoxName).prop('checked') == true) {
        $(div).show();
    } else {
        $(div).hide();
    }*/
}

// Add Contact Page: Check Validations
function validateAddForm() {
    var form = $("#AddForm");
    form.validate({
        rules: {
            addName: {
                required: true,
                rangelength: [2, 30]
            },
            addPhone: {
                required: true,
                phonepattern: true
            },
            addEmail: {
                //required: true,
                emailpattern:true
            },
            addAddress: { 
                rangelength: [5, 40]
            },
            addCity: { 
                rangelength: [5, 40]

            },
            addProvince: { 
                rangelength: [2, 2]
            }
        },
        messages: {
            addName: {
                required: "You must enter the contact's name",
                rangelength: "Length must be 2-30 characters long"
            },
            addPhone:{
                required: "You must enter a phone number",
                phonepattern: "Please enter a valid phone number"
            },
            addEmail: {
                //required: "You must enter the Contact's email",
                emailpattern: "Please enter a valid email address"
            },
            addAddress: { 
                rangelength: "Address must be 5-40 characters long"
            },
            addCity: { 
                rangelength: "Address must be 5-40 characters long"
            },
            addProvince: { 
                rangelength: "Province / State Code must be 2 characters long"
            }


        }
    });
    return form.valid();
}

// Edit Contact Page: Check Validations
function validateModifyForm() {
    var form = $("#EditForm");
    form.validate({
        rules: {
            editName: {
                required: true,
                rangelength: [2, 30]
            },
            editPhone: {
                required: true,
                phonepattern: true
            },
            editEmail: {
                //required: true,
                emailpattern:true
            },
            editAddress: {
                rangelength: [5, 40]
            },
            editCity: {
                rangelength: [5, 40]
            },
            editProvince: {
                rangelength: [2, 2]
            }
        },
        messages: {
            editName: {
                required: "You must enter the contact's name",
                rangelength: "Length must be 2-30 characters long"
            },
            editPhone:{
                required: "You must enter a phone number",
                phonepattern: "Please enter a valid phone number"
            },
            editEmail: {
                //required: "You must enter the Contacts' email",
                emailpattern: "Please enter a valid email address"
            },
            editAddress: {
                rangelength: "Address must be 5-40 characters long"
            },
            editCity: {
                rangelength: "Address must be 5-40 characters long"
            },
            editProvince: {
                rangelength: "Province / State Code must be 2 characters long"
            }

        }
    });
    return form.valid();
}

// Email validation for user input

jQuery.validator.addMethod("emailpattern",
    function (value, element) 
    {
        var regex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        return this.optional(element) || regex.test(value);

    }, "Please enter a valid email address");

// Phone Number Validation
jQuery.validator.addMethod("phonepattern",
    function (value) 
    {
        var regex = /^\(?(\d{3})\)?[-\. ]?(\d{3})[-\. ]?(\d{4})$/i;
        return regex.test(value);

    }, "Please enter a valid phone number");
