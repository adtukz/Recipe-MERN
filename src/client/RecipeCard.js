import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class RecipeCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullRecipe: false,
      img: "",
      label: "",
      calories: "",
      serves: "",
      ingredients: "",
      dietLabels: "",
      healthLabels: "",
      url: ""
    };

    this.handleClick = this.handleClick.bind(this);
    this.saveRecipe= this.saveRecipe.bind(this);
  }

  handleClick(event) {
    if(!this.state.fullRecipe) {
      this.setState({
        fullRecipe: true
      });
    } else {
      this.setState({
        fullRecipe: false
      });
    }
  }

  saveRecipe(event) {
    event.preventDefault();

    let currentImage = this.props.currentRecipe.recipe.image;
    let currentLabel = this.props.currentRecipe.recipe.label;
    let currentCalories = Math.round(this.props.currentRecipe.recipe.calories/this.props.currentRecipe.recipe.yield);
    let currentServes = this.props.currentRecipe.recipe.yield;
    let currentIngredients = this.props.currentRecipe.recipe.ingredientLines;
    let currentDietLabels = this.props.currentRecipe.recipe.dietLabels;
    let currentHealthLabels = this.props.currentRecipe.recipe.healthLabels;
    let currentUrl = this.props.currentRecipe.recipe.url;

    this.setState({
      fullRecipe: false,
      img: currentImage,
      label: currentLabel,
      calories: currentCalories,
      serves: currentServes,
      ingredients: currentIngredients,
      dietLabels: currentDietLabels,
      healthLabels: currentHealthLabels,
      url: currentUrl
    }, function() {
      axios.post('/api/recipe', this.state)
        .then(res => console.log("Saved Recipe")) // if successful go to home
        .catch(error => {
          console.log(error);
        });
    }
    );


  }

  render() {
    const currentRecipe = this.props.currentRecipe;
    if(!this.state.fullRecipe){
      return (
        <div className="column is-4">
          <div className="recipe">
            <span onClick={this.handleClick}>
            <div className="card-title titleStyle"> {currentRecipe.recipe.label} </div>
            <div className="card-image">
              <figure className="image is-4by3">
                <img alt='Profile'  className='imgStyle' src={currentRecipe.recipe.image}></img>
              </figure>
            </div>
            </span>
            <div className="card-content currentRecipeContentStyle">
              <div className="media">
                <div className="media-content contStyle">
                  <p className="subtitle calStyle">Contains {(Math.round(currentRecipe.recipe.calories/currentRecipe.recipe.yield))} calories per serving.</p>
                  <p className="subtitle calStyle">Serves {currentRecipe.recipe.yield} people.</p>
                  <form onSubmit={this.saveRecipe}>
                    <input type="submit" value="Save"/>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (this.state.fullRecipe) {
      return (
        <div className="column is-8 recipe">
          <div className="columns">

            <span onClick={this.handleClick}>

            <div className="column is-12 card-title titleStyle">
              <h2>{currentRecipe.recipe.label} </h2>
            </div>

            <div className="column is-12">
              <div className="card-content currentRecipeContentStyle">
                <div className="media">
                  <div className="media-content contStyle">
                      <h2> Ingredients: </h2>
                        <p className="subtitle calStyle">{currentRecipe.recipe.ingredientLines.map(txt => <p>{txt}</p>)}</p>
                      <h2> Diet Labels: </h2>
                      <p className="subtitle calStyle">{currentRecipe.recipe.dietLabels.map(txt => <p>{txt}</p>)}</p>
                      <h2> Health Labels: </h2>
                      <p className="subtitle calStyle">{currentRecipe.recipe.healthLabels.map(txt => <p>{txt}</p>)}</p>
                      <h2> Link to full recipe: </h2>
                      <a href={currentRecipe.recipe.uri}>{currentRecipe.recipe.url}</a>
                  </div>
                </div>
              </div>
            </div>
              </span>
          </div>
        </div>
      );
    }

  }
}

export default RecipeCard;
