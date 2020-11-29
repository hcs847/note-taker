const router = require("express").Router();
const notesRoutes = require("./notesRoutes");

// middleware
router.use(notesRoutes);

module.exports = router;
