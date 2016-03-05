/**
 * Created by sumeetdubey on 2/15/16.
 */
(function(){
    var app = angular.module("FormBuilderApp")
    app.controller("LoginController", LoginController)

    function LoginController($scope, UserService, $rootScope, $location){
        $scope.login = login;

        function login(user){
            var render = function(response){
                if(response){
                    console.log(response);
                    $rootScope.currentUser = response;
                    $location.url("/profile");
                }
            };
            UserService.findUserByCredentials(user.username, user.password, render);

        }
    }
})();