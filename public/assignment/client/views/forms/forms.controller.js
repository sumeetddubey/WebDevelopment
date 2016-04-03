/**
 * Created by sumeetdubey on 2/15/16.
 */
(function(){
    var app = angular.module("FormBuilderApp");
    app.config(function ($routeProvider) {
        $routeProvider
            .when("/formfields", {
                templateUrl: "views/forms/field.view.html",
                controller: "FormFieldsController"
            })
    });
    app.controller("FormController", FormController);

    function FormController($scope, FormService, $rootScope, $location, $route){
        $scope.findallForms = findAllForms;
        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;
        $scope.formFields = formFields;

        var userForms=[];
        var currUser;
        currUser = $rootScope.currentUser;

        if(currUser) {
            findAllForms();
        }
        else{
            $location.url("/register");
        }

        function findAllForms(){
            FormService.findAllFormsForUser(currUser._id)
                .then(
                    function(response){
                        if(response) {
                            $scope.form = response.data;
                            userForms = response.data;
                            $rootScope.userForms = userForms;
                        }
                        else{
                            userForms=[];
                            $rootScope.userForms = userForms;
                        }
                    }
                )
        }
        function addForm(newForm){
            if(currUser && (newForm)) {
                FormService.createFormForUser(currUser._id, newForm)
                    .then(
                        function(response){
                            $location.url('/forms');
                            $route.reload();
                        }
                    )
            }
            else{
                $location.url("/forms");
            }
        }

        function updateForm(form){
            if(form) {
                var id = $scope.selectedForm._id;
                FormService.updateFormById(id, $scope.selectedForm)
                    .then(
                        function(response){
                            $location.url('/forms');
                            $route.reload();
                        }
                    )
            }

        }

        function deleteForm(form){
            FormService.deleteFormById(form._id)
                .then(
                    function(response){
                        findAllForms();
                    }
                )
        }

        function selectForm(form){
            $scope.selectedForm = {
                "_id": form._id,
                "title": form.title,
                "userId": form.userId
            };
        }

        function formFields(form){
            $rootScope.form = form;
            $location.url('/form/'+form._id+'/fields');
        }
    }
})();
