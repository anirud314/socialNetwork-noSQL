// this is the user model
const{Schema, model} = require('mongoose');

const userSchema = new Schema(
    {
       username: { // Username for a user
           type: String, // data type string
           unique: true, // has to be unique
           required: true, // is required when created
           trim: true, // trimmed
       },
       email: { // User email
        type: String, // data type string
        required: true, // is required when user is created
        unique: true,// has to be unique
        match: [/.+@.+\..+/, 'Not an email/Must be a email address!'], // using regex to validate if email address
       },
       thoughts: [ // array of thoughts/posts
           {
               type: Schema.Types.ObjectId, // holds _id values
               ref: 'Thought', // references thought model
           },
       ],
       friends: [ // array of friends
           {
                type: Schema.Types.ObjectId, // holds _id values
                ref: 'User', // references user models
           },
       ],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

userSchema.virtual('friendCount').get(function () { // gets friend count value based on length of friends array
    return this.friends.length
});

const User = model('User', userSchema);

module.exports = User;