/**
 * Created by sumeetdubey on 3/5/16.
 */
(function(){
    var app = angular.module("FormBuilderApp");
    app.factory("FormService", FormService);

    function FormService($http){
        var api = {

        createFormForUser: createFormForUser,
        findAllFormsForUser: findAllFormsForUser,
        deleteFormById: deleteFormById,
        updateFormById: updateFormById
        };

        return api;

        function createFormForUser(userId, form){
            return $http.post('/api/assignment/user/' +userId +'/form', form);
        }

        function findAllFormsForUser(userId){
            return $http.get("/api/assignment/user/" +userId +'/form');
        }

        function deleteFormById(formId){
            return $http.delete('/api/assignment/form/' +formId);
        }

        function updateFormById(formId, form){
            return $http.put('/api/assignment/form/' +formId, form);
        }
    }
})();