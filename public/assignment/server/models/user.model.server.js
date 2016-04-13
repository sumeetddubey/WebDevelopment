/**
 * Created by sumeetdubey on 3/17/16.
 */

module.exports = function(){

    var mock = require("./user.mock.json");
    var mongoose = require('mongoose');
    var q = require ('q');

    //load form schema
    var UserSchema = require("./user.schema.server.js")(mongoose);
    var UserModel = mongoose.model("User", UserSchema);


    var api = {
        createUser: createUser,
        findAllUsers: findAllUsers,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        deleteUserById: deleteUserById,
        updateUserById: updateUserById
    };

    return api;

    function createUser(ipUser){
        var deferred = q.defer();
        var user = {
            "username": ipUser.username,
            "password": ipUser.password,
            "emails": ["ipUser.email"]
        };
        UserModel.create(ipUser, function(err, doc){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(doc);
            }
        });
        return deferred.promise;

    }

    function findAllUsers(){
        var deferred = q.defer();
        UserModel.find(function(err, doc){
            if(err){
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findUserById(userId){
        var deferred = q.defer();
        UserModel.findOne({_id: userId}, function(err, doc){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findUserByUsername(username){
        var deferred = q.defer();
        UserModel.findOne({username: username}, function(err, doc){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findUserByCredentials(credentials){
        var deferred = q.defer();
        UserModel.findOne({username: credentials.username, password: credentials.password}, function(err, doc){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function deleteUserById(userId){
        var deferred = q.defer();
        UserModel.remove({_id: userId}, function(err, doc){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function updateUserById(userId, ipUser){
        var deferred = q.defer();
        UserModel.update({_id: userId},{
            username: ipUser.username,
            password: ipUser.password,
            firstName: ipUser.firstName,
            lastName: ipUser.lastName,
            emails: [ipUser.emails]}, function(err, doc){
            if(err){
                deferred.reject(err);
            }
            else{
                var user = findUserById(userId);
                deferred.resolve(user);
            }
        });
        return deferred.promise;
    }

};