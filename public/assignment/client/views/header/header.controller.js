/**
 * Created by sumeetdubey on 2/15/16.
 */
(function(){
    var app = angular.module("FormBuilderApp");
    app.controller("HeaderController", HeaderController);

    function HeaderController($scope, $rootScope, $location){
        var currentUser = $rootScope.currentUser;
        $scope.logout = logout;

        function logout(){
            console.log("in logout");
            $rootScope.currentUser = null;
            $location.url("/home");
        }
    }
})();