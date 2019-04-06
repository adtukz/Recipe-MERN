import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Recipe from './Recipe';
import axios from 'axios';
import './app.css';

class RecipeList extends Component {
  constructor(props) {
    super(props);
    // store the array of users in state
    this.state = { recipes: [] };

    this.updateRecipes= this.updateRecipes.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    // when the component mounts, fetch the user data from the server
    this.updateRecipes();
  }

  updateRecipes() {
    // make a GET request to the server for the user data, store it in state
    axios.get('api/recipes')
      .then(response => {
        this.setState({ recipes: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleDelete(recipeId) {
    // make a DELETE request to the server to remove the user with this userId
    axios
      .delete('api/recipes', {
        data: {
          id: recipeId
        }
      })
      .then(response => {
        // if delete was successful, re-fetch the list of users, will trigger a re-render
        this.updateRecipes();
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    // for each user object, produce a User Component
    const recipeList = this.state.recipes.map(r => (
      <Recipe
        key={r._id}
        id={r._id}
        label={r.label}
        img={r.img}
        label={r.label}
        calories={r.calories}
        serves={r.serves}
        ingredients={r.ingredients}
        dietLabels={r.dietLabels}
        healthLabels={r.healthLabels}
        url={this.url}
        handleDelete={this.handleDelete}
      />
    ));

    return (
      <div class="columns is-multiline is-centered">
        {recipeList}
      </div>
    );
  }
}

export default RecipeList;
