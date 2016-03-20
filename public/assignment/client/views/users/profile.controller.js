/**
 * Created by sumeetdubey on 2/15/16.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, $rootScope, UserService, $location, $route){
        $scope.update = update;

        function init(){
            var user = $rootScope.currentUser;

            $scope.user = {
                "username": user.username,
                "password": user.password,
                "firstname": user.firstName,
                "lastname": user.lastName,
                "email": user.email
            };
            $location.url("/profile");
            $scope.$location = $location;
        }

        return init();



        function update(user){
            currUser = $rootScope.currentUser;
            UserService.updateUserById(currUser._id, user)
                .then(
                    function(response){
                        if(response.data){
                            $rootScope.currentUser = response.data;
                            console.log(response.data);
                            $route.reload();
                            $location.url("/profile");
                        }
                    }
                )
        }

        //function update(user) {
        //    function render(response) {
        //        console.log(response);
        //        $location.url("/profile");
        //    }
        //
        //    currUser = $rootScope.currentUser;
        //    UserService.updateUser(currUser._id, $scope.user, render);
        //
        //
        //}
    }
})();