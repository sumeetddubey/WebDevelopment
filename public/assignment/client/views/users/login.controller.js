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
                        console.log(data);
                        $location.url = "/profile";
                    }
                    else{
                        $('#login-alert').show();
                    }
                })
        }

        //function login(user){
        //    function render(response){
        //        if(response){
        //            console.log(response);
        //            $rootScope.currentUser = response;
        //            console.log($rootScope.currentUser);
        //            $location.url("/profile");
        //        }
        //        else{
        //            console.log("No response");
        //            $window.alert("Invalid credentials");
        //            $location.url("/login");
        //        }
        //    };
        //    console.log(user);
        //    if (user) {
        //        UserService.findUserByCredentials(user.username, user.password, render);
        //    }
        //    else{
        //        $window.alert("Invalid credentials");
        //        $location.url("/login");
        //    }
        //}
    }
})();