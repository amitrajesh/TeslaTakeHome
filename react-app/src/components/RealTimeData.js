import React from 'react';
import Box from '@mui/material/Box';
import { Button, Grid } from '@material-ui/core';
import TextField from '@mui/material/TextField';
import io from 'socket.io-client';
class RealTimeData extends React.Component {

    // The real-time data component for a MapObject; this uses socket.io to continously get random numbers from Flask/
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
        // this.state.socket.on("connect", () => {
        //     console.log(this.state.socket.connected); // x8WIv7-mJelg7on_ALbx
        //     this.intervalId = setInterval(() => {
        //         this.state.socket.on("data", (num) => {
        //             console.log(num);
        //             this.setState({realTimeData: num});
        //         });
        //     }, 500);
        // });
        this.socket = io();

        this.intervalId = setInterval(() => {
            this.socket.on("data", (num) => {
                console.log(num);
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
            <div className="test">
                <p1> {this.state.realTimeData} </p1>
            </div>
        );

    }

}

export default RealTimeData;