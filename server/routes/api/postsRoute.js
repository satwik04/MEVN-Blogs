const express = require('express')

const router = express.Router();

const postController = require('../../controller/postsContoller')

const isAuth = require('../../middleware/is-auth')
//GET Requests
router.get('/', postController.getPosts)

router.get("/dashboard", isAuth , postController.getDashboard);

router.get("/:id", postController.getPostbyId);

//Post Requests
router.post("/",isAuth, postController.addPost);

//Update Requests
router.put("/:id",isAuth, postController.updatePost);

//Delete Requests
router.delete("/:id",isAuth, postController.deletePost);

module.exports = router;