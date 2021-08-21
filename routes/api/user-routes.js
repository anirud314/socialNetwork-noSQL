// this is the user routes
const router = require('express').Router();
const {
  getUsers,
  getOneUser,
  createUser,
  updateUser,
  addFriend,
  unFriend,
} = require('../../controllers/user-controller');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getOneUser).put(updateUser);

// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').post(addFriend).delete(unFriend);

module.exports = router;