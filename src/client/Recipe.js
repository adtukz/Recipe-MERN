import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

// Component to represent a single User 'Card'
// note that the edit button navigates to a new URL (which will load a new Component via React Router)
// whereas the delete button invokes a function in the parent Component
class Recipe extends React.Component {
  constructor(props) {
    super(props);
    // store the array of users in state
    this.state = {
      comment: 'test',
      styleComment: true,
      styleSearch: false
    };

    this.editComment= this.editComment.bind(this);
    this.submitComment= this.submitComment.bind(this);
    this.handleChange= this.handleChange.bind(this);
  }

  componentDidMount() {
    this.setState({
      comment: this.props.comment,
      styleComment: true,
      styleSearch: false
    });
  }

  handleChange(event) {

    this.setState({
      _id: this.props.id,
      img: this.props.img,
      label: this.props.label,
      calories: this.props.calories,
      serves: this.props.serves,
      ingredients: this.props.ingredients,
      dietLabels: this.props.dietLabels,
      healthLabels: this.props.healthLabels,
      url: this.props.url,
      date: this.props.date,
      comment: event.target.value
    });

  }

  submitComment(event) {
    event.preventDefault();

    let currentComment = this.state.comment;

    console.log(this.state);

    this.props.updateComment(this.state);

    this.setState({
      comment: currentComment,
      styleComment: true,
      styleSearch: false
    });

  }

  editComment(event) {
    this.setState({
      comment: this.state.comment,
      styleComment: false,
      styleSearch: true
    });
  }

  // define what happens when this componet gets drawn on the UI
  render() {
    const styleComment = !this.state.styleComment ? { display: "none" } : {};
    const styleSearch = !this.state.styleSearch ? { display: "none" } : {};
    return (
      <tr>
        <th> {this.props.num} </th>
        <td> {this.props.label} </td>
        <td>
          <p onClick={this.editComment} style={styleComment}> {this.state.comment} </p>
          <form style={styleSearch}>
            <input
              className="input"
              value={this.state.comment}
              onChange={this.handleChange}
              type="text"
              placeholder="Enter Comment..."
            />
            <button className="button is-primary" onClick={this.submitComment} type="button" >
              Save Comment
            </button>
          </form>
        </td>
        <td> {this.props.calories} </td>
        <td> {this.props.serves} </td>
        <td> <a href={this.props.url}> link </a> </td>
        <td> {this.props.date} </td>
        <td>
          <button className="button is-danger is-fullwidth" type="button" onClick={() => {this.props.handleDelete(this.props.id);}}>
            Delete
          </button>
        </td>
      </tr>
    );
  }
}

export default Recipe;
