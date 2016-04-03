/**
 * Created by sumeetdubey on 4/1/16.
 */
var q = require('q');
var mongoose = require('mongoose');

module.exports = function(){

    var FormModel = mongoose.model("Form");
    var FieldSchema = require("./field.schema.server.js")(mongoose);
    var FieldModel = mongoose.model("Field", FieldSchema);

    var uuid = require('node-uuid');

    var api = {
        getAllFormFields: getAllFormFields,
        getFormFieldById: getFormFieldById,
        deleteFieldById: deleteFieldById,
        createField: createField,
        updateField: updateField,
        //reorderFormFields: reorderFormFields
    };


    return api;

    //function getAllFormFields(formId){
    //    for(var form in mock){
    //        if(mock[form]._id === formId){
    //            console.log("the returned fields are" +mock[form].fields);
    //            return mock[form].fields;
    //        }
    //    }
    //}

    function getAllFormFields(formId){
        var deferred = q.defer();

        FormModel.find({_id: formId}, function(err, doc){
            if(err){
                deferred.reject(err);
                console.log(err);
            }
            else{
                deferred.resolve(doc[0].fields);
            }
        });
        return deferred.promise;
    }

    //function getFormFieldById(formId, fieldId){
    //    var fields = getAllFormFields(formId);
    //    for(var field in fields){
    //        if (fields[field]._id === fieldId){
    //            return fields[field];
    //        }
    //    }
    //}

    function getFormFieldById(formId, fieldId){
        var deferred = q.defer();

        FormModel.find({_id: formId}, function(err, doc){
            if(err){
                deferred.reject(err);
                console.log(err);
            }
            else{
                var fields = doc[0].fields;
                for(var index in fields){
                    if(fields[index]._id === fieldId){
                        deferred.resolve(fields[index]);
                    }
                }
            }
        });
        return deferred.promise;
    }

    //function deleteFieldById(formId, fieldId){
    //    console.log("in deletion");
    //    var fields = getAllFormFields(formId);
    //    console.log(fields);
    //    console.log(fieldId);
    //    for(var field in fields){
    //        if (fields[field]._id === fieldId){
    //            fields.splice(field, 1);
    //            console.log("entry deleted");
    //            return fields;
    //        }
    //    }
    //}

    function deleteFieldById(formId, fieldId){
        var deferred = q.defer();

        FormModel.find({_id: formId}, function(err, doc){
            if(err){
                deferred.reject(err);
                console.log(err);
            }
            else{
                var fields = doc[0].fields;
                for(var index in fields){
                    if(fields[index]._id === fieldId){
                        fields.splice(index, 1);
                    }
                }
            }
        });
        return deferred.promise;
    }

    //function createField(formId, newField){
    //    newField._id = uuid.v1();
    //    var form = findFormById(formId);
    //    if(form.fields){
    //        form.fields.push(newField);
    //        console.log("newly created form ");
    //        console.log(form);
    //        return form;
    //    }
    //    else{
    //        form.fields = [];
    //        form.fields.push(newForm);
    //        return form;
    //    }
    //}

    function createField(formId, newField){
        var deferred = q.defer();
        newField.formId = formId;

        FormModel.findById(formId, function(err, doc){
            if(err){
                deferred.reject(err);
                console.log(err);
            }
            else{
                var field = new FieldModel(newField);
                field._id = uuid.v1();
                console.log("THIS IS THE FIELD");
                console.log(field);
                doc.fields.push(field);
                doc.save(function (err, data){
                    deferred.resolve(data);
                })
            }
        });
        return deferred.promise;
    }

    //function updateField(formId, fieldId, field){
    //    var form = findFormById(formId);
    //    var fields = form.fields;
    //    for(var fieldIndex in fields){
    //        if(fields[fieldIndex]._id === fieldId){
    //            if(field.placeholder){
    //                fields[fieldIndex].placeholder = field.placeholder;
    //            }
    //            if(field.label){
    //                fields[fieldIndex].label = field.label;
    //            }
    //            if(field.options){
    //                fields[fieldIndex].options = field.options;
    //            }
    //            if(field.choices){
    //                var arr = [];
    //                var newOptions = [];
    //                arr = field.choices.split(["\n"]);
    //                for (var element in arr){
    //                    var attributes = arr[element].split([':']);
    //                    var label = attributes[0];
    //                    var value = attributes[1];
    //                    var newOption = {"label": label, "value": value};
    //                    newOptions.push(newOption);
    //                }
    //                fields[fieldIndex].options = newOptions;
    //            }
    //            console.log(fields[fieldIndex]);
    //            return fields;
    //        }
    //    }
    //}

    function updateField(formId, fieldId, field){
        var deferred = q.defer();
        console.log(field);
        FormModel.findById(formId, function(err, doc){
            if(err){
                deferred.reject(err);
                console.log(err);
            }
            else{
                console.log("THIS IS DOC");
                console.log(fieldId);
                console.log(doc);
                for(var fieldIndex in doc.fields){
                    if(doc.fields[fieldIndex]._id === fieldId){
                        console.log("got a match");
                        if(field.placeholder){
                            doc.fields[fieldIndex].placeholder = field.placeholder;
                        }
                        if(field.label){
                            doc.fields[fieldIndex].label = field.label;
                        }
                        if(field.options){
                            doc.fields[fieldIndex].options = field.options;
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
                            doc.fields[fieldIndex].options = newOptions;
                        }
                        doc.save(function (err, doc){
                            deferred.resolve(doc.fields);
                            console.log("update return is ");
                            console.log(fields);
                        })
                    }
                }
            }
        });
        return deferred.promise;
    }

    //function reorderFormFields(formId, ipFields) {
    //    var form = findFormById(formId);
    //    console.log(" in reorder");
    //    console.log(ipFields);
    //    console.log(form.fields);
    //    form.fields = ipFields;
    //    return form.fields;
    //}
};