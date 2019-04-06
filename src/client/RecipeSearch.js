import React from "react";
import Recipes from "./Recipes.js";
import axios from "axios";

class RecipeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      recipes: [],
      balanced: false,
      highProtein: false,
      lowFat: false,
      lowCarb: false,
      lowSodium: false,
      warning: true
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleButtons = this.handleButtons.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.submit = this.submit.bind(this);

    this.warning = (
      <div className="column is-4">
        <p>
          Please enter an ingredient you would like to cook with.
        </p>
      </div>
    );
  }

  submit() {
    let ingredient = this.state.search;
    let diet = [];
    let dietString = "";

    if(this.state.balanced) {
      diet.push("balanced");
    }
    if(this.state.highProtein) {
      diet.push("high-protein");
    }
    if(this.state.lowFat) {
      diet.push("low-fat");
    }
    if(this.state.lowCarb) {
      diet.push("low-carb");
    }
    if(this.state.lowSodium) {
      diet.push("low-sodium");
    }
    if(diet.length < 1) {
      axios
        .get(
          `https://api.edamam.com/search?q=${ingredient}&app_id=2d4a708f&app_key=5519d3b7c9291019417c80cffaf82880&from=0&to=50`
        )
        .then(response => {
          this.setState({ recipes: response.data.hits });
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      for(let i = 0; i < diet.length; i++) {
        dietString = dietString + "&diet=" + diet[i];
      }
      axios
        .get(
          `https://api.edamam.com/search?q=${ingredient}${dietString}&app_id=2d4a708f&app_key=5519d3b7c9291019417c80cffaf82880&from=0&to=50`
        )
        .then(response => {
          this.setState({ recipes: response.data.hits });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  handleButtons(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleChange(event) {
    this.setState({ search: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ warning: false });
    this.submit();
  }

  render() {
    const style = !this.state.warning ? { display: "none" } : {};
    return (
      <div>
        <div className="text column is-centered" style={style}>
          {this.warning}
        </div>

        <div className="columns is-centered searchBar">
          <div className="column is-3">
            <form onSubmit={this.handleSubmit}>
              <h2>Enter Ingredient Below:</h2>
              <input
                className="input"
                value={this.state.search}
                onChange={this.handleChange}
                type="text"
                placeholder="Choose Ingredient..."
              />
              <div className="checkbox">
                <label>
                  <p>Balanced:
                  <input
                  name="balanced"
                  type="checkbox"
                  onChange={this.handleButtons}
                  />
                  </p>
                </label>
                <br />
                <label>
                  <p>High Protein
                  <input
                  name="highProtein"
                  type="checkbox"
                  onChange={this.handleButtons}
                  />
                  </p>
                </label>
                <br />
                <label>
                  <p>Low Fat
                  <input
                  name="lowFat"
                  type="checkbox"
                  onChange={this.handleButtons}
                  />
                  </p>
                </label>
                <br />
                <label>
                  <p>Low Carb
                  <input
                  name="lowCarb"
                  type="checkbox"
                  onChange={this.handleButtons}
                  />
                  </p>
                </label>
                <br />
                <label>
                  <p>Low Sodium
                  <input
                  name="lowSodium"
                  type="checkbox"
                  onChange={this.handleButtons}
                  />
                  </p>
                </label>
              </div>
            </form>
          </div>
          <div className="column is-9">
            <Recipes recipes={this.state.recipes} />
          </div>
        </div>
      </div>
    );
  }
}

export default RecipeList;
