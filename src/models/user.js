const mongoose = require('mongoose');
const utils = require('./utils');

const { Schema } = mongoose;

let schemaType = new Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    mobile: {
        type: String,
        required: true,
    },
});

schemaType = utils.applyDefaultFields(schemaType);
schemaType = utils.applyDefaultHooks(schemaType);

module.exports = mongoose.model('User', schemaType);