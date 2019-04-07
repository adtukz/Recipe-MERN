import React from "react";
import SearchRecipe from "./SearchRecipe.js";
import axios from "axios";

class RecipeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      recipes: [],
      dietLabel: "none",
      warning: true
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleButtons = this.handleButtons.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDietLabel = this.handleDietLabel.bind(this);
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
    let dietString = "";

    if(this.state.dietLabel !== "none") {
      dietString = "&diet=" + this.state.dietLabel;
    }

    let search = ingredient + dietString

    axios
      .get(
        `https://api.edamam.com/search?q=${search}&app_id=2d4a708f&app_key=5519d3b7c9291019417c80cffaf82880&from=0&to=50`
      )
      .then(response => {
        this.setState({ recipes: response.data.hits });
      })
      .catch(err => {
        console.log(err);
      });
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

  handleDietLabel(value) {

    this.setState({
      dietLabel: value
    });

    let dropitem;

    for(let i = 1; i <= 6; i++) {
      if(i === 1) {
        dropitem = this.refs.Drop1;
        dropitem.className = "dropdown-item";
      }
      if(i === 2) {
        dropitem = this.refs.Drop2;
        dropitem.className = "dropdown-item";
      }
      if(i === 3) {
        dropitem = this.refs.Drop3;
        dropitem.className = "dropdown-item";
      }
      if(i === 4) {
        dropitem = this.refs.Drop4;
        dropitem.className = "dropdown-item";
      }
      if(i === 5) {
        dropitem = this.refs.Drop5;
        dropitem.className = "dropdown-item";
      }
      if(i === 6) {
        dropitem = this.refs.Drop6;
        dropitem.className = "dropdown-item";
      }
    }

    event.target.className = "dropdown-item is-active";

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
            </form>

            <br />

            <div className="dropdown is-hoverable">
            <p> Diet Label: </p>
              <div className="dropdown-trigger">
                <button className="button">
                  <span>{this.state.dietLabel}</span>
                  <span className="icon is-small">
                    <i className="fas fa-angle-down"></i>
                  </span>
                </button>
              </div>
              <div className="dropdown-menu" role="menu">
                <div className="dropdown-content" ref="dropmenu">
                  <a onClick={() => this.handleDietLabel("none")} ref="Drop1" id="Drop1" value="none" className="dropdown-item is-active"> None </a>
                  <a onClick={() => this.handleDietLabel("balanced")} ref="Drop2" id="Drop2" value="balanced" className="dropdown-item"> Balanced </a>
                  <a onClick={() => this.handleDietLabel("high-protein")} ref="Drop3" id="Drop3" value="highProtein" className="dropdown-item"> High Protein </a>
                  <a onClick={() => this.handleDietLabel("low-carb")} ref="Drop4" id="Drop4" value="lowCarb" className="dropdown-item"> Low Carb </a>
                  <a onClick={() => this.handleDietLabel("low-fat")} ref="Drop5" id="Drop5" value="lowFat" className="dropdown-item"> Low Fat </a>
                  <a onClick={() => this.handleDietLabel("low-sodium")} ref="Drop6" id="Drop6" value="lowSodium" className="dropdown-item"> Low Sodium </a>
                </div>
              </div>
            </div>
          </div>
          <div className="column is-9">
            <SearchRecipe recipes={this.state.recipes} />
          </div>
        </div>
      </div>
    );
  }
}

export default RecipeList;
