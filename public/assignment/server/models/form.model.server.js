/**
 * Created by sumeetdubey on 3/17/16.
 */

module.exports = function(){
    var uuid = require('node-uuid');
    var mock = require("./form.mock.json");

    //user schema
    //var UserSchema = require("./user.schema.server.js")

    var api = {
        createForm: createForm,
        findFormsByUserId: findFormsByUserId,
        findFormById: findFormById,
        findFormByTitle: findFormByTitle,
        deleteFormById: deleteFormById,
        updateFormById: updateFormById,
        getAllFormFields: getAllFormFields,
        getFormFieldById: getFormFieldById,
        deleteFieldById: deleteFieldById,
        createField: createField,
        updateField: updateField,
        reorderFormFields: reorderFormFields
    };

    return api;

    function createForm(userId, ipForm){
        var uuid1 = uuid.v1();
        ipForm._id = uuid1;
        ipForm.userId = userId;
        ipForm.fields = [];
        mock.push(ipForm);
        var forms = findFormsByUserId(userId);
        return forms;
    }

    function findFormsByUserId(userId){
        var userForms = [];
        var form;
        for(form in mock){
            if(mock[form].userId === userId){
                userForms.push(mock[form]);
            }
        }
        return userForms;
    }

    function findFormById(formId){
        var form;
        var count = 0;
        for(form in mock){
            if(mock[form]._id === formId) {
                count = 1;
                return mock[form];
            }
        }
        if(count==0){
            return null;
        }
    }

    function findFormByTitle (title){
        var form;
        var count = 0;

        for (form in mock){
            if(mock[form].title === title){
                count = 1;
                return (mock[form]);
            }
        }
        if (count==0){
            return null;
        }
    }

    function deleteFormById(formId){
        for(form in mock){
            if(mock[form]._id === formId){
                mock.splice(form, 1);
            }
        }
        var currUserForms = findFormById(formId);
        return currUserForms;
    }

    function updateFormById(formId, ipForm){
        var form;
        for(form in mock){
            if(mock[form]._id === formId){
                mock[form].title = ipForm.title;
            }
        }
        console.log(mock);
        return mock[form];
    }

    function getAllFormFields(formId){
        for(var form in mock){
            if(mock[form]._id === formId){
                console.log("the returned fields are" +mock[form].fields);
                return mock[form].fields;
            }
        }
    }

    function getFormFieldById(formId, fieldId){
        var fields = getAllFormFields(formId);
        for(var field in fields){
            if (fields[field]._id === fieldId){
                return fields[field];
            }
        }
    }

    function deleteFieldById(formId, fieldId){
        console.log("in deletion");
        var fields = getAllFormFields(formId);
        console.log(fields);
        console.log(fieldId);
        for(var field in fields){
            if (fields[field]._id === fieldId){
                fields.splice(field, 1);
                console.log("entry deleted");
                return fields;
            }
        }
    }

    function createField(formId, newField){
        newField._id = uuid.v1();
        var form = findFormById(formId);
        if(form.fields){
            form.fields.push(newField);
            console.log("newly created form ");
            console.log(form);
            return form;
        }
        else{
            form.fields = [];
            form.fields.push(newForm);
            return form;
        }
    }

    function updateField(formId, fieldId, field){
        var form = findFormById(formId);
        var fields = form.fields;
        for(var fieldIndex in fields){
            if(fields[fieldIndex]._id === fieldId){
                if(field.placeholder){
                    fields[fieldIndex].placeholder = field.placeholder;
                }
                if(field.label){
                    fields[fieldIndex].label = field.label;
                }
                if(field.options){
                    fields[fieldIndex].options = field.options;
                }
                if(field.choices){
                    var arr = [];
                    var newOptions = [];
                    arr = field.choices.split(["\n"]);
                    for (var element in arr){
                        var attributes = arr[element].split([':']);
                        var label = attributes[0];
                        var value = attributes[1];
                        var newOption = {"label": label, "value": value};
                        newOptions.push(newOption);
                    }
                    fields[fieldIndex].options = newOptions;
                }
                console.log(fields[fieldIndex]);
                return fields;
            }
        }
    }


    function reorderFormFields(formId, ipFields) {
        var form = findFormById(formId);
        console.log(" in reorder");
        console.log(ipFields);
        console.log(form.fields);
        form.fields = ipFields;
        return form.fields;
    }
};