/**
 * Created by sumeetdubey on 2/15/16.
 */
(function(){
    var app = angular.module("FormBuilderApp")
    app.controller("LoginController", LoginController)

    function LoginController($scope, UserService, $rootScope, $location){
        $scope.login = login;

        function login(user){
            function render(response){
                if(response){
                    console.log(response);
                    $rootScope.currentUser = response;
                    console.log($rootScope.currentUser)
                    $location.url("/profile");
                }
                else{
                    console.log("No response" +response);
                    $scope.message = "Invalid credentials";
                }
            };
            console.log(user)
            UserService.findUserByCredentials(user.username, user.password, render);

        }
    }
})();