import React from 'react';
import { Button, Grid } from '@material-ui/core';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import RealTimeData from './RealTimeData';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import { Collapse } from '@mui/material';
import { CardActions } from '@mui/material';
import IconButton from '@mui/material/IconButton';




class ConfigDropdown extends React.Component {

    // The DropDown menu that shows up when a user double-clicks a MapObject
    constructor(props) {
        super(props);
        this.state = {
            id: props.id, // This id is the core identifier, associating the form with the
            // MapObject it comes from; different from the ID the user can change
            formId: "",
            color: props.nodeColor,
            formTitle: "",
            locationX: 0,
            locationY: 0,
            expandForm: false
        };
      }
      

    componentDidMount() {
        // When this component is first rendered, it needs to call a POST request
        // to get the current configuration for the MapObject that called it 
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({"id": this.state.id})
        };

        fetch('http://localhost:5000/get_config', requestOptions)
                .then(response => response.json())
                .then(data => this.setState({
                    formId: data.form_id,
                    formTitle: data.form_title,
                    locationX: data.location_x,
                    locationY: data.location_y
                }));
    }


    render() {

        // On form submission, we need to make a call to backend to update information
        const submitForm = (event) => {
            event.preventDefault()
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "id": this.state.id,
                    "form_id": event.target.formId.value,
                    "form_title": event.target.formTitle.value,
                })
            };
            
            fetch('http://localhost:5000/change_config', requestOptions);

          };
        
        // Handler to update state as user is changing text
        const handleInputChange = (e) => {
            const { name, value } = e.target;
            this.setState({
              ...this.state,
              [name]: value,
            });
          };

        // The "show more" icon, style, which  the real-time data
        // (the icon rotates 180 degrees every time it is clicked)
        const ExpandMore = styled((props) => {
            const { expand, ...other } = props;
            return <IconButton {...other} />;
          })(({ theme, expand }) => ({
            transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
            marginLeft: 'auto',
            transition: theme.transitions.create('transform', {
              duration: theme.transitions.duration.shortest,
            }),
          }));
        
        // Boolean determining if the real-time data should be shown
        const handleExpandClick = () => {
            this.setState({expandForm: !this.state.expandForm});
        }

        // The actual form that will show to the user
        return (
                <Card sx={{maxWidth: 275}} spacing={4}>
                    <CardHeader
                        title="Object Configuration"
                        style={{ textAlign: 'center' }} />
                    <form onSubmit={submitForm}>
                        <Grid container alignItems="center" justify="center" direction="column" spacing={2}
                        style = {{zIndex: 100}}>
                            <Grid item>
                                <TextField
                                    id="nodeid-input"
                                    name="formId"
                                    label="ID"
                                    type="text"
                                    value={this.state.formId}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    id="node-title-input"
                                    name="formTitle"
                                    label="title"
                                    type="text"
                                    value={this.state.formTitle}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid item>
                                <Grid container justify="center" direction="row">
                                    <Grid item xs={4}>
                                        <TextField
                                            disabled={true}
                                            id="node-location-inputx"
                                            name="formLocationX"
                                            label="X Location"
                                            type="number"
                                            value={this.state.locationX}
                                            onChange={handleInputChange}
                                        />
                                        
                                    </Grid>
                                    <Grid item xs={4}>
                                    <TextField
                                                disabled={true}
                                                id="node-location-inputy"
                                                name="formLocationY"
                                                label="Y Location"
                                                type="number"
                                                value={this.state.locationY}
                                                onChange={handleInputChange}
                                            />
                                        
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Button variant="contained" color="primary" 
                                onClick={()=> {document.body.click();}} type="submit">
                                    Change Info
                                </Button>
                            </Grid>
                        </Grid>
                      
                    </form>
                    
                    <CardActions> {/*We wrap the "show more" icon in ExpandMore*/}
                        <ExpandMore
                            expand={this.state.expandForm}
                            onClick={handleExpandClick}
                            aria-expanded={this.state.expandForm}
                            aria-label="show more"
                            >
                            <ExpandMoreIcon  style={{display: "flex", flexDirection: "column"}} />
                       </ExpandMore>
                    </CardActions>
                    {/*And place the RealTimeData here*/}
                    <Collapse in={this.state.expandForm} timeout="auto" unmountOnExit>
                        <RealTimeData />
                    </Collapse>
                </Card>
               


        );

    }

}

export default ConfigDropdown;