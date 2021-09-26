import React from 'react';
import Box from '@mui/material/Box';
import { Button, Grid } from '@material-ui/core';
import TextField from '@mui/material/TextField';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';


class ConfigDropdown extends React.Component {

    // The "form" that shows when clicking a MapObject
    constructor(props) {
        super(props);
        this.state = {
            id: props.id, // This id is the core identifier, associating the form with the
            // MapObject it comes from; different from the ID the user can change
            formId: "",
            formTitle: "",
            formLocation: ""
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

        fetch('/get_config', requestOptions)
                .then(response => response.json())
                .then(data => this.setState({
                    formId: data.form_id,
                    formTitle: data.form_title,
                    formLocation: data.form_location
                }));
    }


    render() {

        const submitForm = (event) => {
            event.preventDefault()
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "id": this.state.id,
                    "form_id": event.target.formId.value,
                    "form_title": event.target.formTitle.value,
                    "form_location": event.target.formLocation.value
                })
            };
            
            fetch('/change_config', requestOptions);

          };
        
        // Probably excess rendering happening here; but for now this is required for any
        // user changes to 
        const handleInputChange = (e) => {
            const { name, value } = e.target;
            this.setState({
              ...this.state,
              [name]: value,
            });
          };

        // The actual form that will show to the user
        return (
            
            <form onSubmit={submitForm}>
                <Grid container alignItems="center" justify="center" direction="column" 
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
                        <TextField
                            id="node-location-input"
                            name="formLocation"
                            label="location"
                            type="text"
                            value={this.state.formLocation}
                            onChange={handleInputChange}
                        />
                    </Grid>

                    <Button variant="contained" color="primary" onClick={()=> {document.body.click();}} type="submit">
                    Change Info
                    </Button>
                </Grid>
            </form>
            
            


        );

    }

}

export default ConfigDropdown;