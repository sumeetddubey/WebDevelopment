/**
 * Created by sumeetdubey on 2/15/16.
 */
(function() {
    angular
        var app = app.module("FormBuilderApp")
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

        var currUser;
        currUser = $rootScope.currentUser
        $FormController.findAllFormsForUser(currUser, render)

        function render(response){
            $scope.form.name = response;
        }

        function addForm(){
            var newform = [{"title": form.title}];
            FormService.createFormForUser($rootScope.currentUser, newform, render)

            function render(response){
                console.log(response);
            }
        }

        function updateForm(form){
            var id = $scope.forms[$scope.selectedFormIndex]._id;
            FormService.updateFormById(id, form, render)

            function render(response){
                console.long(response);
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
