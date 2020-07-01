// All packages needed
import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

// Styles
import './App.scss';

// All the components imported here
import Clock from '../components/Clock/Clock';
import ProgressTable from '../components/ProgressTable/ProgressTable';
import Login from '../components/Login/Login';
import SignUp from '../components/SignUp/SignUp';


class App extends React.Component {

  render() {
    return (
      <Router>
        {/* <Container className="tempC">
          <Row className="app-clock">
          <Clock />
          </Row>
          <Row className="app-table">
          <ProgressTable />
        </Row>
        </Container> */}
        {/* <Container> */}

          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={SignUp} />
          </Switch>
        {/* </Container> */}
      </Router>

    )
  }
}

export default App;
