/**
 * Created by sumeetdubey on 4/1/16.
 */
var mongoose = require('mongoose');
var FieldSchema = require('./field.schema.server.js')(mongoose);

module.exports = function(){

    var FormSchema = mongoose.Schema({
        title: String,
        userId: String,
        fields: [FieldSchema]
    },
        {collection: 'form'});

    return FormSchema;
};