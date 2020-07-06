//package imports
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap'
import auth from '../../utils/auth';
import { URL_LINK } from '../../utils/global';
import Loader from '../Loader/Loader';

// Style imports
import './ProgressTable.scss';
import Tomato from '../../assets/tomato.png';
import ProgressBar from 'react-bootstrap/ProgressBar'


class ProgressTable extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            curDate: '',
            tomatos: 0,
            loading: false,
            allDays: []
        }

        this.grabTomatos = this.grabTomatos.bind(this);
        this.loadingCheck = this.loadingCheck.bind(this);
        this.tomatoReturn = this.tomatoReturn.bind(this);
    }

    async componentDidMount() {
        let today = new Date();
        let day = today.getDate() < 10 ? '0' + today.getDate() : today.getDate();
        let month = (today.getMonth() + 1) < 10 ? '0' + (today.getMonth() + 1) : today.getMonth() + 1;
        let year = today.getFullYear();
        let tempDate = day + '/' + month + '/' + year;

        let tempSend = {
            curDate: tempDate
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
            this.setState({
                curDate: tempDate,
                tomatos: data.tomatos,
                allDays: data.allDays
            })
        } catch (error) {
            console.log(error);
        }

    }

    async grabTomatos() {
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

    loadingCheck() {
        this.setState({
            loading: true
        })
        console.log('DONE');
    }

    loadTables() {
        if (this.state.tomatos === 0 && this.state.allDays.length() === 0) {
            return (
                <React.Fragment>
                    <Row>
                        <Col className="progress-col" xs={3}>Today</Col>
                        <Col className="progress-col">Nothing Today</Col>
                    </Row>
                </React.Fragment>
            )
        } else if (this.state.tomatos === 0) {
            return (
                <React.Fragment>
                    <Row>
                        <Col className="progress-col" xs={3}>Today</Col>
                        <Col className="progress-col">Nothing Today</Col>
                    </Row>
                    {this.state.allDays.map(item => {
                        return (
                        <Row>
                            <Col className="progress-col">{item.Day}</Col>
                            <Col xs={6} className="progress-col">
                            {this.tomatoReturn(item.tomatos.length())}
                            </Col>
                        </Row>
                        )
                    })}
                </React.Fragment>
            )
        }


    }

    tomatoReturn(num) {
        let content = [];
        for (let i = 0; i < num.length(); i++) {
            content.push(<img src={Tomato} alt="tomato" id="tomato" className="mr-2" />)
        }
        return content
    }

    render() {
        console.log(this.state);
        if (!this.state.loading) {
            return (
                <Container>
                    <Loader triggerParentUpdate={this.loadingCheck} />
                </Container>
            )
        } else {
            return (
                <Container>
                    <Row>
                        <Col className="progress-row">Date</Col>
                        <Col xs={6} className="progress-row" >Tomato's</Col>
                        <Col className="progress-row">Hours Studied</Col>
                    </Row>
                    {this.loadTables()}
                </Container>
            )
        }
    }
}

export default ProgressTable;

{/* <Row>
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
</Row> */}