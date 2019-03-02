import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import CreateUser from './CreateUser';
import EditUser from './EditUser';
import UserList from './UserList';

// 'main' Component. Sets up the React Router and respective routes
const App = () => {
  return(
    <HashRouter>
      <div>
        <Route exact path="/" component={UserList}/>
        <Route path="/edit-user/:id" component={EditUser}/>
        <Route path="/create-user" component={CreateUser}/>
      </div>
    </HashRouter>
  );
};

export default App;
