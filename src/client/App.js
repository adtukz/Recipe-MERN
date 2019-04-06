import React from 'react';
import { HashRouter, Route, Link } from 'react-router-dom';
import CreateUser from './CreateUser';
import EditUser from './EditUser';
import UserList from './UserList';
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

            <Link to="/Recipes" className="navbar-item">
              Search
            </Link>

            <Link to="/RecipesList" className="navbar-item">
              Saved Recipes
            </Link>

          </div>
        </nav>
        <Route exact path="/" component={UserList}/>
        <Route path="/About/" component={About} />
        <Route path="/Recipes/" component={RecipeSearch} />
        <Route path="/RecipesList/" component={RecipeList} />
      </div>
    </HashRouter>
  );
};

export default App;
