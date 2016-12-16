import React, { Component } from 'react';
import { connect } from 'react-redux';
import NotFoundPage from './NotFoundPage';

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {children, ...rest} = this.props;
    return (
      <div>
        {
          this.props.show404page['404'] ? <NotFoundPage /> : <div> {React.cloneElement(children, rest)} </div>
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(App);