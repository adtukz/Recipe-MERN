import React from "react";

class About extends React.Component {
  render() {
    return (
      <div>
        <div className="columns is-multiline is-centered">
          <div className="column is-6">

            <h1> Welcome to my Recipe App! </h1>

            <br />

            <p>
              Welcome to my recipe app, created for my advanced javascript assignment two.
              The object of this app is to learn how to create a MERN stack based website.
              The MERN stack is Mongo, Express, React and Node.js, working together to create a full stack website.
              A full stack website includes front-end and back-end.
              The front end is searching for recipes or  viewing  recipes saved in a database.
              The back-end is saving recipes into a database which can be then viewed in the front end.
              This app will allow users to search for recipes with certain requirements.
            </p>

            <br />

            <p>
              To use the app simply go to the search page to view recipes.
              By utilizing the search functions on the left hand side you can filter for certain types of recipes.
              If you click on a recipe you will be able to gather more information about that recipe.
              If you would like to save a recipe click save to add the recipe to your saved recipes page.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default About;
