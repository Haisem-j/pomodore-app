// All packages needed
import React from 'react';
import { Row, Col, Container, Button } from 'react-bootstrap';
import auth from '../../utils/auth';
import { URL_LINK } from '../../utils/global';

// Styles imported here
import './Clock.scss'


class Clock extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            minutes: 0,
            seconds: 0,
            flag: false,
            timer: 0,
            isPaused: false,
            curDate: ''
        }

        this.handleTime = this.handleTime.bind(this);
        this.setCountDown = this.setCountDown.bind(this);
        this.pauseButton = this.pauseButton.bind(this);
        this.resetTimer = this.resetTimer.bind(this);
        this.clearAllIntervals = this.clearAllIntervals.bind(this);
        this.sendPost = this.sendPost.bind(this);
        this.testClick = this.testClick.bind(this)
    }

    componentDidMount() {
        this.myInterval = 0
        let today = new Date();
        let day = today.getDate() < 10 ? '0' + today.getDate() : today.getDate();
        let month = (today.getMonth() + 1) < 10 ? '0' + (today.getMonth() + 1) : today.getMonth() + 1;
        let year = today.getFullYear();
        let tempDate = day + '/' + month + '/' + year;

        this.setState({
            minutes: 25,
            timer: 25,
            curDate: tempDate
        })
    }

    handleTime(e) {
        this.clearAllIntervals();
        this.setState({
            minutes: parseInt(e.target.id),
            seconds: 0,
            timer: parseInt(e.target.id),
            isPaused: false
        })
    }

    setCountDown() {
        this.myInterval = setInterval(() => {
            if (!this.state.isPaused) {
                if (this.state.seconds === 0 && this.state.minutes !== 0) {
                    let tempMinutes = this.state.minutes - 1;
                    this.setState({
                        minutes: tempMinutes,
                        seconds: 59
                    })
                } else if (this.state.seconds !== 0 && this.state.minutes !== 0) {
                    let tempSeconds = this.state.seconds - 1;
                    this.setState({
                        seconds: tempSeconds
                    })
                } else if (this.state.seconds === 0 && this.state.minutes === 0) {
                    this.clearAllIntervals();
                    /* 
                        Send Current date WITH +1 tomato
                    */
                   if (this.state.timer === 25){
                       this.sendPost();
                   }
                    this.setState({
                        flag: true
                    })
                }
            }
        }, 1000)

    }

    pauseButton() {
        this.setState({
            isPaused: this.state.isPaused ? false : true
        })
        console.log(this.state.isPaused);
    }

    resetTimer() {
        let temp = this.state.timer
        this.clearAllIntervals()
        this.setState({
            minutes: temp,
            seconds: 0,
            flag: false,
            isPaused: false
        })
    }

    clearAllIntervals() {
        clearInterval(this.myInterval)
        this.myInterval = 0
    }

    async sendPost(){
        let tempSend = {
            curDate: this.state.curDate
        }
        try {
            let response = await fetch(`${URL_LINK}/api/posts/postOne`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'auth-token': auth.useToken().token
                },
                body: JSON.stringify(tempSend)
            })
          let data = await response.json();
          console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    testClick(){
        this.sendPost()
    }
    render() {
        return (
            <React.Fragment>
                <Container>
                    <Row className="clock-top-row">
                        <Col onClick={this.handleTime} id="25">
                            <h4 id="25">Pomodoro (25 min)</h4>
                        </Col>
                        <Col onClick={this.handleTime} id="5">
                            <h4 id="5">Short Break (5 min)</h4>
                        </Col>
                        <Col onClick={this.handleTime} id="10">
                            <h4 id="10">Long Break (10 min)</h4>
                        </Col>
                    </Row>
                    <Row className="clock-timer-row">
                        <h4>Hey {auth.getUser()}</h4>
                        <h1>{this.state.minutes}:{
                            this.state.seconds < 10 ? '0' + this.state.seconds : this.state.seconds
                        }</h1>
                    </Row>
                    <Row className="clock-button-row">
                        <Col>
                            <div className="center">
                                <Button variant="primary" size="lg" onClick={this.setCountDown}>Start</Button>
                            </div>
                        </Col>
                        <Col>
                            <div className="center">
                                <Button variant="primary" size="lg" onClick={this.pauseButton}>Pause/Resume</Button>
                            </div>
                        </Col>
                        <Col>
                            <div className="center">
                                <Button variant="primary" size="lg" onClick={this.resetTimer}>Reset</Button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </React.Fragment>
        )
    }
}

export default Clock;
