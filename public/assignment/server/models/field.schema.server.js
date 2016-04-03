/**
 * Created by sumeetdubey on 4/1/16.
 */
var mongoose = require('mongoose');
module.exports = function(){
    var FieldSchema = mongoose.Schema({
        formId: String,
        label: String,
        type: String,
        placeholder: String,
        options: [{
            label: String,
            value: String
        }]
    },
        {collection: 'form.fields'}
    );

    return FieldSchema;
};