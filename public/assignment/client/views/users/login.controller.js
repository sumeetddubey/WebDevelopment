/**
 * Created by sumeetdubey on 2/15/16.
 */
(function(){
    var app = angular.module("FormBuilderApp");
    app.controller("LoginController", LoginController);

    function LoginController($scope, $location, $rootScope, UserService){
        $scope.login = login;

        function login(user) {
            if (!user) {
                return;
            }
            UserService.findUserByCredentials(user.username, user.password)
                .then(function(response){
                    if(response.data){
                        $rootScope.currentUser = response.data;
                        $location.url("/profile");
                    }
                    else {
                        $window.alert("Invalid credentials");
                        $location.url("/login");
                    }
                })
        }
    }
})();