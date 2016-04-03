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
    })
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
        console.log(currUser);

        //function render(response){
        //    if(response) {
        //        console.log(response);
        //        $scope.form = response;
        //        userForms.push(response);
        //        $rootScope.userForms = userForms;
        //    }
        //    else{
        //        userForms=[];
        //        $rootScope.userForms = userForms;
        //    }
        //}
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
                            console.log(response.data);
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
            console.log(newForm);
            console.log($rootScope.currentUser);

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
                console.log($scope.selectedForm);
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
            console.log(form);
            FormService.deleteFormById(form._id)
                .then(
                    function(response){
                        console.log('in response');
                        findAllForms();
                    },
                    function(err){
                        console.log(err);
                    }
                )
        }

        function selectForm(form){
            console.log(form);
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
