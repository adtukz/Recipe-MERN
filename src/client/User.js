import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class RecipeCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };

    this.userLogin= this.userLogin.bind(this);
    this.userRegister= this.userRegister.bind(this);
  }

  userLogin (event) {
    event.preventDefault();

    let currentImage = this.props.currentRecipe.recipe.image;

    this.setState({
      fullRecipe: false,
    }, function() {
      axios.post('/api/user', this.state)
        .then(res => console.log("Saved Recipe")) // if successful go to home
        .catch(error => {
          console.log(error);
        });
    }
    );
  }

  userRegister (event) {
    event.preventDefault();

    let currentImage = this.props.currentRecipe.recipe.image;

    this.setState({
      fullRecipe: false,
    }, function() {
      axios.post('/api/user', this.state)
        .then(res => console.log("Saved Recipe")) // if successful go to home
        .catch(error => {
          console.log(error);
        });
    }
    );
  }

  render() {
    return (
      <div className="columns">

        <div className="column is-6">
          <h1> Login </h1>
          <form>
            <div class="columns">
              <div class="column is-12">
                <p> Username </p>
                <input>
                </input>
              </div>
              <div class="column is-12">
                <p> Password </p>
                <input>
                </input>
              </div>
            </div>
          </form>
        </div>

        <div className="column is-6">
          <h1> Register </h1>
        </div>

      </div>
    );
  }
}

export default RecipeCard;
