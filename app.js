// Setting up the ExpressJS app
const express = require('express');
const res = require('express/lib/response');
const app = express();
const port = 3001;
app.listen(port, () => {
    console.log(`--> VRA app listening on port ${port}...`);
});
app.use(express.json());

// Setting up CORS
const cors = require('cors');
app.use(cors());

// Setting up Mongoose with MongoDB
const mongoose = require('mongoose');
mongoose.connect('', { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', (error) => console.error('--> An ERROR occured: ' + error));
db.once('open', () => console.log('--> Connected to database...'));

const { v1: GenerateUUID } = require('uuid');

const VehicleRegistration = require('./DBModels/VehicleRegistration');
const VehicleRegistrationReadDto = require('./Dtos/VehicleRegistrationReadDto');

app.get('/', async (req, res) => {
    const reqOps = {
        "/GetVehicleRegistrations": "Get all registered vehicles.",
        "/GetVehicleType/{NumberPlate}": "Get the type of a specific vehicle.",
        "/PostVehicleRegistration": "Register a new vehicle to the system.",
    };
    res.status(200).send(reqOps);
});

app.get('/GetVehicleRegistrations', async (req, res) => {
    try {
        const vehicleRegistrationsList = await VehicleRegistration.find();

        var vehicleRegistrationReadDtosList = [];
        for (var i = 0; i < vehicleRegistrationsList.length; i++) {
            vehicleRegistrationReadDtosList.push(new VehicleRegistrationReadDto(vehicleRegistrationsList[i]));
        }

        res.send(vehicleRegistrationReadDtosList);
    } catch (ex) {
        res.status(500).json({ message: ex.message });
    }
});

app.post('/PostVehicleRegistration', async (req, res) => {

    const newVehicleRegistration = new VehicleRegistration({
        _id: GenerateUUID(),
        VehicleNumberPlate: req.body.VehicleNumberPlate,
        VehicleManufacturer: req.body.VehicleManufacturer,
        VehicleModelName: req.body.VehicleModelName
    });

    try {
        newVehicleRegistration.save();
        res.json(req.body);
    } catch (ex) {
        res.status(500).json({ message: ex.message });
    }
});

app.get('/GetVehicleType/:regnum', async (req, res) => {
    const num = req.params.regnum;
    const dNum = num.replace("-", " ");
    const letters = /^[a-zA-Z]/;
    const anyNum = /(\d+)/;
    const specialCh = /[!@#$%^&ශ්‍රී]+/;
    const fdigit = '/[0-9]+\d{3}$/';

    if (dNum.match(anyNum) && endsWithNumber(dNum)) {
        if (specialCh.test(dNum)) {
            res.send(JSON.parse('{"VehicleType": "VINTAGE"}'));
        } else {
            if (dNum.match(letters)) {
                res.send(JSON.parse('{"VehicleType": "MODERN"}'));
            }
            else {
                res.send(JSON.parse('{"VehicleType": "OLD"}'));
            }
        }
    } else {
        res.send(JSON.parse('{"VehicleType": "INVALID"}'));
    }

    function endsWithNumber(str) {
        return /[0-9]+\d{3}$/.test(str);
    }

});