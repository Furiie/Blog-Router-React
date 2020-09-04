import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

import './styles.scss';

const Single = ({ posts }) => {
  // on peut récupérer le paramètre de l'URL grâce au custom hook fourni par react router : useParams.
  // Ce param aura le même nom que ce qu'on lui aura indiqué après les 2 points dans la prop path de la Route (ex: /post/:slug)
  const { slug } = useParams();
  
  // on recherche parmi les posts celui qui contient le même slug que le param
  const post = posts.find((p) => p.slug === slug);

  // lorsqu'on est avant le chargement des posts, on a un tableau vide comme données, du coup la fonction find ne trouve aucun post.
  // Pour ne pas avoir d'erreur à l'affiche, on met une vue provisoire le temps de récupérer les données
  if (!post) {
    return <div>loading single</div>;
  }

  return (
    <div className="single">
      <h1>{post.title}</h1>
      <p className="single__content">{post.content}</p>
    </div>
  );
};

Single.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default Single;
