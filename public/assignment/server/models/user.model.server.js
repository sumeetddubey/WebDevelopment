/**
 * Created by sumeetdubey on 3/17/16.
 */

module.exports = function(){

    //user schema
    //var UserSchema = require("./user.schema.client.js")

    var mock = require("./user.mock.json");
    var mongoose = require('mongoose');
    var q = require ('q');

    //load formschema
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

    //function createUser(ipUser){
    //    var d = new Date();
    //    var t = d.getTime();
    //    var user = {
    //        "_id": t,
    //        "username": ipUser.username,
    //        "password": ipUser.password,
    //        "email": ipUser.email
    //    };
    //    mock.push(user);
    //    return user;
    //}

    function createUser(ipUser){
        var deferred = q.defer();
        var user = {
            "username": ipUser.username,
            "password": ipUser.password,
            "emails": ["ipUser.email"]
        };
        UserModel.create(ipUser, function(err, doc){
            if(err){
                console.log(err);
                deferred.reject(err);
            }
            else{
                console.log(err);
                deferred.resolve(doc);
            }
        });
        return deferred.promise;

    }

    //function findAllUsers(){
    //    return mock;
    //}

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
    //
    //function findUserById(userId){
    //    var user;
    //    var count = 0;
    //    for(user in mock){
    //        if(mock[user]._id === userId) {
    //            count = 1;
    //            return mock[user];
    //        }
    //    }
    //    if(count==0){
    //        return null;
    //    }
    //}

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

    //function findUserByUsername (username){
    //    var user;
    //    var count = 0;
    //    for(user in mock){
    //        if(mock[user].username === username) {
    //            count = 1;
    //            return user;
    //        }
    //    }
    //    if(count==0){
    //        return null;
    //    }
    //}

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

    //function findUserByCredentials (credentials){
    //    var user;
    //    var count = 0;
    //
    //    for (user in mock){
    //        if(mock[user].username === credentials.username && mock[user].password === credentials.password){
    //            count = 1;
    //            return (mock[user]);
    //        }
    //    }
    //    if (count==0){
    //        console.log("didnt find user");
    //        return null;
    //    }
    //}

    function findUserByCredentials(credentials){
        var deferred = q.defer();
        console.log("in find user by credentials");
        console.log(credentials.username);
        UserModel.findOne({username: credentials.username, password: credentials.password}, function(err, doc){
            if(err){
                deferred.reject(err);
            }
            else{
                console.log("user found");
                console.log(doc);
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    //function deleteUserById(userId){
    //    var user;
    //    for(user in mock){
    //        if(mock[user]._id === userId){
    //            mock.splice(user, 1);
    //        }
    //    }
    //}

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

    //function updateUserById(userId, ipUser){
    //    var user;
    //    console.log(ipUser);
    //    for(user in mock){
    //        if(mock[user]._id === userId){
    //            if(ipUser.username) {
    //                mock[user].username = ipUser.username;
    //            }
    //            if(ipUser.password) {
    //                mock[user].password = ipUser.password;
    //            }
    //            if(ipUser.firstname) {
    //                mock[user].firstName = ipUser.firstname;
    //            }
    //            if(ipUser.lastname) {
    //                mock[user].lastName = ipUser.lastname;
    //            }
    //            if(ipUser.email) {
    //                mock[user].email = ipUser.email;
    //            }
    //            break;
    //        }
    //    }
    //    console.log(mock[user]);
    //    return mock[user];
    //}

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