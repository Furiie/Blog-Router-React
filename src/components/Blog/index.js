import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';

import { getPostsByCategory } from 'src/selectors';

import Header from 'src/components/Header';
import Posts from 'src/components/Posts';
import Footer from 'src/components/Footer';
import NotFound from 'src/components/NotFound';
import Single from 'src/components/Single';
import Spinner from 'src/components/Spinner';

import './styles.scss';

// import categoriesData from 'src/data/categories';
// import postsData from 'src/data/posts';

const Blog = () => {

  // useState permet d'avoir un state local sans passer par une class
  // cette fonction renvoie un tableau, avec la valeur de base et la fonction pour changer cette valeur
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  

  const loadPosts = () => {
  // on met notre application en état de loading
    setLoading(true);

    axios.get('https://oclock-open-apis.now.sh/api/blog/posts')
      // dans le cas où la requête est resolved (résolue), on passe dans la fonction .then
      // cette fonction prend en paramètre la réponse de la Promise
      .then((response) => {
        // console.log('réponse de l\'API', response.data);
        setPosts(response.data);
      })
      // dans le cas où la Promise est rejected
      .catch((error) => {
        console.log(error);
      })
      // dans tous les cas on passera par cette fonction
      .finally(() => {
        // on remet l'application en status normal
        setLoading(false);
      });
  };

  const loadCategories = () => {
    setLoading(true);

    axios.get('https://oclock-open-apis.now.sh/api/blog/categories')
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(loadCategories, []);
  // avec ce useEffect, je charge les données de l'application au 1e rendu grâce au tableau vide passé en 2e paramètre
  useEffect(loadPosts, []);

  return (
    <div className="blog">
      <Header categories={categories} />
      

      {loading && <Spinner />}
 {/* le composant Switch renvoie la 1e Route qu'il trouve et qui correspond à l'URL  */}
      {!loading && (
      <Switch>
        {categories.map((category) => {
          return (
            <Route
              key={category.route}
              path={category.route}
              exact
            >
              <Posts posts={getPostsByCategory(category.label, posts)} />
            </Route>
          );
        })}
        {/* pour afficher un article, on crée une Route qui affichera son contenu, lorsque l'URL aura comme path /post/:param */}
        <Route path="/post/:slug">
          <Single posts={posts} />
        </Route>

        <Redirect from="/jquery" to="/autre" />
        <Route>
          <NotFound />
        </Route>
      </Switch>
      )}
      <Footer />
    </div>
  );
};

// == Export
export default Blog;
