import React, { Component } from 'react';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import axios from 'axios';

class EditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {_id: '', name: '', picture: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    axios.get('/api/users/' + this.props.match.params.id)
      .then(response => {
        this.setState({
          _id: response.data._id,
          name: response.data.name,
          picture: response.data.picture,
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({[name]: value});
  }

  handleSubmit(event) {
    event.preventDefault();

    axios.put('/api/users', this.state)
      .then(res => this.props.history.push('/'))
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={this.state.name} onChange={this.handleChange} />
        </label>
        <label>
          Image:
          <input type="text" name="picture" value={this.state.picture} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default EditUser;
