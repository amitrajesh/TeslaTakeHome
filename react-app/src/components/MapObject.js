import RoomIcon from '@mui/icons-material/Room';
import MapInterface from './MapInterface';
import React from 'react';
import {OverlayTrigger,Popover} from 'react-bootstrap'
class MapObject extends React.Component {

    // THe icon on the map which opens up a MapInterface when clicked.
    constructor(props) {
        super(props);
        this.state = {
          id: props.id,
        };
      }

    render() {

        var popover = (props) => (
              <Popover id="button-tooltip" {...props}>
                <MapInterface id={this.state.id}/>
              </Popover>
          );
        
        
        return [
        // OverlayTrigger from boostrap takes care of form placement
        <OverlayTrigger trigger="click" placement="right" overlay={popover}>
            <RoomIcon />
        </OverlayTrigger>
        ]
    }
}

export default MapObject;