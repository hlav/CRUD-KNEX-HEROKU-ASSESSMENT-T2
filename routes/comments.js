var express = require('express');
var router = express.Router();

function Posts() {
  return knex('posts')
};

function Comments() {
  return knex('comments')
};

router.get('/:post_id/comments', function(req, res, next) {
  Comments().where('post_id', req.params.post_id).first().then(function (comments) {
    res.json({'SUCCESS': comments });
  })
});

router.post('/:post_id/comments', function(req, res, next) {
  Posts().insert(req.body).then(function (posts) {
    res.redirect('/'+req.body.post.id+'/comments')
  })
});

router.get('/:post_id/comments/:id', function(req, res, next) {
  Comments().where('id', req.params.id).first().then(function (comments) {
    res.json({'SUCCESS': comments });
  })
});

router.get('/:post_id/comments/:id/edit', function(req, res, next) {
  Comments().where('id', req.params.id).first().then(function (comments) {
    res.json({'SUCCESS': comments });
  })
});

router.post('/:post_id/comments/:id', function(req, res, next) {
  Comments().insert(req.body).then(function (comments) {
    res.redirect('/'+req.body.post.id+'/comments')
  })
});

router.post('/:post_id/comments/delete', function(req, res, next) {
  Comments().delete().where('id',req.params.id).then(function (comments) {
    res.redirect('/'+req.body.post.id+'/comments')
  })
});

module.exports = router;
