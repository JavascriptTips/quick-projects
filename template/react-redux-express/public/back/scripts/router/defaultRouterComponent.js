/**
 * Created by zyg on 16/3/19.
 */
import React,{Component} from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import PlayerList from '../../components/PlayerList'

import * as BasicActions from '../actions/basic.js'

class App extends Component {

  add(){
    this.actions.basicInit(this.props.basics);
  }

  render(){
    let {basics,actions} = this.props;

    return (
      <div>
        {basics}
        <button onClick={this.add.bind(this)} >
          +
        </button>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    basic:state.basic
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      BasicActions,
      dispatch
    ),
  }
}

let ConnectApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

module.exports = ConnectApp;