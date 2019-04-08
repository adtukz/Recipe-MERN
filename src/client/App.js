import React from 'react';
import { HashRouter, Route, Link } from 'react-router-dom';
import About from './About.js';
import RecipeSearch from './RecipeSearch.js';
import RecipeList from './RecipeList.js';
import recipeLogo from "./images/recipeLogo.png";
import './app.css';

// 'main' Component. Sets up the React Router and respective routes
class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      burgerClass: ""
    };

    this.setBurgerActive = this.setBurgerActive.bind(this);
  }

  setBurgerActive() {
    console.log("test");
    if(this.state.open) {
      this.setState ({
        open:false,
        burgerClass: ""
      });
    } else {
      this.setState ({
        open:true,
        burgerClass: "is-active"
      });
    }
  }

  render() {
    let burgerClass = this.state.burgerClass;
    return (
    <HashRouter>
      <div>
        <nav className="navbar" role="navigation" aria-label="main navigation">
          <div className="navbar-brand">
            <Link to="/About">
              <img src={recipeLogo} alt="" className="navbar-image"/>
            </Link>

            <a role="button" className={"navbar-burger " + "burger " + burgerClass} onClick={this.setBurgerActive} aria-label="menu" aria-expanded="false" data-target="navbarMenu">
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>

          </div>

          <div id="navbarMenu" className="navbar-menu">
            <div className="navbar-start">
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

          </div>
        </nav>
        <Route exact path="/" component={RecipeSearch} />
        <Route path="/About/" component={About} />
        <Route path="/RecipesList/" component={RecipeList} />
      </div>
    </HashRouter>
  );
  }
}

export default App;
