import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import {connect} from 'react-redux'
import store, {fetchChannels, fetchMessages} from '../store'
// These values are all hardcoded...for now!
// Soon, we'll fetch them from the server!

export class ChannelList extends Component {
  constructor () {
    super();
    this.state = { channels: [] , messages: []};
  }

  async componentDidMount () {
    await this.props.fetchInitialChannels()
    this.setState(store.getState)
    console.log(this.state)

  }

  render () {
    return (
      <ul>
        {this.state.channels.map(channel=>(
          <li key={channel.id}>
            <NavLink to={`/channels/${channel.id}`} activeClassName="active">
            <span>{channel.name}</span>
            <span className="badge">{ this.state.messages.filter(message => message.channelId === channel.id).length }</span>
          </NavLink>
        </li>))}
      </ul>
    );
  }
}
const mapState = (state) => {
  return {
    messages: state.channels
  }
}
const mapDispatch = (dispatch) => {
  return {
    fetchInitialChannels: () => dispatch(fetchChannels())
  }
}


export default connect(mapState, mapDispatch)(ChannelList)