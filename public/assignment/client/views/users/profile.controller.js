/**
 * Created by sumeetdubey on 2/15/16.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, $rootScope, UserService, $location, $window){
        $scope.update = update;

        function init(){
            var user = $rootScope.currentUser;

            $scope.user = {
                "username": user.username,
                "firstName": user.firstName,
                "lastName": user.lastName,
                "emails": user.emails
            };
            $location.url("/profile");
            $scope.$location = $location;
        }

        return init();



        function update(user){
            currUser = $rootScope.currentUser;
            if(!$scope.user.password){
                $window.alert("Type password");
            }
            UserService.updateUserById(currUser._id, user)
                .then(
                    function(response){
                        if(response.data){
                            UserService.setCurrentUser(response.data);
                        }
                    },
                    function(err){
                        $scope.err = err;
                    }
                );
        }
    }
})();