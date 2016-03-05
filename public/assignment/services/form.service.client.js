/**
 * Created by sumeetdubey on 3/5/16.
 */
(function(){
    var app = angular.module("FormBuilderApp");
    app.factory("FormService", FormService)

    function FormService($scope){

        $scope.createFormForUser = createFormForUser;
        $scope.findAllFormsForUser = findAllFormsForUser;
        $scope.deleteFormById = deleteFormById;
        $scope.updateFormById = updateFormById;

        function createFormForUser(userid, form, callbaack){
            var newform = {
                "_id": "(new Date).getTime()",
                "title": form.title(),
                "userId": userid
            }
            $scope.forms.push(newform);
            callback(newform);
        }

        function findAllFormsForUser(userid, callback){
            for(form in forms){
                if(form.userId == userid){
                    callback(form)
                }
                else{
                    callbackk(null)
                }
            }
        }

        function deleteFormById(formid, callback){
            for(form in forms){
                if(form._id == formid){
                    forms.splice((forms.indexOf(form)), 1)
                    callback(forms);
                    break;
                }
            }
        }

        function updateFormById(formid, newform, callback){
            for(form in forms){
                if (form._id == formid){
                    form.title = newform.title;
                }
            }
            callback(forms);
        }

        var forms = [
            {"_id": "000", "title": "Contacts", "userId": 123},
            {"_id": "010", "title": "ToDo",     "userId": 123},
            {"_id": "020", "title": "CDs",      "userId": 234},
        ];

        $scope.forms = forms;

    }
})();