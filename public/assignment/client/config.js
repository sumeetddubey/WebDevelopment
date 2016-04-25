/**
 * Created by sumeetdubey on 2/18/16.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .config(function($routeProvider){
            $routeProvider
                .when("/home", {
                    templateUrl: "views/home/home.view.html",
                    controller: "HomeController"
                })
                .when("/profile", {
                    templateUrl: "views/users/profile.view.html",
                    controller: "ProfileController",
                    resolve: {
                        checkCurrentUser: checkCurrentUser
                    }
                })
                .when("/admin", {
                    templateUrl: "views/admin/admin.view.html",
                    controller: "AdminController",
                    controllerAs: "model",
                    resolve: {
                        checkAdmin: checkAdmin
                    }
                })
                .when("/forms", {
                    templateUrl: "views/forms/forms.view.html",
                    controller: "FormController",
                    resolve: {
                        checkCurrentUser: checkCurrentUser
                    }
                })
                .when("/login", {
                    templateUrl: "views/users/login.view.html",
                    controller: "LoginController"
                })
                .when("/register", {
                    templateUrl: "views/users/register.view.html",
                    controller: "RegisterController"
                })
                .when("/fields", {
                    templateUrl: "views/forms/field.view.html",
                    controller: "FieldController",
                    resolve: {
                        checkCurrentUser: checkCurrentUser
                    }
                })
                .when("/form/:formId/fields", {
                    templateUrl: "views/forms/field.view.html",
                    controller: "FieldController",
                    resolve: {
                        checkCurrentUser: checkCurrentUser
                    }
                })
                .when("/", {
                    redirectTo: "/home"
                })
                .otherwise({
                    redirectTo: "/"
                });
        });

    function checkAdmin(UserService, $window, $location){
        var response = UserService.checkAdmin();
        if(response == true){
            return;
        }
        else{
            $window.alert('need to be an admin');
            $location.url('/login');
        }
    }

    function checkCurrentUser(UserService, $q, $location){
        var deferred = $q.defer();
        UserService.getCurrentUser()
            .then(
                function(response){
                    if(response.data == '0'){
                        console.log('invalid');
                        deferred.reject();
                        $location.url('/home');
                    }
                    else{
                        UserService.setCurrentUser(response.data);
                        deferred.resolve();
                    }
                }
            );

        return deferred.promise;
    }
})();