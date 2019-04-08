import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Recipe from './Recipe';
import axios from 'axios';
import './app.css';

class RecipeList extends Component {
  constructor(props) {
    super(props);
    // store the array of recipes in state
    this.state = { recipes: [] };

    this.updateRecipes= this.updateRecipes.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.updateComment = this.updateComment.bind(this);
  }

  componentDidMount() {
    // when the component mounts, fetch the recipe data from the server
    this.updateRecipes();
  }

  updateRecipes() {
    // make a GET request to the server for the recipe data, store it in state
    axios.get('api/recipes')
      .then(response => {
        this.setState({ recipes: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleDelete(recipeId) {
    // make a DELETE request to the server to remove the recipe with this recipeId
    axios.delete('api/recipes', {
        data: {
          id: recipeId
        }
      })
      .then(response => {
        // if delete was successful, re-fetch the list of recipes, will trigger a re-render
        this.updateRecipes();
      })
      .catch(error => {
        console.log(error);
      });
  }

  updateComment(recipe) {
    // make a UPDATE request to the server to update the recipe with this recipeId
    axios.put('api/recipes', recipe)
      .then(response => {
        // if delete was successful, re-fetch the list of recipes, will trigger a re-render
        this.updateRecipes();
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    // for each recipe object, produce a recipe Component
    const recipeList = this.state.recipes.map((r, i) => (
      <Recipe
        key={r._id}
        num = {i + 1}
        id={r._id}
        img={r.img}
        label={r.label}
        calories={r.calories}
        serves={r.serves}
        ingredients={r.ingredients}
        dietLabels={r.dietLabels}
        healthLabels={r.healthLabels}
        url={r.url}
        date={r.date}
        comment={r.comment}
        handleDelete={this.handleDelete}
        updateComment={this.updateComment}
      />
    ));

    return (
      <div>
      <br />
        <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
          <thead>
            <tr>
              <th> # </th>
              <th> Title </th>
              <th> Comment (click on a comment to change it) </th>
              <th> Calories </th>
              <th> Servings </th>
              <th> Link </th>
              <th> Date Added </th>
              <th> Delete </th>
            </tr>
          </thead>
          <tfoot>
            <tr>
              <th> # </th>
              <th> Title </th>
              <th> Comment (click on a comment to change it) </th>
              <th> Calories </th>
              <th> Servings </th>
              <th> Link </th>
              <th> Date Added </th>
              <th> Delete </th>
            </tr>
          </tfoot>
          <tbody>
            {recipeList}
          </tbody>
        </table>
      </div>
    );
  }
}

export default RecipeList;
