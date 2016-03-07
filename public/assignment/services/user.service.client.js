/**
 * Created by sumeetdubey on 2/18/16.
 */
(function(){
    var app = angular.module("FormBuilderApp");
    app.factory("UserService", UserService);

    function UserService(){
        var model = {
            currUsers: [
                {
                    "_id": 123, "firstName": "Alice", "lastName": "Wonderland",
                    "username": "alice", "password": "alice", "roles": ["student"]
                },
                {
                    "_id": 234, "firstName": "Bob", "lastName": "Hope",
                    "username": "bob", "password": "bob", "roles": ["admin"]
                },
                {
                    "_id": 345, "firstName": "Charlie", "lastName": "Brown",
                    "username": "charlie", "password": "charlie", "roles": ["faculty"]
                },
                {
                    "_id": 456, "firstName": "Dan", "lastName": "Craig",
                    "username": "dan", "password": "dan", "roles": ["faculty", "admin"]
                },
                {
                    "_id": 567, "firstName": "Edward", "lastName": "Norton",
                    "username": "ed", "password": "ed", "roles": ["student"]
                }
            ],

            //method declarations
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser
        };
        return model;

        // method to find a single user
        function findUserByCredentials(username, password, callback){
            var user;
            var count = 0;
            for (user in model.currUsers){
                if(username === model.currUsers[user].username && password ===  model.currUsers[user].password)
                {
                    callback(model.currUsers[user]);
                    count = 1;
                }
            }
            if (count==0){
                callback(null);
            }
        }

        // method to list all users
        function findAllUsers(callback){
            callback(currUsers)
        }

        //method to create new user
        function createUser(user, callback){
            var d = new Date();
            var t = d.getTime();
            var newuser = {
                "_id": t,
                "username": user.username,
                "password": user.password,
                "email": user.email
            };
            model.currUsers.push(newuser);

            callback(newuser);
        }

        //method to delete particular user
        function deleteUserById(userId, callback){
            for(userIndex in model.currUsers){
                if(model.currUsers[user]._id === userId){
                    currUsers.splice(userIndex, 1);
                    callback(currUsers);
                }
            }
        }

        //method to update particular user
        function updateUser(userId, user, callback){
            for(userIndex in model.currUsers){
                if (model.currUsers[userIndex]._id == userId){
                    model.currUsers[userIndex].username = user.username;
                    model.currUsers[userIndex].password = user.password;
                    model.currUsers[userIndex].firstName = user.firstname;
                    model.currUsers[userIndex].lastName = user.lastname;
                    model.currUsers[userIndex].email = user.email;
                    console.log(model.currUsers[userIndex]);
                    callback(model.currUsers[userIndex])
                }
            }
        }

    }
})();