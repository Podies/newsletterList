import React from 'react';
import { connect } from 'react-redux'

const App = (props) => {
  const {children, ...rest} = props;
  return (
    <div>
      {React.cloneElement(children, rest)}
    </div>
  );
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(App);