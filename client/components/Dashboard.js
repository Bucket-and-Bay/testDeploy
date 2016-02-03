var React = require('react');
var Video = require('./Video.js');
var helper = require('../config/helper.js');
var Searchbar = require('./Searchbar.js');
var Navbar = require('./Navbar.js')

var Dashboard = React.createClass({
  getInitialState: function() {
    return {
      video: [],
      userVideos: []
    }
  },

  componentDidMount: function(){
    
    helper.getUserVideos().then(function(response){
      this.setState({
        video: response.data,
        userVideos: response.data
      })
    }.bind(this))
  },

  onSearch: function(query) {
    var results = [];
    if(query === '') {
      this.setState({ video: this.state.userVideos })
    } else {
      this.state.userVideos.forEach(function(item) {
        if (!item.title || !item.description) {
          return;
        }
        var title = item.title.toLowerCase();
        var description = item.description.toLowerCase();
        query = query.toLowerCase();
        if(title.indexOf(query) !== -1 || description.indexOf(query) !== -1) {
          results.push(item);
        }
      });
      this.setState({ video: results });
    }
  },

  render: function(){
    return (
    <div>
     <Navbar />
      <div className="container">
        <Searchbar onSearch={ this.onSearch } />
        <VideoInput />
        <div className="row">
        <Video data={this.state.video}/>
        </div>
      </div>
    </div>
    )
  }
});

module.exports = Dashboard;

