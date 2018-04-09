const mongoose = require('mongoose');
const validate = require('mongoose-validator');

const Schema = mongoose.Schema;

// Product validators
const nameValidator = [
    validate({
        validator: 'isLength',
        arguments: [5, 50],
        message: 'Name must be at least {ARGS[0]} and less than {ARGS[1]} characters'
    })
];
const descriptionValidator = [
    validate({
        validator: 'isLength',
        arguments: [5, 300],
        message: 'Name must be at least {ARGS[0]} and less than {ARGS[1]} characters'
    })
];
const urlValidator = [
    validate({
        validator: 'isURL',
        arguments: [{protocols: ['https']}],
    })
];

const productSchema = new Schema({
    name: {type: String, validate: nameValidator},
    description: {type: String, validate: descriptionValidator},
    downloadURL: {type: String, validate: urlValidator},
    amount: {type: Number, min: 50, max: 10000},
    currency: {type: String, default: 'USD'},
    created_at: Date,
    updated_at: Date
});

module.exports = mongoose.model('Product', productSchema);;
