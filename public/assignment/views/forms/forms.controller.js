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

    function FormController($scope, FormService, $rootScope){
        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;

        var userForms=[];
        var currUser;
        currUser = $rootScope.currentUser;
        console.log(currUser);

        function render(response){
            console.log(response);
            $scope.form = response;
            userForms.push(response);
            $rootScope.userForms = userForms;
        }
        FormService.findAllFormsForUser(currUser._id, render);


        function addForm(newForm){
            function render(response){
                console.log(response);
                $location.url = "/forms";
            }
            console.log(newForm);
            console.log($rootScope.currentUser);

            FormService.createFormForUser($rootScope.currentUser, newform, render)

        }

        function updateForm(form){
            var id = $scope.forms[$scope.selectedFormIndex]._id;
            FormService.updateFormById(id, form, render)

            function render(response){
                console.log(response);
            }
        }

        function deleteForm(){
            var id = $scope.form($scope.selectedFormIndex)._id;
            FormService.deleteFormById(id, render)

            function render(response){
                console.log(response);
            }
        }

        function selectForm(index){
            $scope.selectedFormIndex = index;
            $scope.newForm = {
                "_id": $scope.forms[index]._id,
                "title": $scope.forms[index].title,
                "userId": $scope.forms[index].userId
            };
        }
    }
})();
