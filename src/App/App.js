// All packages needed
import React from 'react';
import { Container, Row } from 'react-bootstrap';


// Styles
import './App.scss';

// All the components imported here
import Clock from '../components/Clock/Clock';
import ProgressTable from '../components/ProgressTable/ProgressTable';


class App extends React.Component {

  render() {
    return (
      <Container className="tempC">
        <Row className="app-clock">
          <Clock />
        </Row>
        <Row className="app-table">
          <ProgressTable />
        </Row>
      </Container>

    )
  }
}

export default App;
