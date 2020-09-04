/* eslint-disable import/prefer-default-export */

export const getPostsByCategory = (category, posts) => {
   // par défaut on renvoie tous les posts
  let filteredPosts = posts;

  if (category !== 'Accueil') {
    filteredPosts = posts.filter((post) => post.category === category);
  }

  return filteredPosts;
};
