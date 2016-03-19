/**
 * Created by sumeetdubey on 3/17/16.
 */
var mock = require("./form.mock.json");

//var q = require("q");

module.exports = function(mock){

    //user schema
    //var UserSchema = require("./user.schema.server.js")

    var api = {
        createForm: createForm,
        findAllFormsByUserId: findAllFormsByUserId,
        findFormById: findFormById,
        findFormByTitle: findFormByTitle,
        deleteUserById: deleteFormById,
        updateFormById: updateFormById
    };

    return api;

    function createForm(ipForm){
        var d = new Date();
        var t = d.getTime();
        var user = {
            "_id": t,
            "title": ipUser.username,
            "userId": ipUser.password,
        };
        mock.push(forms);
        return forms;
    }

    function findAllFormsByUserId(userId){
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
            if(mock[user]._id === userId) {
                count = 1;
                return user;
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
        return form;
    }
};