// All packages needed
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import auth from '../utils/auth';

// Styles
import './App.scss';

// All the components imported here
import Login from '../components/Login/Login';
import SignUp from '../components/SignUp/SignUp';
import Dashboard from '../components/Dashboard/Dashboard';
import NoMatch from '../components/NoMatch/NoMatch';


const PrivateRoute = ({ component: Component, ...rest }) =>{

  return (
    <Route {...rest} render={(props) =>(
      auth.LoggedIn() ? <Component {...props}/> : <Redirect to="/login" />
    )}
    />
  )
}
class App extends React.Component {

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" render={() =>(<Redirect to="/dashboard" />)} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} /> 
          <Route path="*" component={NoMatch} />
          {/* <Route exact path="/" component={Dashboard} /> */}
        </Switch>
      </Router>

    )
  }
}

export default App;
