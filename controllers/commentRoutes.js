const router = require('express').Router();
const session = require('express-session');
const { User, Comment } = require('../models');
const withAuth = require('../utils/auth'); // Corrected import statement









router.post('/addcomment/', async (req, res) => { // Added withAuth middleware
  try {
    let userId = req.session.user_id;
userId = true;

    const newComment = await Comment.create(req.body);
    res.status(201).json(newComment);
    
  } catch (err) {
    console.error('Error creating comment', err);
    res.status(500).json({ message: 'Internal server error', });
  }
});

router.put('/updatecomment/:id', withAuth, async (req, res) => {
  try {
    const userId = req.session.user_id;
    const userData = userId ? await User.findByPk(userId, { attributes: { exclude: ['password'] } }) : null;

    // Check if user data exists before accessing properties
    const user = userData ? userData.get({ plain: true }) : null;
    req.session.user_id = user.id;
    req.session.logged_in = true;

    const newComment = await Comment.update(req.body, {
      where: { id: req.params.id, user_id: user.id },
    });

    res.status(201).json(newComment);
  } catch (err) {
    console.error('Error updating comment post', err);
    res.status(500).json({ message: 'Internal server error', err });
  }
});




router.delete('/comment/:id', withAuth, async (req, res) => {
  try {

    const commentId = req.params.id;
    const userId = req.session.user_id;

    const deletedRows = await Comment.destroy({
      where: { id: commentId, user_id: userId },
    });


    if (deletedRows === 0) {
      return res.status(404).json({ message: 'No comment found with this ID' });
    }


    res.status(200).json({ message: 'Successfully deleted' });
  } catch (err) {
    console.error('Error deleting comment:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
