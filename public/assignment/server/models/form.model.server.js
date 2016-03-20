/**
 * Created by sumeetdubey on 3/17/16.
 */

module.exports = function(uuid){
    var mock = require("./form.mock.json");

    //user schema
    //var UserSchema = require("./user.schema.server.js")

    var api = {
        createForm: createForm,
        findFormsByUserId: findFormsByUserId,
        findFormById: findFormById,
        findFormByTitle: findFormByTitle,
        deleteUserById: deleteFormById,
        updateFormById: updateFormById
    };

    return api;

    function createForm(ipForm){
        ipForm._id = uuid.v1();
        ipForm.options = [];
        mock.push(ipForm);
        return ipForm;
    }

    function findFormsByUserId(userId){
        var userForms = [];
        var form;
        for(form in mock){
            if(mock[form].userId === userId){
                userForms.push(mock[form]);
            }
        }
        return userForms;
    }

    function findFormById(formId){
        var form;
        var count = 0;
        for(form in mock){
            if(mock[form]._id === formId) {
                count = 1;
                return mock[form];
            }
        }
        if(count==0){
            return null;
        }
    }

    function findFormByTitle (title){
        var form;
        var count = 0;

        for (form in mock){
            if(mock[form].title === title){
                count = 1;
                return (mock[form]);
            }
        }
        if (count==0){
            return null;
        }
    }

    function deleteFormById(formId){
        var form;
        for(form in mock){
            if(mock[form]._id === formId){
                mock.splice(form, 1);
            }
        }
    }

    function updateFormById(formId, ipForm){
        var form;
        for(form in mock){
            if(mock[form]._id === userId){
                mock[form].title = ipForm.title;
            }
        }
        return mock[form];
    }
};