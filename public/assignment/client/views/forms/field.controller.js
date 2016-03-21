/**
 * Created by sumeetdubey on 2/15/16.
 */
(function(){
    var app = angular.module("FormBuilderApp");
    app.controller("FieldController", FieldController);

    function FieldController($scope, $location, FieldService, $routeParams){
        $scope.$location = $location;
        $scope.fieldType = [
            'Single Line Text Field',
            'Multi Line Text Field',
            'Date Field',
            'Dropdown Field',
            'Checkboxes Field',
            'Radio Buttons Field'
        ];

        $scope.fields = [];
        FieldService.getFieldsForForm($routeParams.formId)
            .then(
                function(response){
                    if(response) {
                        console.log(response.data);
                        $scope.fields = response.data;
                        console.log($scope.fields);
                    }
                }
            )
    }
})();