/**
 * Created by zyg on 15/11/6.
 */
require('../../styles/main.scss');
require('../../common/utils');

let ReactDOM = require('react-dom');
let React = require('react');

let Navbar = require('../components/Navbar/index');

let ContentsBox = require('../componentsLayout/ContentsBox/index');

let AsideBoard = require('../components/AsideBoard/index');

let routerList = require('./router/index');

window.R = React;
window.RD = ReactDOM;

class Main extends React.Component {

  render(){
    return (
      <div>
          {routerList}
      </div>
    )
  }
}

ReactDOM.render(
  <Main />,
  document.querySelector('#topContainer')
);


