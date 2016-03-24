/**
 * Created by sumeetdubey on 2/15/16.
 */
(function(){
    var app = angular.module("FormBuilderApp");
    app.controller("FieldController", FieldController);

    function FieldController($scope, $rootScope, FieldService, $routeParams){
        //$scope.$location = $location;
        //$scope.fieldType = [
        //    'Single Line Text Field',
        //    'Multi Line Text Field',
        //    'Date Field',
        //    'Dropdown Field',
        //    'Checkboxes Field',
        //    'Radio Buttons Field'
        //];

        $scope.addField = addField;
        $scope.updateField = updateField;
        $scope.updateFieldFromModal = updateFieldFromModal;
        $scope.removeField = removeField;
        $scope.reorder = reorder;

        var currentFormId = $routeParams.formId;
        $scope.formTitle = $rootScope.form.title;

        $(function() {
            $("#sortable")
                .sortable({
                    handle: '.handle',
                    update: function(event, ui){
                        var data = $( ".selector" ).sortable("serialize");
                        console.log(data);
                        //reorder(data);
                    }
                })
        });

        function reorder(data){
            FieldService.reorderFields(currentFormId, data)
                .then(
                    function(response){
                        if(response){
                            $scope.fields = response.data;
                            console.log(response.data);
                        }
                    },
                    function(err){
                        console.log(err);
                    }
                )
        }

        FieldService.getFieldsForForm($routeParams.formId)
            .then(
                function(response){
                    if(response) {
                        console.log(response.data);
                        $scope.fields = response.data;
                        console.log($scope.fields);
                    }
                }
            );

        function addField(ipField) {
            var field;
            var type = ipField.type;
            console.log("in add field");
            if (ipField) {
                if (type === "TEXT") {
                    field = {"_id": null, "label": "New Text Field", "type": "TEXT", "placeholder": "New Field"}
                }

                else if (type === "TEXTAREA") {
                    field = {"_id": null, "label": "New Text Field", "type": "TEXTAREA", "placeholder": "New Field"}
                }

                else if (type === "DATE") {
                    field = {"_id": null, "label": "New Date Field", "type": "DATE"}
                }

                else if (type === 'OPTIONS') {
                    field = {
                        "_id": null, "label": "New Dropdown", "type": "OPTIONS", "options": [
                            {"label": "Option 1", "value": "OPTION_1"},
                            {"label": "Option 2", "value": "OPTION_2"},
                            {"label": "Option 3", "value": "OPTION_3"}
                        ]
                    }
                }

                else if (type === "CHECKBOXES") {
                    field = {
                        "_id": null, "label": "New Checkboxes", "type": "CHECKBOXES", "options": [
                            {"label": "Option A", "value": "OPTION_A"},
                            {"label": "Option B", "value": "OPTION_B"},
                            {"label": "Option C", "value": "OPTION_C"}
                        ]
                    }
                }

                else if (type === "RADIOS") {
                    field = {
                        "_id": null, "label": "New Radio Buttons", "type": "RADIOS", "options": [
                            {"label": "Option X", "value": "OPTION_X"},
                            {"label": "Option Y", "value": "OPTION_Y"},
                            {"label": "Option Z", "value": "OPTION_Z"}
                        ]
                    }
                }

                FieldService.createFieldForForm(currentFormId, field)
                    .then(
                        function (response) {
                            if (response) {
                                $scope.fields = response.data.fields;
                                console.log($scope.fields);
                                //$route.reload();
                            }
                        },
                        function (err) {
                            console.log(err);
                        }
                    )
            }
            else{
                return null;
            }
        }

        function updateField(field){
            $scope.currentField = field;
            field.choices = '';

            for(var index in field.options){
                field.choices = field.choices +field.options[index].label +": " +field.options[index].value +"\n";
            }

            $('#fieldModal').modal(field);
        }

        function updateFieldFromModal(field){
            FieldService.updateField(currentFormId, $scope.currentField._id, field)
                .then(
                    function(response){
                        if(response){
                            $scope.fields = response.data;
                            console.log(response.data);
                            $('#fieldModal').modal('hide');
                        }
                    },
                    function(err){
                        console.log(err);
                    }
                )
        }

        function removeField(field){
            var currentFieldId = field._id;
            FieldService.deleteField(currentFormId, currentFieldId)
                .then(
                    function(response){
                        if(response){
                            console.log(response.data);
                            $scope.fields = response.data;
                        }
                    },
                    function (err){
                        console.log(err);
                    }
                )
        }
    }
})();