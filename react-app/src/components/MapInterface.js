import React from 'react';
import Box from '@mui/material/Box';
import { Button, Grid } from '@material-ui/core';
import TextField from '@mui/material/TextField';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import ConfigDropdown from './ConfigDropdown';
import RealTimeData from './RealTimeData';


class MapInterface extends React.Component {

    // The interface that shows when a MapObjet is clicked. It is composed of two parts:
    // THe customizable ConfigDropdown form, and the RealTimeData streaming component.
    constructor(props) {
        super(props);
        this.state = {
            id: props.id
        };
      }



    render() {
        return (
            <div className="tabs" style={{zIndex: 100}}>
                <ConfigDropdown id={this.state.id} />
                <RealTimeData />
            </div>
            
        );

    }

}

export default MapInterface;