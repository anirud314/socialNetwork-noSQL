// This is the reaction model
const {Schema, Types} = require('mongoose');
const date = require('../utils/dateFormat');

const reactionSchema = new Schema(
    {
        reactionId: { // id of reaction to a thought
            type: Schema.Types.ObjectId, // data type mongoose's objectID
            default: () => new Types.ObjectId() // set to new objectId by default
        },
        reactionBody: { // body/text of the reaction to a thought
            type: String, // dataType String
            required: true,// required 
            maxlength:280 // max length 280 character max
        },
        username:{ // each reaction has a username associated to it
            type: String, // datatype String
            required: true // required
        },
        createdAt: { // each reaction has a date for when its created 
            type: Date, // data type Date
            default: Date.now, // set default value to current timestamp
            get: reactTime => date(reactTime) // getter method to format reactTime on query
        }
    },
    {
        toJSON:{
            getters: true
        },
        id: false
    }
);

module.exports = reactionSchema;