/**
 * Created by sumeetdubey on 2/15/16.
 */
(function (){
    var app = angular.module("FormBuilderApp");
    app.controller("AdminController", AdminController);

    function AdminController($scope, UserService){

        //instance varaibles for methods
        $scope.selectUser = selectUser;
        $scope.deleteUser = deleteUser;
        $scope.addUser = addUser;
        $scope.updateUser = updateUser;
        $scope.sort = sort;

        //scope variables
        $scope.selectedUser = {};
        $scope.attribute = '';
        $scope.reverse = false;

        function init(){
            UserService.adminFindAllUsers()
                .then(
                    function(response){
                        if(response){
                            $scope.allUsers = response.data;
                            console.log(response.data);
                        }
                    },
                    function(err){
                        console.log(err);
                    }
                )
        }

        init();

        function sort(attribute) {
            $scope.reverse = ($scope.attribute === attribute) ? !$scope.reverse : false;
            $scope.attribute = attribute;

        }

        function addUser(user){
            UserService.adminCreateUser(user)
                .then(
                    function(response){
                        console.log(response.data);
                        init();

                    },
                    function(err){
                        console.log(err);
                    }
                );
            $scope.selectedUser = null;
        }

        function updateUser(user){
            var userId = user._id;
            user.roles = getRoles(user.roles);
            console.log(user.roles);
            UserService.adminUpdateUser(userId, user)
                .then(
                    function(response){
                        init();
                    }
                );
            $scope.selectedUser = null;
        }

        function deleteUser(user) {
            var userId = user._id;
            console.log(userId);
            UserService.adminDeleteUser(userId)
                .then(
                    function (response) {
                        init();
                    }
                );
            $scope.selectedUser = null;
        }

        function selectUser(user){
            $scope.selectedUser = user;
        }

        function getRoles(str) {
            if(str.length == 0){
                return [];
            }
            else{
                return String(str).split(",");
            }
        }
    }
    
})();