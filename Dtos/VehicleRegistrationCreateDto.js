const { v1: GenerateUUID } = require('uuid');

class VehicleRegistrationCreateDto {
    _id;
    VehicleNumberPlate;
    VehicleManufacturer;
    VehicleModelName;

    constructor() {
        this._id = GenerateUUID();
    }
}

module.exports = VehicleRegistrationCreateDto;