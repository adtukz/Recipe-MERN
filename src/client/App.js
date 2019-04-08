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
class App extends React.Component {
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
    return (
      <div>
        <nav className="navbar" role="navigation">
          <div className="navbar-brand">
          <Link to="/">
            <img src={recipeLogo} alt="" className="navbar-image"/>
          </Link>
          </div>
          <div className="navbar-menu">

          {!this.state.loggedIn && <Link className="navbar-item" to="/login">Login</Link>}
          {!this.state.loggedIn && <Link className="navbar-item" to="/register">Register</Link>}
          <Link className="navbar-item" to="/">Home</Link>
          <Link className="navbar-item" to="/secret">Secret</Link>
          {this.state.loggedIn && <Link className="navbar-item" to="/RecipeSearch">Recipe Search</Link>}
          {this.state.loggedIn && <Link className="navbar-item" to="/RecipeList">Recipe List</Link>}

          </div>

          <div className="navbar-end">
            {this.state.loggedIn && <Link className="navbar-item" to="/logout">Logout</Link>}
          </div>

        </nav>
        <Switch>
          <Route path="/RecipeSearch" component={RecipeSearch} />
          <Route exact path="/" component={About}/>
          <Route path="/RecipesList/" component={RecipeList} />
          <Route path="/login" render={(props) => <Login {...props} handleLogin={this.login} />} />
          <Route path="/logout" render={this.logout}/>
          <Route path="/register" component={Register} />
        </Switch>
      </div>
    );
  }
}

export default App;
