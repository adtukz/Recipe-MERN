import React, { Component } from 'react';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import axios from 'axios';
import User from './User';
import CreateUser from './CreateUser';
import EditUser from './EditUser';
import './app.css';


const App = () => {
  return(
    <BrowserRouter>
      <div>
        <Link to={'/create-user'}>
          <button type="button">
          Create new user
          </button>
        </Link>
        <Route exact path="/" component={UserList}/>
        <Route path="/edit-user/:id" component={EditUser}/>
        <Route path="/create-user" component={CreateUser}/>
      </div>
    </BrowserRouter>
  );
};

class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = { users: [] };

    this.updateUsers = this.updateUsers.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    this.updateUsers();
  }

  updateUsers() {
    axios.get('api/users')
      .then(response => {
        this.setState({ users: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleDelete(userId) {
    axios
      .delete('api/users', {
        data: {
          id: userId
        }
      })
      .then(response => {
        this.updateUsers();
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const userList = this.state.users.map(u => (
      <User
        key={u._id}
        id={u._id}
        name={u.name}
        image={u.picture}
        handleDelete={this.handleDelete}
      />
    ));

    return (
      <div>
        <div className="columns is-multiline">{userList}</div>
      </div>
    );
  }
}

export default App;
