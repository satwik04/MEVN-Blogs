const Posts = require("../models/posts");
const User = require("../models/user");

exports.getPosts = (req, res, next) => {
  Posts.find()
    .sort({ createdAt: -1 })
    .then((posts) => {
      if (!posts) {
        const error = new Error("Post Not Found");
        error.statusCode = 404;
        throw error;
      }
      final_posts = [];
      posts.forEach((post) => {
        filtered_post = {
          _id: post.id,
          title: post.title,
          author: post.authorName,
          createdAt: post.createdAt,
        };
        final_posts.push(filtered_post);
      });
      res.send(final_posts);
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getPostbyId = (req, res, next) => {
  Posts.findById(req.params.id)
    .then((post) => {
      if (!post) {
        const error = new Error("Post Not Found");
        error.statusCode = 404;
        throw error;
      }
      res.status(200).send(post);
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
exports.getDashboard = (req, res, next) => {
  const userId = req.userId;
  Posts.find({ author: userId })
    .then((posts) => {
      if (!posts) {
        const error = new Error("Post Not Found");
        error.statusCode = 404;
        throw error;
      }
      final_posts = [];
      posts.forEach((post) => {
        filtered_post = {
          _id: post.id,
          title: post.title,
          createdAt: post.createdAt,
        };
        final_posts.push(filtered_post);
      });
      res.send(final_posts);
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.addPost = (req, res, next) => {
  let user;
  User.findById(req.userId)
    .then((res) => {
      user = res;
      console.log(user);
      const newPost = new Posts({
        title: req.body.title,
        content: req.body.content,
        createdAt: new Date().toJSON(),
        authorName: user.full_name,
        author: req.userId,
      });
      newPost
        .save()

        .then(() => {
          user.posts.push(newPost);
          return user.save();
        });
    })
    .then(() => {
      res.send().status(201);
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.updatePost = (req, res, next) => {
  (newTitle = req.body.title),
    (newContent = req.body.content),
    Posts.findById(req.params.id)
      .then((post) => {
        if (!post) {
          const error = new Error("Post To Be Updated Not Found");
          error.statusCode = 404;
          throw error;
        }
        if (post.author.toString() !== req.userId) {
          const error = new Error("Not Authorized");
          error.statusCode = 403;
          throw error;
        }
        post.title = newTitle;
        post.content = newContent;
        return post.save();
      })
      .then(() => {
        res.status(201).send();
      })

      .catch((err) => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
};

exports.deletePost = (req, res, next) => {
  const postId = req.params.id;
  Posts.findById(postId)
    .then((post) => {
      if (!post) {
        const error = new Error("Post To Be deleted Not Found");
        error.statusCode = 404;
        throw error;
      }
      if (post.author.toString() !== req.userId) {
        const error = new Error("Not Authorized");
        error.statusCode = 403;
        throw error;
      }
      return Posts.findByIdAndDelete(postId);
    })
    .then((result) => {
      return User.findById(req.userId);
    })
    .then((user) => {
      user.posts.pull(postId);
      return user.save();
    })
    .then(() => {
      res.send().status(200);
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
