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
        reorderFormFields: reorderFormFields
    };


    return api;

    function getAllFormFields(formId){
        var deferred = q.defer();

        FormModel.find({_id: formId}, function(err, doc){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(doc[0].fields);
            }
        });
        return deferred.promise;
    }

    function getFormFieldById(formId, fieldId){
        var deferred = q.defer();

        FormModel.find({_id: formId}, function(err, doc){
            if(err){
                deferred.reject(err);
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

    function deleteFieldById(formId, fieldId){
        var deferred = q.defer();

        FormModel.findById(formId, function(err, doc){
            if(err){
                deferred.reject(err);
            }
            else{
                //var fields = doc.fields;
                for(var index in doc.fields){
                    if(JSON.stringify(doc.fields[index]._id) === JSON.stringify(fieldId)){
                        doc.fields.splice(index, 1);
                    }
                }
                doc.save(function (err, doc){
                    if(err){
                        deferred.reject(err);
                    }
                    else{
                        deferred.resolve(doc.fields);
                    }
                })
            }
        });
        return deferred.promise;
    }

    function createField(formId, newField){
        var deferred = q.defer();
        newField.formId = formId;

        FormModel.findById(formId, function(err, doc){
            if(err){
                deferred.reject(err);
            }
            else{
                var field = new FieldModel(newField);
                doc.fields.push(field);
                doc.save(function (err, data){
                    deferred.resolve(data);
                })
            }
        });
        return deferred.promise;
    }

    function updateField(formId, fieldId, field){
        var deferred = q.defer();

        FormModel.findById(formId, function(err, doc){
            if(err){
                deferred.reject(err);
            }
            else{
                console.log("THIS IS DOC");
                console.log(fieldId);
                console.log(doc);
                for(var fieldIndex in doc.fields){
                    if(JSON.stringify(doc.fields[fieldIndex]._id) === JSON.stringify(fieldId)){
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
                            if(err){
                                console.log(err);
                            }
                            else {
                                deferred.resolve(doc.fields);
                            }
                        })
                    }
                }
            }
        });
        return deferred.promise;
    }

    function reorderFormFields(formId, ipFields){
      var deferred = q.defer();
      FormModel.findById(formId, function(err, doc){
          if(err){
              deferred.reject(err);
          }
          else{
              doc.fields = ipFields;
              doc.save(function (err, doc){
                  if(err){
                      deferred.reject(err);
                  }
                  else{
                      deferred.resolve(doc.fields);
                  }
              })
          }
      });
        return deferred.promise;
    }
};