/**
 * Created by sumeetdubey on 2/15/16.
 */
(function(){
    var app = angular.module("FormBuilderApp");
    app.config(function ($routeProvider) {
        $routeProvider
            .when("/formfields", {
                templateUrl: "views/forms/form-fields.view.html",
                controller: "FormFieldsController"
            })
    })
    app.controller("FormController", FormController);

    function FormController($scope, FormService, $route ,$rootScope, $location){
        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;

        var userForms=[];
        var currUser;
        currUser = $rootScope.currentUser;
        console.log(currUser);

        function render(response){
            if(response) {
                console.log(response);
                $scope.form = response;
                userForms.push(response);
                $rootScope.userForms = userForms;
            }
            else{
                userForms=[];
                $rootScope.userForms = userForms;
            }
        }
        if(currUser) {
            FormService.findAllFormsForUser(currUser._id, render);
        }
        else{
            $location.url("/register");
        }

        function addForm(newForm){
            function render(response){
                if(response) {
                    console.log(response);
                    $location.url("/forms");
                    $route.reload();
                }
                else{
                    $location.url("/forms");
                    $route.reload();
                }
            }
            console.log(newForm);
            console.log($rootScope.currentUser);

            if(currUser && (newForm)) {
                FormService.createFormForUser(currUser._id, newForm, render)
            }
            else{
                $location.url("/forms");
            }
        }

        function updateForm(form){
            if(form) {
                var id = $scope.selectedForm._id;
                FormService.updateFormById(id, $scope.selectedForm, render);

                function render(response) {
                    console.log(response);
                    $location.url("/forms");
                    $route.reload();
                }
            }

        }

        function deleteForm(form){
            FormService.deleteFormById(form._id, render);

            function render(response){
                console.log(response);
                $location.url("/forms");
                $route.reload();
            }
        }

        function selectForm(form){
            console.log(form);
            $scope.selectedForm = {
                "_id": form._id,
                "title": form.title,
                "userId": form.userId
            };
        }
    }
})();
