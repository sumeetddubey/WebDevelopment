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
        updateUserById: updateUserById,
        adminUpdateUserById: adminUpdateUserById,
        adminDeleteUserById: adminDeleteUserById
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
        console.log('finding by username');
        console.log(username);
        UserModel.findOne({username: username}, function(err, doc){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(doc);
                console.log("user found "+doc);
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
            emails: [ipUser.emails],
            phones: [ipUser.phones]}, function(err, doc){
            if(err){
                deferred.reject(err);
            }
            else{
                UserModel.findById({_id: userId}, function(err, doc){
                    if(err){
                        deferred.reject(err);
                    }
                    else{
                        deferred.resolve(doc);
                    }
                })
            }
        });
        return deferred.promise;
    }

    function adminUpdateUserById(userId, ipUser){
        var deferred = q.defer();
        UserModel.update({_id: userId},{
            username: ipUser.username,
            firstName: ipUser.firstName,
            lastName: ipUser.lastName,
            roles: ipUser.roles}, function(err, doc){
            if(err){
                deferred.reject(err);
            }
            else{
                var user = findUserById(userId);
                deferred.resolve(user);
                console.log("user updated "+doc);
            }
        });
        return deferred.promise;
    }

    function adminDeleteUserById(userId){
        var deferred = q.defer();
        UserModel.remove({_id: userId},function(err, doc){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(doc);
                console.log("user deleted "+doc);
            }
        });

        return deferred.promise;
    }

};