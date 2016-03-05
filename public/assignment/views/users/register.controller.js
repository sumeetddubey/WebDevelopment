/**
 * Created by sumeetdubey on 2/15/16.
 */
(function(){
    var app = angular.module("FormBuilderApp")
    app.controller("RegisterController", RegisterController)

    function RegisterController($scope, $location, UserService, $rootScope) {
        $scope.register = register;

        function register(user) {
            var newuser = UserService.createUser($scope.user, render);
            $rootScope.currUsers = newuser;
            $location.url("/profile");
            function render(response){
                console.log(response);
            }
        }
    }
})();