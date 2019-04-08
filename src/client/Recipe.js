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
      comment: event.target.value
    });

  }

  submitComment(event) {
    event.preventDefault();

    let currentComment = this.state.comment;

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
      comment: currentComment
    }, () => {
      this.props.updateComment(this.state);
    });

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
        <th> <p> {this.props.num} </p> </th>
        <td> <p> {this.props.label} </p> </td>
        <td>
          <p onClick={this.editComment} style={styleComment}> {this.state.comment} </p>
          <form style={styleSearch}>
            <div class="columns">
              <div class="column is-9">
                <input
                  className="input"
                  value={this.state.comment}
                  onChange={this.handleChange}
                  type="text"
                  placeholder="Enter Comment..."
                />
              </div>
              <div class="column is-3">
                <button className="button is-primary" onClick={this.submitComment} type="button" >
                  Save Comment
                </button>
              </div>
            </div>
          </form>
        </td>
        <td> <p> {this.props.calories} </p> </td>
        <td> <p> {this.props.serves} </p> </td>
        <td> <p> <a href={this.props.url}> link </a> </p> </td>
        <td> <p> {this.props.date} </p> </td>
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
