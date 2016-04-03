/**
 * Created by sumeetdubey on 3/17/16.
 */

var q = require('q');
var mongoose = require('mongoose');

module.exports = function(){
    var uuid = require('node-uuid');
    var mock = require("./form.mock.json");

    //load formschema
    var FormSchema = require("./form.schema.server.js")(mongoose);
    var FormModel = mongoose.model("Form", FormSchema);

    var api = {
        createForm: createForm,
        findFormsByUserId: findFormsByUserId,
        findFormById: findFormById,
        findFormByTitle: findFormByTitle,
        deleteFormById: deleteFormById,
        updateFormById: updateFormById,
        //getAllFormFields: getAllFormFields,
        //getFormFieldById: getFormFieldById,
        //deleteFieldById: deleteFieldById,
        //createField: createField,
        //updateField: updateField,
        //reorderFormFields: reorderFormFields
    };

    return api;

    function createForm(userId, ipForm) {
        var deferred = q.defer();

        ipForm.userId = userId;
        ipForm.fields = [];
        //Form.findOne({userId: userId});
        FormModel.create(ipForm, function (err, doc) {
            if (err) {
                console.log(err);
                deferred.reject(err);
            }
            else {
                console.log(doc);
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    //function createForm(userId, ipForm){
    //    var uuid1 = uuid.v1();
    //    ipForm._id = uuid1;
    //    ipForm.userId = userId;
    //    ipForm.fields = [];
    //    mock.push(ipForm);
    //    var forms = findFormsByUserId(userId);
    //    return forms;
    //}


    function findFormsByUserId(userId){
        var deferred = q.defer();

        FormModel.find({userId: userId}, function(err, doc){
            if(err){
                deferred.reject(err);
                console.log(err);
            }
            else{
                deferred.resolve(doc);
                console.log("doc is ");
                console.log(doc);
            }
        });
        return deferred.promise;
    }
    //function findFormsByUserId(userId){
    //    var userForms = [];
    //    var form;
    //    for(form in mock){
    //        if(mock[form].userId === userId){
    //            userForms.push(mock[form]);
    //        }
    //    }
    //    return userForms;
    //}

    //function findFormById(formId){
    //    var form;
    //    var count = 0;
    //    for(form in mock){
    //        if(mock[form]._id === formId) {
    //            count = 1;
    //            return mock[form];
    //        }
    //    }
    //    if(count==0){
    //        return null;
    //    }
    //}

    function findFormById(formId){
        var deferred = q.defer();

        FormModel.find({_id: formId}, function(err, doc){
            if(err){
                deferred.reject(err);
                console.log(err);
            }
            else{
                deferred.resolve(doc);
                console.log("doc is ");
                console.log(doc);
            }
        });
        return deferred.promise;
    }

    //function findFormByTitle (title){
    //    var form;
    //    var count = 0;
    //
    //    for (form in mock){
    //        if(mock[form].title === title){
    //            count = 1;
    //            return (mock[form]);
    //        }
    //    }
    //    if (count==0){
    //        return null;
    //    }
    //}

    function findFormByTitle(title){
        var deferred = q.defer();

        FormModel.find({title: title}, function(err, doc){
            if(err){
                deferred.reject(err);
                console.log(err);
            }
            else{
                deferred.resolve(doc);
                console.log("doc is ");
                console.log(doc);
            }
        });
        return deferred.promise;
    }

    //function deleteFormById(formId){
    //    for(var form in mock){
    //        if(mock[form]._id === formId){
    //            mock.splice(form, 1);
    //        }
    //    }
    //    var currUserForms = findFormById(formId);
    //    return currUserForms;
    //}

    function deleteFormById(formId){
        var deferred = q.defer();

        FormModel.remove({_id: formId}, function(err, doc){
            if(err){
                deferred.reject(err);
                console.log(err);
            }
            else{

                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    //function updateFormById(formId, ipForm){
    //    var form;
    //    for(form in mock){
    //        if(mock[form]._id === formId){
    //            mock[form].title = ipForm.title;
    //        }
    //    }
    //    console.log(mock);
    //    return mock[form];
    //}

    function updateFormById(formId, ipForm){
        var deferred = q.defer();

        FormModel.update({_id: formId}, {
            title: ipForm.title
        }, function(err, doc){
            if(err){
                deferred.reject(err);
                console.log(err);
            }
            else{
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }
};