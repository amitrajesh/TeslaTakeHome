import RoomIcon from '@mui/icons-material/Room';
import React from 'react';
import {Popover, Overlay} from 'react-bootstrap'
import Draggable from 'react-draggable';
import ConfigDropdown from './ConfigDropdown';

class MapObject extends React.Component {

    // The icon on the map which opens up a MapInterface when clicked.
    constructor(props) {
        super(props);
        this.state = {
          id: props.id,
          startX: props.locationX, // Starting, absolute positions given by App.js
          startY: props.locationY,
          color: props.nodeColor,
          positionX: 0, // Offset (relative) positions created when the user drags the icon
          positionY: 0,
          showDropdown: false
        };

        // Create boundries for how far the user can drag an icon
        this.minXOffset= props.minX - this.state.startX; 
        this.minYOffset = props.minY - this.state.startY;
        this.maxXOffset = props.maxX - this.state.startX;
        this.maxYOffset = props.maxY - this.state.startY;

        this.overlayRef = React.createRef(null);
  
      }


     

    render() {
        
        // Automatically called when the icon is currently being dragged.
        const handleDrag = (e, ui) => {
         
          // Ultimately, the location of the icon as it is being dragged is fully determined
          // by the state positionX and positionY coordinates. This handler updates how the user
          // most recently adjusted position in ui, allowing us to first check to see if the user
          // has taken the icon out of bounds, and then setting new position coordinates to
          // reflect its new position.

          var newX = Math.min(Math.max(ui.x, this.minXOffset), this.maxXOffset);
          var newY = Math.min(Math.max(ui.y, this.minYOffset), this.maxYOffset);
          
          this.setState({positionX: newX, positionY: newY});
    
        };
        
        const exitDrag = (e, data) => {

          // On exit, the user has dragged the icon to a new location (most probably). So we
          // make a call to backend and update the node's information with new X and Y coordinates.
          const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "id": this.state.id,
                // Have to add original coordinates (positionX and Y are relative)
                "location_x": Math.round(this.state.startX + this.state.positionX),
                "location_y": Math.round(this.state.startY + this.state.positionY),
            })
        };
        
        fetch('http://localhost:5000/change_config', requestOptions);

        };
        
        // Boolean determines if the Dropdown menu corresponding to the icon shuld be shown
        const changeDropdown= () => {
          this.setState({showDropdown: !this.state.showDropdown})
        }
    
        return [
        // The icon is covered by a Draggable with drag and stopping functions
        <Draggable onDrag={handleDrag} onStop={exitDrag}
          position={{x: this.state.positionX, y: this.state.positionY}}>
            <div className={"mapWrapper" + this.state.id} 
              style={{
                position: "absolute",
                left: this.state.startX,
                top: this.state.startY,
                zIndex: 100}}>

              <RoomIcon style={{fill: this.state.color}} ref={this.overlayRef} onDoubleClick={changeDropdown}/>

              {/* We wrap the actual ConfigDropdown on an overlay, only showing on double-click */}
              <Overlay rootClose={true} 
              onHide={() => this.setState({showDropdown: false})}
              target={this.overlayRef.current} show={this.state.showDropdown} 
              placement="right">
                  {({...props}) => (
                    <Popover id="button-tooltip" {...props}>
                    <div className="dropdown" style={{zIndex: 100}}>
                      <ConfigDropdown id={this.state.id} nodeColor={this.state.color}/>
                    </div> 
                    </Popover>
                      
                  )}
              </Overlay>
          </div>

        </Draggable>
        
        ]
    }
}

export default MapObject;