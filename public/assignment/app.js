/**
 * Created by sumeetdubey on 2/15/16.
 */
(function(){
    angular
        .module("FormBuilderApp", ["ng-route"])
        .config(function($routeProvider){
            $routeProvider
                .when("/", {
                    templateUrl: "home.view.html"
                })
                .when("profile", {
                    templateUrl: "profile.view.html"
                })
                .when("admin", {
                    templateUrl: "admin.view.html"
                })
                .otherwise({
                    redirectTo: "/"
                });
        });
})();