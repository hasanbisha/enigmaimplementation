import React from "react";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { Grid, Container, TextField, FormControl, InputLabel, makeStyles } from '@material-ui/core';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const App = () => {
	const classes = useStyles();

	// Rotor Types
	const [rotor_1, set_rotor_1] = React.useState();
	const [rotor_2, set_rotor_2] = React.useState();
	const [rotor_3, set_rotor_3] = React.useState();
	// Rotor Positions
	const [rotor_position_1, set_rotor_position_1] = React.useState();
	const [rotor_position_2, set_rotor_position_2] = React.useState();
	const [rotor_position_3, set_rotor_position_3] = React.useState();

	// Message
	const [message, setMessage] = React.useState();

	// Rotor options array
	const rotor_options = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];
	const rotor_1_options = rotor_options.filter(rotor => rotor !== rotor_2 && rotor !== rotor_3);
	const rotor_2_options = rotor_options.filter(rotor => rotor !== rotor_1 && rotor !== rotor_3);  
	const rotor_3_options = rotor_options.filter(rotor => rotor !== rotor_1 && rotor !== rotor_2);

	// Rotor positions array
	const rotor_positions = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Z', 'X', 'C', 'V', 'B', 'N', 'M'];

	const [encryption_error, set_encryption_error] = React.useState(); 
	const [encrypted_message, set_encrypted_message] = React.useState();

	const encryptMessage = () => {
		axios.post('http://localhost:5000/enigma/encrypt',
			{
				rotors: [
				    { type: rotor_1, ring: 0, position: rotor_position_1 }, // Right
				    { type: rotor_2, ring: 0, position: rotor_position_2 }, // Middle
				    { type: rotor_3, ring: 0, position: rotor_position_3 } // Left
				  ],
				  // plugboard: ["AB", "CD", "EF", "GH"],
				  plugboard: [],
				  reflector: "B"
			}).then(res => {
				if(res.data.error) {
					set_encryption_error(res.data.error);
				} else {
					set_encrypted_message(res.data.message);
				}
			});
	}

	return (
	    <Container style={{ fontFamily: 'arial', textAlign: 'center' }}>
	      <h1>Web Ready</h1>
	      <Grid container justify='center' spacing={10}>
	      	<Grid container direction='column' item xs={4}>
		        <h2>Rotor 1</h2>
				<FormControl variant="outlined" className={classes.formControl}>
			        <InputLabel>
			          Rotor Type
			        </InputLabel>
			     	<Select
			        	value={rotor_1}
			        	onChange={e => set_rotor_1(e.target.value)}
			        	labelWidth={80}
			        >
			        	{rotor_1_options.map(rotor_option => (
			        		<MenuItem value={rotor_option}>{rotor_option}</MenuItem>
		        		))}
			        </Select>
				</FormControl>
				<FormControl variant="outlined" className={classes.formControl}>
			        <InputLabel>
			          Position
			        </InputLabel>
					<Select
					  value={rotor_position_1}
					  onChange={e => set_rotor_position_1(e.target.value)}
					  labelWidth={60}
					  inputProps={{
					    name: 'age',
					    id: 'age-simple',
					  }}
					>
						{rotor_positions.map(position => (
							<MenuItem value={position}>{position}</MenuItem>
						))}
					</Select>
				</FormControl>
	        </Grid>
	      	<Grid container item direction='column' xs={4}>
				<h2>Rotor 2</h2>
				<FormControl variant="outlined" className={classes.formControl}>
			        <InputLabel>
			          Rotor Type
			        </InputLabel>
					<Select
					  value={rotor_2}
					  onChange={e => set_rotor_2(e.target.value)}
					  labelWidth={80}
					  inputProps={{
					    name: 'age',
					    id: 'age-simple',
					  }}
					>
						{rotor_2_options.map(rotor_option => (
							<MenuItem value={rotor_option}>{rotor_option}</MenuItem>
						))}
					</Select>
				</FormControl>
				<FormControl variant="outlined" className={classes.formControl}>
			        <InputLabel>
			          Position
			        </InputLabel>
					<Select
					  value={rotor_position_2}
					  onChange={e => set_rotor_position_2(e.target.value)}
					  labelWidth={60}
					  inputProps={{
					    name: 'age',
					    id: 'age-simple',
					  }}
					>
						{rotor_positions.map(position => (
							<MenuItem value={position}>{position}</MenuItem>
						))}
					</Select>
				</FormControl>
	        </Grid>
	      	<Grid container direction='column' item xs={4}>
				<h2>Rotor 3</h2>
				<FormControl variant="outlined" className={classes.formControl}>
			        <InputLabel>
			          Rotor Type
			        </InputLabel>
					<Select
					  value={rotor_3}
					  onChange={e => set_rotor_3(e.target.value)}
					  labelWidth={80}
					  inputProps={{
					    name: 'age',
					    id: 'age-simple',
					  }}
					>
						{rotor_3_options.map(rotor_option => (
							<MenuItem value={rotor_option}>{rotor_option}</MenuItem>
						))}
					</Select>
				</FormControl>
				<FormControl variant="outlined" className={classes.formControl}>
			        <InputLabel>
			          Position
			        </InputLabel>
					<Select
					  value={rotor_position_3}
					  onChange={e => set_rotor_position_3(e.target.value)}
					  labelWidth={60}
					  inputProps={{
					    name: 'age',
					    id: 'age-simple',
					  }}
					>
						{rotor_positions.map(position => (
							<MenuItem value={position}>{position}</MenuItem>
						))}
					</Select>
				</FormControl>
	        </Grid>
        	<TextField
		        label="Message"
		        style={{width: 1200}}
		        multiline
		        rowsMax="4"
		        value={message}
		        onChange={e => setMessage(e.target.value)}
		        margin="normal"
		        variant="outlined"
			/>
			<Button variant="outlined" color="primary" style={{width: 1200}} onClick={encryptMessage}>
	        	Click to encrypt message
		    </Button>
	      </Grid>
	    </Container>
	);
}

export default App;

// // Enigma settings
// var default_settings = {
//   rotors: [
//     { type: "III", ring: 0, position: "A" }, // Right
//     { type: "II", ring: 0, position: "A" }, // Middle
//     { type: "I", ring: 0, position: "A" } // Left
//   ],
//   plugboard: ["AB", "CD", "EF", "GH"],
//   reflector: "B"
// };