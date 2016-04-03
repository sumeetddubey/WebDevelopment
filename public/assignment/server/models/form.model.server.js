/**
 * Created by sumeetdubey on 3/17/16.
 */

var q = require('q');
var mongoose = require('mongoose');

module.exports = function(){
    var uuid = require('node-uuid');
    var mock = require("./form.mock.json");

    //loading form schema
    var FormSchema = require("./form.schema.server.js")(mongoose);
    var FormModel = mongoose.model("Form", FormSchema);

    var api = {
        createForm: createForm,
        findFormsByUserId: findFormsByUserId,
        findFormById: findFormById,
        findFormByTitle: findFormByTitle,
        deleteFormById: deleteFormById,
        updateFormById: updateFormById
    };

    return api;

    function createForm(userId, ipForm) {
        var deferred = q.defer();

        ipForm.userId = userId;
        ipForm.fields = [];
        FormModel.create(ipForm, function (err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findFormsByUserId(userId){
        var deferred = q.defer();

        FormModel.find({userId: userId}, function(err, doc){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findFormById(formId){
        var deferred = q.defer();

        FormModel.find({_id: formId}, function(err, doc){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findFormByTitle(title){
        var deferred = q.defer();

        FormModel.find({title: title}, function(err, doc){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function deleteFormById(formId){
        var deferred = q.defer();

        FormModel.remove({_id: formId}, function(err, doc){
            if(err){
                deferred.reject(err);
            }
            else{

                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function updateFormById(formId, ipForm){
        var deferred = q.defer();

        FormModel.update({_id: formId}, {
            title: ipForm.title
        }, function(err, doc){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }
};