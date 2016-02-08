var React = require('react');
var helper = require('../config/helper.js');
var Auth = require('../config/Auth.js');
var Logo = require('./logo');
var NavWrapper = require('react-materialize').Navbar;
var NavItem = require('react-materialize').NavItem;
var Dropdown = require('react-materialize').Dropdown
var Button = require('react-materialize').Button

var Navbar = React.createClass({
  componentDidMount: function(){
      document.documentElement.addEventListener('scroll', this.handleScroll);
  },
  getInitialState: function(){
    return {
      loggedIn: Auth.isLoggedIn(),
    }
  },
  logout: function(e){

    delete localStorage.token;
    helper.logout();
  },
  buttons: function(){
    if(this.state.loggedIn){
    return [<NavItem key="1" href="#/upload">Upload a Video</NavItem>, <NavItem key="2"href="#/record">Record a Video</NavItem>,  <NavItem key="3" href="#/dashboard">Your Videos</NavItem>, <NavItem key="4" href="#/public">Public Videos</NavItem>, <NavItem key="5" href="#/signin" onClick={this.logout}>Logout</NavItem>]
    } else {
      return [<NavItem key="1" href="#/signup">Signup</NavItem>, <NavItem key="2" href="#/signin">Log In</NavItem>]
    }
  },
  handleScroll: function() {
    this.refs.nav.getDOMNode().style.top = document.documentElement.scrollTop + 'px';
  },

  render:function(){
    return (
      <nav >
        <div className="nav-wrap">
         <a href="#" className="brand-logo left">
          <Logo/>
         </a> 
          <div id="mobile-nav" className="right"> 
            <Dropdown className="right" trigger={
              <Button id="menu-wrap" className="transparent" right>
               <a className="teal-text">
                 <i className="material-icons">menu </i>
               </a>
              </Button>
             }> 
             {this.buttons()}
            </Dropdown>
          </div>
        </div>
      </nav>
    )
  }
});

module.exports = Navbar;