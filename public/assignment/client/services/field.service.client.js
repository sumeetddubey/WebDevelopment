/**
 * Created by sumeetdubey on 3/20/16.
 */
(function(){
    var app = angular.module('FormBuilderApp');
    app.factory('FieldService', FieldService);

    FieldService.$inject = ['$http'];

    function FieldService($http) {
        return {
            createFieldForForm: createFieldForForm,
            getFieldsForForm: getFieldsForForm,
            getFieldForForm: getField,
            deleteField: deleteField,
            updateField: updateField,
            reorderFields: reorderFields
        };

        function createFieldForForm(formId, field) {
            return $http.post('/api/assignment/form/'+formId+'/field', field);
        }

        function getFieldsForForm(formId) {
            return $http.get('/api/assignment/form/'+formId+'/field');
        }

        function getField(formId, fieldId) {
            return $http.get('/api/assignment/form/'+formId+'/field/'+fieldId);
        }

        function deleteField(formId, fieldId) {
            return $http.delete('/api/assignment/form/'+formId+'/field/'+fieldId);
        }

        function updateField(formId, fieldId, field) {
            return $http.put('/api/assignment/form/'+formId+'/field/'+fieldId, field);
        }

        function reorderFields(formId, fields) {
            return $http.put('/api/assignment/form/'+formId+'/field', fields);
        }
    }

})();