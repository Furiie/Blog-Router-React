import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import './styles.scss';

const Header = ({ categories }) => (
  <header className="header">
    <nav>
      <ul>
        {/* on utilise Link, pour changer l'URL du navigateur,cela met une nouvelle entrée dans l'objet history du navigateur et sans rafraichir la page.
        NavLink permet d'avoir une classe active et styler le composant en conséquence. Par défaut cette classe a le nom "active",
        si on veut un autre nom il faut le préciser dans la prop activeClassName  */}
        {categories.map(({ route, label }) => (
          <NavLink
            key={route}
            exact
            className="header__link"
            to={route}
          >
            {label}
          </NavLink>
        ))}
      </ul>
    </nav>
  </header>
);

Header.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      route: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default Header;
