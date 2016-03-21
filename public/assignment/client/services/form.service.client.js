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


        //function createFormForUser(userid, form, callback){
        //    var d = new Date();
        //    var t = d.getTime();
        //    var newform = {
        //        "_id": t,
        //        "title": form.title,
        //        "userId": userid
        //    };
        //    model.forms.push(newform);
        //    console.log(model.forms);
        //    callback(newform);
        //}
        //
        //function findAllFormsForUser(userid, callback){
        //    var count = 0;
        //    for(var form in model.forms){
        //        console.log(form);
        //        console.log(userid);
        //        if(model.forms[form].userId === userid){
        //            console.log(form);
        //            callback(model.forms[form]);
        //            count++;
        //        }
        //    }
        //    if(count==0){
        //        console.log("no forms");
        //        callback(null);
        //    }
        //}
        //
        //function deleteFormById(formid, callback){
        //    for(var form in model.forms){
        //        if(model.forms[form]._id == formid){
        //            console.log(form);
        //            model.forms.splice(form, 1);
        //            console.log(model.forms);
        //            callback(model.forms);
        //        }
        //    }
        //}
        //
        //function updateFormById(formid, newform, callback){
        //    for(var form in model.forms){
        //        if (model.forms[form]._id == formid){
        //            model.forms[form].title = newform.title;
        //        }
        //    }
        //    callback(model.forms[form]);
        //}

    }
})();