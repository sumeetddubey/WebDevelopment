/**
 * Created by sumeetdubey on 2/18/16.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .config(function($routeProvider){
            $routeProvider
                .when("/", {
                    templateUrl: "views/home/home.view.html",
                    controller: "HomeController"
                })
                .when("/profile", {
                    templateUrl: "views/users/profile.view.html",
                    controller: "ProfileController"
                })
                .when("/admin", {
                    templateUrl: "views/admin/admin.view.html",
                    controller: "AdminController"
                })
                .when("/forms", {
                    templateUrl: "views/forms/forms.view.html",
                    controller: "FormsController"
                })
                .when("/login", {
                    templateUrl: "views/users/login.view.html",
                    controller: "LoginController"
                })
                .when("/register", {
                    templateUrl: "views/users/register.view.html",
                    controller: "RegisterController"
                })
                .when("/formfields", {
                    templateUrl: "views/forms/form-fields.view.html",
                    controller: "FormFieldsController"
                })
                .otherwise({
                    redirectTo: "/"
                });
        });
})();