import React from 'react';
import { HashRouter, Route, Link } from 'react-router-dom';
import About from './About.js';
import RecipeSearch from './RecipeSearch.js';
import RecipeList from './RecipeList.js';
import recipeLogo from "./images/recipeLogo.png";
import './app.css';

// 'main' Component. Sets up the React Router and respective routes
const App = () => {
  return(
    <HashRouter>
      <div>
        <nav className="navbar" role="navigation">
          <div className="navbar-brand">
          <Link to="/About">
            <img src={recipeLogo} alt="" className="navbar-image"/>
          </Link>
          </div>
          <div className="navbar-menu">

            <Link to="/About/" className="navbar-item">
              About
            </Link>

            <Link to="/" className="navbar-item">
              Search
            </Link>

            <Link to="/RecipesList" className="navbar-item">
              Saved Recipes
            </Link>

          </div>
        </nav>
        <Route exact path="/" component={RecipeSearch} />
        <Route path="/About/" component={About} />
        <Route path="/RecipesList/" component={RecipeList} />
      </div>
    </HashRouter>
  );
};

export default App;
