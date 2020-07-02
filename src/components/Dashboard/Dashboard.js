// All packages needed
import React from 'react';
import { Container, Row } from 'react-bootstrap';

// All the components imported here
import Clock from '../Clock/Clock';
import ProgressTable from '../ProgressTable/ProgressTable';

class Dashboard extends React.Component {

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

export default Dashboard;