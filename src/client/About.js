import React from "react";

class About extends React.Component {
  render() {
    return (
      <div>
        <div className="columns is-multiline is-centered">
          <div className="column is-4">

            <h1> Welcome to my Recipe App! </h1>

            <br />

            <p>
              Welcome to my recipe app, created for my advanced javascript assignment one.
              The object of this app is to learn how to create a react based website.
              This app will allow users to search for recipes with certain requirements.
            </p>

            <br />

            <p>
              To use the app simply go to the home page to view recipes.
              By utilizing the search functions on the left hand side you can filter for certain types of recipes.
              If you click on a recipe you will be able to gather more information about that recipe.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default About;
