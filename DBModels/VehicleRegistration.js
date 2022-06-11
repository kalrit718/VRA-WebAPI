const mongoose = require('mongoose');

const vehicleRegistrationSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    VehicleNumberPlate: {
        type: String,
        required: true
    },
    VehicleManufacturer: {
        type: String,
        required: true
    },
    VehicleModelName: {
        type: String,
        required: true
    }
});

const vehicleRegistrationCollectionName = 'vehicle-registrations';

module.exports = mongoose.model(vehicleRegistrationCollectionName, vehicleRegistrationSchema);