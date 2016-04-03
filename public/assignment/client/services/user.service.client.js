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
    }
})();