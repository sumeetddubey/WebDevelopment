/**
 * Created by sumeetdubey on 3/26/16.
 */

module.exports = function(){

    //user schema
    //var UserSchema = require("./user.schema.client.js")

    var mock = require("./user.mock.json");
    var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    var HackerRank = require('machinepack-hackerrank');

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
        var d = new Date();
        var t = d.getTime();
        var user = {
            "_id": t,
            "username": ipUser.username,
            "password": ipUser.password,
            "email": ipUser.email
        };
        mock.push(user);
        console.log(mock);
        return user;
    }

    function findAllUsers(){
        return mock;
    }

    function findUserById(userId){
        var user;
        var count = 0;
        for(user in mock){
            if(mock[user]._id === userId) {
                count = 1;
                return mock[user];
            }
        }
        if(count==0){
            return null;
        }
    }

    function findUserByUsername (username){
        var user;
        var count = 0;
        for(user in mock){
            if(mock[user].username === username) {
                count = 1;
                return user;
            }
        }
        if(count==0){
            return null;
        }
    }

    function findUserByCredentials (credentials){
        var user;
        var count = 0;

        for (user in mock){
            if(mock[user].email === credentials.email && mock[user].password === credentials.password){
                count = 1;
                return (mock[user]);
            }
        }
        if (count==0){
            console.log("didnt find user");
            return null;
        }
    }

    function deleteUserById(userId){
        var user;
        for(user in mock){
            if(mock[user]._id === userId){
                mock.splice(user, 1);
            }
        }
        return null;
    }

    function updateUserById(userId, ipUser){
        var user;
        console.log(ipUser);
        for(user in mock){
            if(mock[user]._id === userId){
                if(ipUser.username) {
                    mock[user].username = ipUser.username;
                }
                if(ipUser.password) {
                    mock[user].password = ipUser.password;
                }
                if(ipUser.firstname) {
                    mock[user].firstName = ipUser.firstname;
                }
                if(ipUser.lastname) {
                    mock[user].lastName = ipUser.lastname;
                }
                if(ipUser.email) {
                    mock[user].email = ipUser.email;
                }
                break;
            }
        }
        console.log(mock[user]);
        return mock[user];
    }

    function sendCodeToApi(){
        console.log("in api 2");
        HackerRank.submit({
            apiKey: 'hackerrank|902784-700|93c391311e30d1172470dfc810eeb0ea0b2c70dd',
            source: 'print ("hello world")',
            language: 5,
            testcases: ["1"],
            wait: true,
            //callbackUrl: 'http://example.com/callback',
            format: 'json'
        }).exec({

            error: function (err){

            },

            success: function (response){
                console.log(response);
            }
        });
    }
    //function sendCodeToApi(){
    //    // Create the XHR object.
    //    function createCORSRequest(method, url) {
    //        var xhr = new XMLHttpRequest();
    //        if ("withCredentials" in xhr) {
    //            // XHR for Chrome/Firefox/Opera/Safari.
    //            xhr.open(method, url, true);
    //        } else if (typeof XDomainRequest != "undefined") {
    //            // XDomainRequest for IE.
    //            xhr = new XDomainRequest();
    //            xhr.open(method, url);
    //        } else {
    //            // CORS not supported.
    //            xhr = null;
    //        }
    //        return xhr;
    //    }

        //// Make the actual CORS request.
        //function makeCorsRequest() {
        //
        //    // All HTML5 Rocks properties support CORS.
        //
        //    var url = "http://api.hackerrank.com/checker/submission.json";
        //    var params = JSON.stringify(
        //        {
        //            'api_key': 'hackerrank|902784-700|93c391311e30d1172470dfc810eeb0ea0b2c70dd',
        //            'lang': '5',
        //            'testcases': ['1'],
        //            'source' : 'print 1',
        //            'wait': 'true',
        //            format: 'json'
        //        }
        //    );
        //
        //    //var params = "source=print 1&lang=5&testcases=[\"1\"]&api_key=hackerrank|902784-700|93c391311e30d1172470dfc810eeb0ea0b2c70dd";
        //    console.log(params);
        //    //var url = "http://api.hackerrank.com/checker/submission.json +'source=print 1&lang=5&testcases=[\"1\"]&api_key=07913d61ce2ab2fa56f514dee20af8c36a2c0cf7'";
        //    console.log(url);
        //    //var url = "http://api.hackerrank.com/checker/languages.json";
        //    var xhr = createCORSRequest('POST', url);
        //    if (!xhr) {
        //        alert('CORS not supported');
        //        return;
        //    }
        //
        //    xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
        //
        //    // Response handlers.
        //    xhr.onload = function() {
        //        var text = xhr.responseText;
        //        //var title = getTitle(text);
        //        console.log('Response from CORS request to ' + url + ': ' + text);
        //    };
        //
        //    xhr.onerror = function() {
        //        console.log('Woops, there was an error making the request.');
        //    };
        //
        //    xhr.send(params);
        //}
        //
        //makeCorsRequest();
    //}
};