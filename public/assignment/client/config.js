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
                    controller: "ProfileController"
                })
                .when("/admin", {
                    templateUrl: "views/admin/admin.view.html",
                    //controller: "AdminController"
                })
                .when("/forms", {
                    templateUrl: "views/forms/forms.view.html",
                    controller: "FormController"
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
                    controller: "FieldController"
                })
                .when("/form/:formId/fields", {
                    templateUrl: "views/forms/field.view.html",
                    controller: "FieldController"
                })
                .otherwise({
                    redirectTo: "/"
                });
        });
})();