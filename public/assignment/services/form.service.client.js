/**
 * Created by sumeetdubey on 3/5/16.
 */
(function(){
    var app = angular.module("FormBuilderApp");
    app.factory("FormService", FormService);

    function FormService(){
        var model = {
            forms: [
                {"_id": "000", "title": "Contacts", "userId": 123},
                {"_id": "010", "title": "ToDo",     "userId": 123},
                {"_id": "020", "title": "CDs",      "userId": 234}
            ],

        createFormForUser: createFormForUser,
        findAllFormsForUser: findAllFormsForUser,
        deleteFormById: deleteFormById,
        updateFormById: updateFormById
        };

        return model;

        function createFormForUser(userid, form, callback){
            var d = new Date();
            var t = d.getTime();
            var newform = {
                "_id": t,
                "title": form.name,
                "userId": userid
            };
            model.forms.push(newform);
            console.log(model.forms)
            callback(newform);
        }

        function findAllFormsForUser(userid, callback){
            for(var form in model.forms){
                console.log(form);
                console.log(userid);
                if(model.forms[form].userId === userid){
                    console.log(form);
                    callback(model.forms[form]);
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

    }
})();