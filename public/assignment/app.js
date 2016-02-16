/**
 * Created by sumeetdubey on 2/15/16.
 */
(function(){
    angular
        .module("FormBuilderApp", ["ng-route"])

        var app = angular.module("FormBuilderApp",[]);

        app.controller("MainController", HelloWorld)
        function HelloWorld($scope){
            $scope.hello = "hello from angular";
        }


})();

