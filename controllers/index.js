const router = require('express').Router();

const blogRoutes = require('./blogRoutes');
const userRoutes = require('./userRoutes');
const commentRoutes = require('./commentRoutes');
router.use('/user', userRoutes);
router.use('/', blogRoutes);
router.use('/', commentRoutes);
module.exports = router;