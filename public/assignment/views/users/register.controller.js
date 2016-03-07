/**
 * Created by sumeetdubey on 2/15/16.
 */
(function(){
    var app = angular.module("FormBuilderApp")
    app.controller("RegisterController", RegisterController)

    function RegisterController($scope, $location, UserService, $rootScope) {
        $scope.register = register;

        function register(user){
            function render(response){
                $rootScope.currentUser = response;
                $location.url("/profile");
            }

            UserService.createUser($scope.user, render);

        }
    }
})();