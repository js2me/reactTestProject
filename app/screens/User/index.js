import React, {Component, PropTypes} from 'react';
import Profile from './components/Profile'
import RepoFilter from './components/RepoFilter'
import RepoList from './components/RepoList'
import {browserHistory} from 'react-router'

export default class User extends Component {
  constructor() {
    super();
    this.state = {filter: ''}
  }

  handleFilterUpdate = (filter) => {
    this.setState({filter})
  };

  handleBack(e){
    // e.preventDefault();
    // console.log(Router);
    // console.log(Route);
    // console.log(browserHistory);
    browserHistory.push({pathname: '/'});
  };
  render() {
    const {username} = this.props.params;
    const {filter} = this.state;
    return (
      <div className="container">
        <button onClick={this.handleBack}>BACK</button>
        <div className="row">
          <div className="col-sm-3">
            <Profile username={username} />
          </div>
          <div className="col-sm-9">
            <h3>Repositories</h3>
            <RepoFilter onUpdate={this.handleFilterUpdate} />
            <RepoList filter={filter} username={username} />
          </div>
        </div>
      </div>
    );
  }
}

User.propTypes = {
  params: PropTypes.shape({
    username: PropTypes.string
  })
};
User.contextTypes = {
  router: React.PropTypes.object.isRequired,
};
