const VehicleRegistration = require('../DBModels/VehicleRegistration');

class VehicleRegistrationReadDto {
    VehicleNumberPlate;
    VehicleManufacturer;
    VehicleModelName;

    constructor (vehicleRegistration) {
        this.VehicleNumberPlate = vehicleRegistration.VehicleNumberPlate;
        this.VehicleManufacturer = vehicleRegistration.VehicleManufacturer;
        this.VehicleModelName = vehicleRegistration.VehicleModelName;
    }
}

module.exports = VehicleRegistrationReadDto;