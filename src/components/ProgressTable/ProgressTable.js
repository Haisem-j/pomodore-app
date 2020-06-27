//package imports
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap'

// Style imports
import './ProgressTable.scss';
import Tomato from '../../assets/tomato.png';


class ProgressTable extends React.Component {

    render() {
        return (
            <Container>
                <Row>
                    <Col className="progress-row">Date</Col>
                    <Col xs={6} className="progress-row">Tomato's</Col>
                    <Col className="progress-row">Hours Studied</Col>
                </Row>
                <Row>
                    <Col className="progress-col">Today</Col>
                    <Col xs={6} className="progress-col">
                        <img src={Tomato} alt="tomato" id="tomato" className="mr-2"/>
                        <img src={Tomato} alt="tomato" id="tomato" className="mr-2"/>
                        <img src={Tomato} alt="tomato" id="tomato" className="mr-2"/>
                        <img src={Tomato} alt="tomato" id="tomato" className="mr-2"/>
                        <img src={Tomato} alt="tomato" id="tomato" className="mr-2"/>
                        <img src={Tomato} alt="tomato" id="tomato" className="mr-2"/>
                    </Col>
                    <Col className="progress-col">7</Col>
                </Row>
                <Row>
                    <Col className="progress-col">Today</Col>
                    <Col xs={6} className="progress-col">
                        <img src={Tomato} alt="tomato" id="tomato" className="mr-2"/>
                        <img src={Tomato} alt="tomato" id="tomato" className="mr-2"/>
                        <img src={Tomato} alt="tomato" id="tomato" className="mr-2"/>
                        <img src={Tomato} alt="tomato" id="tomato" className="mr-2"/>
                        <img src={Tomato} alt="tomato" id="tomato" className="mr-2"/>
                        <img src={Tomato} alt="tomato" id="tomato" className="mr-2"/>
                        <img src={Tomato} alt="tomato" id="tomato" className="mr-2"/>
                        <img src={Tomato} alt="tomato" id="tomato" className="mr-2"/>
                        <img src={Tomato} alt="tomato" id="tomato" className="mr-2"/>
                        <img src={Tomato} alt="tomato" id="tomato" className="mr-2"/>
                    </Col>
                    <Col className="progress-col">7</Col>
                </Row>
                <Row>
                    <Col className="progress-col">Today</Col>
                    <Col xs={6} className="progress-col">
                        <img src={Tomato} alt="tomato" id="tomato" className="mr-2"/>
                        <img src={Tomato} alt="tomato" id="tomato" className="mr-2"/>
                    </Col>
                    <Col className="progress-col">7</Col>
                </Row>
            </Container>
        )
    }
}

export default ProgressTable;
