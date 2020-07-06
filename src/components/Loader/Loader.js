// package imports
import React from 'react'

// Style imports
import ProgressBar from 'react-bootstrap/ProgressBar'
import './Loader.scss'


class Loader extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            time: 0
        }
    }

    componentDidMount() {
        let myTime = setInterval(() => {
            if (this.state.time === 100) {
                clearInterval(myTime);
                this.props.triggerParentUpdate();
            } else {
                this.setState({
                    time: this.state.time + 25
                });
            }
        }, 1000)
    }

    render() {
        return (
            <div className="loader-pomo">
                <h1>Loading your progress....</h1>
                <div>
                <ProgressBar now={this.state.time} />
                </div>
            </div>

        )
    }
}

export default Loader;