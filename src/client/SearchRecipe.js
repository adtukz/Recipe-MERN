import React from 'react';
import RecipeCard from './RecipeCard';

class SearchRecipe extends React.Component {

  render() {
    const recipeList = this.props.recipes.map((r, i) => (
      <RecipeCard
        key={r.recipe.uri}
        link={r.recipe.url}
        name={r.recipe.label}
        image={r.recipe.image}
        calories={r.recipe.calories}
        currentRecipe={this.props.recipes[i]}
      />
    ));
    return (
      <div>
        <div className="columns is-multiline is-centered">{recipeList}</div>
      </div>
    );
  }
}
export default SearchRecipe;
