/**
 * Created by sumeetdubey on 4/1/16.
 */
var mongoose = require('mongoose');
module.exports = function(){
    var userSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        emails: [String],
        phones: [String],
        roles: [String]
    },
        {collection: 'user'});

    return userSchema;
};