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
      <tr>
        <th> {this.props.num} </th>
        <th> {this.props.label} </th>
        <td> {this.props.calories} </td>
        <td> {this.props.serves} </td>
        <td> <a href={this.props.url}> link </a> </td>
        <td> {this.props.date} </td>
        <td>
          <button className="button" type="button" onClick={() => {this.props.handleDelete(this.props.id);}}>
            Delete
          </button>
        </td>
      </tr>
    );
  }
}

export default Recipe;
