// This is the user controller
const{ User, Thought} = require('../models');

const uController = {
    getUsers(req, res){ // get all users function
        User.find()
        .select('-__v')
        .then((dbUserData) => {
          res.json(dbUserData);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
    },
    getOneUser(req,res){ // get one user by id
        User.findOne({ _id: req.params.userId })
        .select('-__v')
        .populate('friends')
        .populate('thoughts')
        .then((dbUserData) => {
          if (!dbUserData) {
            return res.status(404).json({ message: 'No user with this id!' });
          }
          res.json(dbUserData);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
    },
    createUser(req, res){ // create a new user
        User.create(req.body)
        .then((dbUserData) => {
          res.json(dbUserData);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
    },
    updateUser(req, res){ // Update a user
        User.findOneAndUpdate(
            { _id: req.params.userId },
            {
              $set: req.body,
            },
            {
              runValidators: true,
              new: true,
            }
          )
            .then((dbUserData) => {
              if (!dbUserData) {
                return res.status(404).json({ message: 'No user with this id!' });
              }
              res.json(dbUserData);
            })
            .catch((err) => {
              console.log(err);
              res.status(500).json(err);
            });
    },
    addFriend(req, res){ // add friend to friends list
        User.findOneAndUpdate({ _id: req.params.userId }, { $addToSet: { friends: req.params.friendId } }, { new: true })
        .then((dbUserData) => {
          if (!dbUserData) {
            return res.status(404).json({ message: 'No user with this id!' });
          }
          res.json(dbUserData);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
    },
    unFriend(req, res){ // remove friend from friends list
        User.findOneAndUpdate({ _id: req.params.userId }, { $pull: { friends: req.params.friendId } }, { new: true })
        .then((dbUserData) => {
          if (!dbUserData) {
            return res.status(404).json({ message: 'No user with this id!' });
          }
          res.json(dbUserData);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
    },
};

module.exports= uController;