/**
 * Created by sumeetdubey on 2/15/16.
 */
(function(){
    var app =  angular.module("FormBuilderApp");
    app.controller("HomeController", HomeController);

    function HomeController($scope, $location){
        console.log("in home");
        $scope.$location = $location;
    }
})();