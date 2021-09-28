import React from 'react';
import io from 'socket.io-client';

class RealTimeData extends React.Component {

    // The real-time data component for a MapObject; this uses socket.io to continously get random numbers
    constructor(props) {
        super(props);
        this.state = {
            realTimeData: null,
        }
      }
    intervalId = null;
    socket = null;


    componentDidMount() {
        // When mounted, we connect to the backend with socket and set up a timer function to get data
        this.socket = io();

        this.intervalId = setInterval(() => {
            this.socket.on("data", (num) => {
                this.setState({realTimeData: num});
            });
        }, 500);
    }

    // End the data fetching when the component is shut down.
    componentWillUnmount() {
        this.socket.close();
        clearInterval(this.intervalId);
    }

    render() {
        return (
            <h3 style={{margin: 0}}> Real Time Data: {this.state.realTimeData} </h3>
        );

    }

}

export default RealTimeData;