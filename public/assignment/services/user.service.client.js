/**
 * Created by sumeetdubey on 2/18/16.
 */
(function(){
    var app = angular.module("FormBuilderApp");
    app.factory("UserService", UserService);

    function UserService($scope){
        $scope.currUsers = [
            {	"_id":123, "firstName":"Alice",            "lastName":"Wonderland",
                "username":"alice",  "password":"alice",   "roles": ["student"]		},
            {	"_id":234, "firstName":"Bob",              "lastName":"Hope",
                "username":"bob",    "password":"bob",     "roles": ["admin"]		},
            {	"_id":345, "firstName":"Charlie",          "lastName":"Brown",
                "username":"charlie","password":"charlie", "roles": ["faculty"]		},
            {	"_id":456, "firstName":"Dan",              "lastName":"Craig",
                "username":"dan",    "password":"dan",     "roles": ["faculty", "admin"]},
            {	"_id":567, "firstName":"Edward",           "lastName":"Norton",
                "username":"ed",     "password":"ed",      "roles": ["student"]		}
        ];

        //method declarations
        $scope.findUserByCredentials = findUserByCredentials;
        $scope.findAllUsers = findAllUsers;
        $scope.createUser = createUser;
        $scope.deleteUserById = deleteUserById;
        $scope.updateUser = updateUser;


        // method to find a single user
        function findUserByCredentials(username, password, callback){
            var user;
            for (user in currUsers){
                if((username == currUsers[user].username) && (password ==  currUsers[user].password))
                {
                    callback(user);
                }
                else {
                    callback(null);
                }
            }
        }

        // method to list all users
        function findAllUsers(callback){
            callback(currUsers)
        }

        //method to create new user
        function createUser(user, callback){
            var newuser = {
                "_id": "(new Date).getTime()",
                "firstname": user.firstname,
                "lastname": user.lastname,
                "username": user.username,
                "password": user.password,
                "roles": user.roles
            };
            $scope.currUsers.push(newuser)

            callback(user)
        }

        //method to delete particular user
        function deleteUserById(userId, callback){
            for(user in currUsers){
                if(this.user._id == userId){
                    currUsers.splice((currUsers.indexOf(this.user)), 1);
                    callback(currUsers);
                    break;
                }
            }
        }

        //method to update particular user
        function updateUser(userId, user, callback){
            for(this.user in currUsers){
                if (this.user._id == userId){
                    currUsers[indexOf(this.user)] = user;
                }
            }
            callback(user)
        }

    }
})();