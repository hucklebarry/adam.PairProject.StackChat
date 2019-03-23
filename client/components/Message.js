import React from 'react';
import {connect} from 'react-redux'

const mapState = (state) => {
  return {
    messages: state.messages
  }
}
const mapDispatch = (dispatch) => {
  return {
    fetchInitialMessages: () => dispatch(fetchMessages())
  }
}

function Message (props) {

  const message = props.message;

  return (
    <li className="media">
      <div className="media-left">
        <a href="#">
          <img className="media-object" src={message.author.image} alt="image" />
        </a>
      </div>
      <div className="media-body">
        <h4 className="media-heading">{ message.author.name }</h4>
        { message.content }
      </div>
    </li>
  );
}


export default connect(mapState, mapDispatch)(Message)
