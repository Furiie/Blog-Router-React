import React from 'react';
import PropTypes from 'prop-types';

// pour empêcher les attaques XSS, on utilise la librairie DOMPurify qui va nettoyer le code HTML
import DOMPurify from 'dompurify';

import { Link } from 'react-router-dom';

const Post = ({
  title,
  category,
  excerpt,
  slug,
}) => {
  const createMarkup = () => ({
    __html: DOMPurify.sanitize(excerpt, {
      ALLOWED_TAGS: ['em', 'strong'],
    }),
  });

  return (

    <article className="post">
      {/* ici on veut changer le path de l'URL au clic sur un post, on la change par /post/le-nom-du-slug */}
      <Link to={`/post/${slug}`}>
        <h2 className="post__title">{title}</h2>
        <div className="post__category">{category}</div>
        <p
          className="post__excerpt"
          dangerouslySetInnerHTML={createMarkup()}
        />
      </Link>
    </article>
  );
};

Post.propTypes = {
  category: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  excerpt: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
};

export default Post;
