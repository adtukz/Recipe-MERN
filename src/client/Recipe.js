import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

// Component to represent a single User 'Card'
// note that the edit button navigates to a new URL (which will load a new Component via React Router)
// whereas the delete button invokes a function in the parent Component
class Recipe extends React.Component {

  // define what happens when this componet gets drawn on the UI
  render() {
    return (
      <div className="column is-4">
        <div class="recipe">
          <div className="card-title titleStyle">
            <h2>{this.props.label} </h2>
          </div>

          <div className="card-image">
            <figure className="image is-4by3">
              <img alt='Profile'  className='imgStyle' src={this.props.img}></img>
            </figure>
            <button type="button" onClick={() => {this.props.handleDelete(this.props.id);}}>
              Delete
            </button>
          </div>

          <div className="card-content currentRecipeContentStyle">
            <div className="media">
              <div className="media-content contStyle">
                  <h2> Ingredients: </h2>
                    <p className="subtitle calStyle">{this.props.ingredients.map(txt => <p>{txt}</p>)}</p>
                  <h2> Diet Labels: </h2>
                  <p className="subtitle calStyle">{this.props.dietLabels.map(txt => <p>{txt}</p>)}</p>
                  <h2> Health Labels: </h2>
                  <p className="subtitle calStyle">{this.props.healthLabels.map(txt => <p>{txt}</p>)}</p>
                  <h2> Link to full recipe: </h2>
                  <a href={this.props.url}>{this.props.url}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Recipe;
