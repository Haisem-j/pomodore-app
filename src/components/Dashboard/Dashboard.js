// All packages needed
import React from 'react';
import { Container, Row } from 'react-bootstrap';

// All the components imported here
import Clock from '../Clock/Clock';
import ProgressTable from '../ProgressTable/ProgressTable';

class Dashboard extends React.Component {

    constructor(props) {
        super(props)

        this.child = React.createRef();
        this.checkStatus = this.checkStatus.bind(this)
        this.callAgain = this.callAgain.bind(this)
    }

    checkStatus(){
        this.callAgain()
    }

    callAgain(){
        this.child.current.callApi();
    }
    render() {
        return (
            <Container className="tempC">
                <Row className="app-clock">
                    <Clock checkStatus={this.checkStatus}/>
                </Row>
                <Row className="app-table">
                    <ProgressTable ref={this.child}/>
                </Row>
            </Container>
        )
    }
}

export default Dashboard;