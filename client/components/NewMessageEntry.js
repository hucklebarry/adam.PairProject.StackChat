import React, { Component } from 'react';
import store, {writeMessage, postMessage, gotNewMessageFromServer} from '../store'
import {connect} from 'react-redux'

export class NewMessageEntry extends Component {
  constructor () {
    super();
    this.state = {};
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(evt){
    this.props.write(evt.target.value)
  }
  handleSubmit(evt){
    evt.preventDefault()
    const content = this.props.newMessageEntry
    const channelId = this.props.channelId
    this.props.post({content, channelId})
  }

  render () {
    return (
      <form id="new-message-form" onSubmit={this.handleSubmit}>
        <div className="input-group input-group-lg">
          <input
            className="form-control"
            type="text"
            name="content"
            placeholder="Say something nice..."
            value= {this.props.newMessageEntry}
            onChange={this.handleChange}
          />
          <span className="input-group-btn">
            <button className="btn btn-default" type="submit">Chat!</button>
          </span>
        </div>
      </form>
    );
  }
}
const mapState = (state) => {
  return {
    newMessageEntry: state.newMessageEntry
  }
}
const mapDispatch = (dispatch) => {
  return {
    write: (somestring) => dispatch(writeMessage(somestring)),
    post: (obj) => dispatch(postMessage(obj))
  }
}
export default connect(mapState, mapDispatch)(NewMessageEntry)