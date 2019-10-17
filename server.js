const express = require("express");
const bodyParser = require('body-parser')
const enigma = require("./enigma-js/index.js");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.post("/enigma/encrypt", (req, res) => {
	const enigma_settings = req.body;
	enigma_settings.spacing = 0;
	enigma.load(JSON.parse(JSON.stringify(enigma_settings)));		

	try {
		const message = req.body.message;
		const encrypted_message = enigma.process(message);
		res.send({message: encrypted_message});
	} catch(e) {
		res.send({error: 'Something went wrong during the encryption. Pleace check your settings.'})
	}
});

app.post("/enigma/decrypt", (req, res) => {
	const enigma_settings = req.body.settings;
	default_settings.spacing = 0;
	enigma.load(JSON.parse(JSON.stringify(enigma_settings)));

	const encrypted_message = req.body.encrypted_message;
	const decrypted_message = enigma.load(encrypted_message);

	res.send({message: decrypted_message})
})

app.listen(5000, () => console.log("App started on port 5000"));

// // Enigma settings
// var default_settings = {
//   rotors: [
//     { type: "III", ring: 0, position: "A" }, // Right
//     { type: "II", ring: 0, position: "A" }, // Middle
//     { type: "I", ring: 0, position: "A" } // Left
//   ],
//   plugboard: ["AB", "CD", "EF", "GH"],
//   reflector: "B",
//   spacing: 4
// };

// default_settings.spacing = 0;
// // Loading the enigma settings
// enigma.load(JSON.parse(JSON.stringify(default_settings)));
// // Sending the message for encryption or decryption
// encrypted_message = enigma.process(input_string);

// console.log(encrypted_message + " (" + input_string + ")");

// // Decrypt
// default_settings.spacing = 0;

// enigma.load(JSON.parse(JSON.stringify(default_settings)));
// // Sending the message for encryption or decryption
// decrypted_message = enigma.process(encrypted_message.replace(/ /g, ""));


// rotor limits //
// Ring
// 0: 29
// 1: 0
// 2: 20
