/**
 * Created by sumeetdubey on 2/15/16.
 */
(function(){
    var app = angular.module("FormBuilderApp")
    app.controller("LoginController", LoginController)

    function LoginController($scope, $window, UserService, $rootScope, $location){
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
                    console.log("No response");
                    $window.alert("Invalid credentials");
                    $location.url("/login");
                }
            };
            console.log(user)
            if (user) {
                UserService.findUserByCredentials(user.username, user.password, render);
            }
            else{
                $window.alert("Invalid credentials");
                $location.url("/login");
            }
        }
    }
})();