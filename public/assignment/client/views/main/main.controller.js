/**
 * Created by sumeetdubey on 2/18/16.
 */
(function(){
    var app = angular.module("FormBuilderApp");

    app.controller("MainController", MainController);

    function MainController($scope, $location) {
        $scope.$location = $location;
    }
})();