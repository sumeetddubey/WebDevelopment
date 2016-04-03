/**
 * Created by sumeetdubey on 2/18/16.
 */
(function(){
    var app = angular.module("FormBuilderApp");
    app.factory("UserService", UserService);

    function UserService($http){
        var api = {
            //method declarations
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUserById: updateUserById
        };
        return api;

        function findUserByUsername(username){
            return $http.get("/api/assignment/user?username="+username);
        }

        function findUserByCredentials(username, password){
            return $http.get('/api/assignment/user?username='+username +'&password=' +password);
        }

        function findAllUsers(){
            return $http.get("/api/assignment/user");
        }

        function createUser(user){
            return $http.post("/api/assignment/user", user)
        }

        function deleteUserById(userId){
            return $http.delete("/api/assignment/user", userId);
        }

        function updateUserById(userId, user){
            return $http.put('/api/assignment/user/'+userId, user);
        }

        // method to find a single user
        //function findUserByCredentials(username, password, callback){
        //    var user;
        //    var count = 0;
        //    for (user in model.currUsers){
        //        if(username === model.currUsers[user].username && password ===  model.currUsers[user].password)
        //        {
        //            callback(model.currUsers[user]);
        //            count = 1;
        //        }
        //    }
        //    if (count==0){
        //        callback(null);
        //    }
        //}
        //
        //// method to list all users
        //function findAllUsers(callback){
        //    callback(currUsers)
        //}
        //
        ////method to create new user
        //function createUser(user, callback){
        //    var d = new Date();
        //    var t = d.getTime();
        //    var newuser = {
        //        "_id": t,
        //        "username": user.username,
        //        "password": user.password,
        //        "email": user.email
        //    };
        //    model.currUsers.push(newuser);
        //
        //    callback(newuser);
        //}
        //
        ////method to delete particular user
        //function deleteUserById(userId, callback){
        //    for(userIndex in model.currUsers){
        //        if(model.currUsers[userIndex]._id === userId){
        //            model.currUsers.splice(userIndex, 1);
        //            callback(model.currUsers);
        //        }
        //    }
        //}
        //
        ////method to update particular user
        //function updateUser(userId, user, callback){
        //    for(userIndex in model.currUsers){
        //        if (model.currUsers[userIndex]._id == userId){
        //            model.currUsers[userIndex].username = user.username;
        //            model.currUsers[userIndex].password = user.password;
        //            model.currUsers[userIndex].firstName = user.firstname;
        //            model.currUsers[userIndex].lastName = user.lastname;
        //            model.currUsers[userIndex].email = user.email;
        //            console.log(model.currUsers[userIndex]);
        //            callback(model.currUsers[userIndex])
        //        }
        //    }
        //}

    }
})();