/**
 * Created by sumeetdubey on 2/15/16.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, $rootScope, UserService, $location){
        $scope.update = update;

        function update(user) {
            currUser = $rootScope.currentUser;
            UserService.updateUser(currUser._id, currUser, render)

            function render(response) {
                console.log(response)
            }
        }
    }
})();