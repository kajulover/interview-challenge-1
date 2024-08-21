const express = require('express');
const { fetchPosts } = require('./posts.service');
const { fetchUserById } = require('../users/users.service');
const axios = require('axios');
const router = express.Router();

router.get('/', async (req, res) => {
  const posts = await fetchPosts();

  const postsWithImages = await posts.reduce(async (accPromise, post) => {
    // TODO use this route to fetch photos for each post
    const acc = await accPromise;
   let user = await fetchUserById(post.userId);
   let {data:images} = await axios.get(`https://jsonplaceholder.typicode.com/albums/${post.id}/photos`);
   const postWithImages = {
    ...post,
    ...user,
    images: images.map((image) => ({
      url: image.url,
    })),
  };
    return [
      ...acc,
      postWithImages
    ];
  }, Promise.resolve([]));

  res.json(postsWithImages);
});

module.exports = router;
