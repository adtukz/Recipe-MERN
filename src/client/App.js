import React from 'react';
import { HashRouter, Route, Link, Switch } from 'react-router-dom';
import About from './About.js';
import Secret from './Secret';
import Login from './Login';
import Register from './Register';
import RecipeSearch from './RecipeSearch.js';
import RecipeList from './RecipeList.js';
import recipeLogo from "./images/recipeLogo.png";
import './app.css';

// 'main' Component. Sets up the React Router and respective routes
class App extends Component {
  constructor() {
    super();
    this.state = {loggedIn: false};
    this.logout = this.logout.bind(this);
    this.login = this.login.bind(this);
  }

  logout(props) {
    axios.get('api/logout')
      .then(res => {
        this.setState({loggedIn: false});
        props.history.push('/');
      })
      .catch( err => console.log(err));
    return null;
  }

  login() {
    this.setState({loggedIn: true});
  }

  render(){
    <div>
      <nav className="navbar" role="navigation">
        <div className="navbar-brand">
        <Link to="/About">
          <img src={recipeLogo} alt="" className="navbar-image"/>
        </Link>
        </div>
        <div className="navbar-menu">

        <Link to="/">Home</Link>
        <Link to="/secret">Secret</Link>
        {!this.state.loggedIn && <Link to="/login">Login</Link>}
        {!this.state.loggedIn && <Link to="/register">Register</Link>}
        {this.state.loggedIn && <Link to="/RecipeSearch">Recipe Search</Link>}
        {this.state.loggedIn && <Link to="/RecipeList">Recipe List</Link>}

        </div>

        <div className="navbar-end">
          {this.state.loggedIn && <Link to="/logout">Logout</Link>}
        </div>

      </nav>
      <Switch>
        <Route path="/RecipeSearch" component={RecipeSearch} />
        <Route exact path="/" component={About}/>
        <Route path="/RecipesList/" component={RecipeList} />
        <Route path="/login" render={(props) => <Login {...props} handleLogin={this.login} />} />
        <Route path="/logout" render={this.logout}/>
      </Switch>
    </div>
  }
};

export default App;
