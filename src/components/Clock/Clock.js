// All packages needed
import React from 'react';
import { Row, Col, Container, Button } from 'react-bootstrap';
import auth from '../../utils/auth';
import { URL_LINK } from '../../utils/global';
import mp3 from '../../assets/beep.wav'


// Styles imported here
import './Clock.scss'


class Clock extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            minutes: 0,
            seconds: 0,
            timer: 0,
            isPaused: false,
            curDate: '',
            disabled: true
        }

        this.handleTime = this.handleTime.bind(this);
        this.setCountDown = this.setCountDown.bind(this);
        this.pauseButton = this.pauseButton.bind(this);
        this.resetTimer = this.resetTimer.bind(this);
        this.clearAllIntervals = this.clearAllIntervals.bind(this);
        this.sendPost = this.sendPost.bind(this);
        this.testClick = this.testClick.bind(this);
        this.audio = new Audio(mp3);
        this.playBeep = this.playBeep.bind(this);
    }

    componentDidMount() {
        /** 
         * New Interval is set
         * Current date object is set
         * Timer is set to 25min
         * Minutes is set to 25 min
        */
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
        setTimeout(() => {
            this.setState({
                disabled: false
            })
        }, 4000)
    }



    handleTime(e) {

        /**
         * Whats the point of this function?
         * 
         * Allows the user to choose from the three options of timers
         * 
         * How it works?
         * 
         * First calls the function clearAllIntervals which sets myInterval to 0 and stops the timer
         * Sets the minute state according to the ID
         * Sets seconds to 0
         * timer is set to the same as minutes
         */

        this.clearAllIntervals();
        this.setState({
            minutes: parseInt(e.target.id),
            seconds: 0,
            timer: parseInt(e.target.id),
            isPaused: false
        })
    }

    setCountDown() {

        /**
         * Whats the point of this function?
         * 
         * When the user clicks start, it starts the timer
         * 
         * How it works?
         * 
         * Sets myInterval to setInterval calling the inner function every second
         * Checks to see if isPaused is false if not then it will just skip over the whole function
         * if so
         * checks to see if seconds === 0 and minutes !== 0... this means minutes left > 1minute
         *          change minutes to (minutes -1) and seconds to 59
         * 
         * checks to see if seconds !== 0 and minutes !== 0... this means seconds left > 0 and minutes left > 1minute
         *          changes seconds to (seconds - 1)
         * 
         * checks to see if seconds === 0 and minutes === 0... this means the timer has run out
         *          first call clearAllIntervals function
         *          check if timer === 25...this means the current timer was set for 25 minutes
         *                      call sendPost function
         *                      call checkStatus function
         *          call playBeep function
         *          set flag to true
         * 
         */


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
                } else if (this.state.seconds !== 0 && this.state.minutes === 0) {
                    let tempSeconds = this.state.seconds - 1;
                    this.setState({
                        seconds: tempSeconds
                    })
                } else if (this.state.seconds === 0 && this.state.minutes === 0) {
                    /* 
                        Send Current date WITH +1 tomato
                    */
                    if (this.state.timer === 25) {
                        this.sendPost();

                    }
                    this.playBeep();
                    this.resetTimer();
                }
            }
        }, 1000)

    }

    playBeep() {
        /**
         * Plays beeping sound once timer is over
         */
        this.audio.play()
    }

    pauseButton() {
        /**
         * Whats the point of this function?
         * 
         * Allows user to pause/un pause the timer
         * 
         * How it works?
         * checks to see whether isPaused is true or false and sets the opposite
         * 
         */
        this.setState({
            isPaused: this.state.isPaused ? false : true
        })
    }

    resetTimer() {
        /**
         * Whats the point of this function?
         * 
         * Allows the user to reset the timer to its original time
         * 
         * How it works?
         * calls the clearAllInterval function
         * sets the minutes to what the timer is seconds to 0 flag to false and isPaused to false
         */
        let temp = this.state.timer
        this.clearAllIntervals()
        this.setState({
            minutes: temp,
            seconds: 0,
            isPaused: false
        })
    }

    clearAllIntervals() {
        /**
         * This clears myInterval preventing multiple instances of it to be going on in the back ground
         */
        clearInterval(this.myInterval)
        this.myInterval = 0
    }

    async sendPost() {

        /**
         * Whats the point of this function?
         * 
         * Once the timer runs out sends a notification to the server telling it to add 1 to the tomato for the current user/day
         * 
         * How it works?
         * 
         * first places the curDate into an object
         * send that object to the server /posts/postOne 
         *          header includes auth-token which is required
         * calls checkStatus function which notifies the progressTable component to run another api call
         */


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
            this.props.checkStatus();
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    testClick() {
        // this.sendPost()
        this.props.checkStatus();
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
                                {this.state.disabled ?
                                    <Button variant="primary" size="lg" onClick={this.setCountDown} disabled>Start</Button>
                                    : <Button variant="primary" size="lg" onClick={this.setCountDown}>Start</Button>
                                }

                            </div>
                        </Col>
                        <Col>
                            <div className="center">
                                {this.state.disabled ? 
                                <Button variant="primary" size="lg" onClick={this.pauseButton} disabled>Pause/Resume</Button>
                                :<Button variant="primary" size="lg" onClick={this.pauseButton}>Pause/Resume</Button>
                                }
                            </div>
                        </Col>
                        <Col>
                            <div className="center">
                                {this.state.disabled ? 
                                <Button variant="primary" size="lg" onClick={this.resetTimer} disabled>Reset</Button>
                                :<Button variant="primary" size="lg" onClick={this.resetTimer}>Reset</Button>
                                
                                }
                            </div>
                        </Col>
                    </Row>
                </Container>
            </React.Fragment>
        )
    }
}

export default Clock;
