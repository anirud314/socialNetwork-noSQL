// this is the Thought model
const{Schema, model} = require('mongoose');
// pulling reaction schema for 
const sReaction = require('./Reaction');
// pulling dateFormat for usage for thoughts/posts
const date = require('../utils/dateFormat');

const thoughtSchema = new Schema(
    {
        thoughtText: { // text for each thought post
            type: String, // data type string
            required: 'You need to leave a thought!', // makes string required
            minlength: 1, // must be more than 1 character
            maxlength: 280 // must be less than 280 characters
        },
        createdAt: { // date value for when a post is created
            type: Date, // data type date
            default: Date.now, // sets default value to current timestamp of when a thought is created
            get: thoughtTime => date(thoughtTime) // getter formats the thoughtTime on the query
        },
        username: { // user name of poster
            type: String, // data type string
            required: true // user name is required
        },
        reactions: [sReaction] // array of nested reactions from reaction schema
    },
    {
        toJSON: {
            getters: true
        },
        id: false
    }
);

thoughtSchema.virtual('reactionCount').get(function(){ // retrieves the length of amount of reactions 
    return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;