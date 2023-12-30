const router = require('express').Router();
const session = require('express-session');
const { Blog, User, Comment } = require('../models');
const withAuth = require('../utils/auth'); // Corrected import statement



// Sample route handler
router.get('/getUserId', (req, res) => {
  // Assume user ID is stored in req.session.user_id
  const userId = req.session.user_id;

  // Send the user ID in the response
  res.json({ userId });
});

// Sample route handler
router.get('/blog/:id', (req, res) => {
  // Assume user ID is stored in req.session.user_id
blogs =  Blog.findByPk({
  include: 'id',
})
  // Send the user ID in the response
  res.json({ blogs });
});




router.get('/', async (req, res) => {
  try {
    // Define an empty whereClause
    const whereClause = {};

    // Fetch blogs with associated comments
    const blogs = await Blog.findAll({
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment', 'user_id', 'created_at', 'updated_at'],
        },
      ],
      where: whereClause,
      attributes: ['id', 'blog_tittle', 'blog_content', 'author', 'updated_at'],
      order: req.query.sort
        ? [[req.query.sort, req.query.order || 'DESC']]
        : undefined,
    });

    let user = null;

    // Check if the user is logged in
    if (req.session.logged_in) {
      // Fetch user data
      const userId = req.session.user_id;
      const userData = await User.findByPk(userId, { attributes: { exclude: ['password'] } });

      // Check if user data exists before accessing properties
      user = userData ? userData.get({ plain: true }) : null;
    }

    res.render('blog', {
      firstName: user?.first_name || null,
      lastName: user?.last_name || null,
      email: user?.email || null,
      id: user?.id ||null,
      blogs: blogs.map((blog) => {
        return {
          ...blog.get({ plain: true }),
          comments: blog.Comments.map((comment) => comment.get({ plain: true })),
        };
      }),
    });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.post('/addblog', withAuth, async (req, res) => { // Added withAuth middleware
  try {
    const userId = req.session.user_id;
    const userData = userId ? await User.findByPk(userId, { attributes: { exclude: ['password'] } }) : null;

req.session.logged_in = true;
if (!userData) {
  res.status(500).json({message: 'login in please'})
}

    const newBlog = await Blog.create(req.body);
    res.status(201).json(newBlog);
  } catch (err) {
    console.error('Error creating blog post', err);
    res.status(500).json({ message: 'Internal server error', });
  }
});

router.put('/update/:id', withAuth, async (req, res) => {
  try {
    const userId = req.session.user_id;
    const userData = userId ? await User.findByPk(userId, { attributes: { exclude: ['password'] } }) : null;

    // Check if user data exists before accessing properties
    const user = userData ? userData.get({ plain: true }) : null;
    req.session.user_id = user.id;
    req.session.logged_in = true;

    const newBlog = await Blog.update(req.body, {
      where: { id: req.params.id, user_id: user.id },
    });

    res.status(201).json(newBlog);
  } catch (err) {
    console.error('Error updating blog post', err);
    res.status(500).json({ message: 'Internal server error', err });
  }
});


router.delete('/:id', withAuth, async (req, res) => {
  try {

    // Attempt to delete the blog
    const blogData = await Blog.destroy({
      where: {
        id: req.params.id,
      },
    });


    if (!blogData) {
      res.status(404).json({ message: 'No blog found with this id!' });
      return;
    }


    res.status(200).json(blogData);
  } catch (err) {
    console.error('Error deleting blog:', err);
    res.status(500).json(err);
  }
});

module.exports = router;
