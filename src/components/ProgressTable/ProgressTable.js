//package imports
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap'
import auth from '../../utils/auth';
import { URL_LINK } from '../../utils/global';

// Style imports
import './ProgressTable.scss';
import Tomato from '../../assets/tomato.png';


class ProgressTable extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            curDate: '',
            tomatos: 0
        }

        this.grabTomatos = this.grabTomatos.bind(this)
    }

    async componentDidMount(){
        let today = new Date();
        let day = today.getDate() < 10 ? '0' + today.getDate() : today.getDate();
        let month = (today.getMonth() + 1) < 10 ? '0' + (today.getMonth() + 1) : today.getMonth() + 1;
        let year = today.getFullYear();
        let tempDate = day + '/' + month + '/' + year;

        let tempSend = {
            curDate: this.state.curDate
        }
        try {
            let response = await fetch(`${URL_LINK}/api/posts/`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'auth-token': auth.useToken().token
                },
                body: JSON.stringify(tempSend)
            })
            let data = await response.json()
            this.setState({
                curDate: tempDate,
                tomatos: data.tomatos
            })
        } catch (error) {
            console.log(error);
        }
        
    }

    async grabTomatos(){
        let tempSend = {
            curDate: this.state.curDate
        }
        try {
            let response = await fetch(`${URL_LINK}/api/posts/`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'auth-token': auth.useToken().token
                },
                body: JSON.stringify(tempSend)
            })
            let data = await response.json()
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        console.log(this.state);
        return (
            <Container>
                <Row>
                    <Col className="progress-row">Date</Col>
                    <Col xs={6} className="progress-row" >Tomato's</Col>
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
