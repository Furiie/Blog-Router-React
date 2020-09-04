import React from 'react';
import PropTypes from 'prop-types';
import Post from './Post';

import './styles.scss';

const Posts = ({ posts }) => (
  <main className="posts">
    <h1>Dev of Thrones</h1>
    <div className="posts__list">
      {posts.map((post) => (
        <Post
          key={post.id}
          {...post}
        />
      ))}
    </div>
  </main>
);

Posts.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

export default Posts;
