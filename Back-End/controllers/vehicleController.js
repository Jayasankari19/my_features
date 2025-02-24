const { Vehicle } = require('../models/tableSchema');

exports.createVehicle = async (req, res) => {
    try {
        const { registrationNumber, type, licenseNumber } = req.body;
        const vehicle = await Vehicle.create({
            userId: req.user.userId,
            registrationNumber,
            type,
            licenseNumber,
        });
        res.status(201).json(vehicle);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create vehicle' });
    }
};

exports.getUserVehicles = async (req, res) => {
    try {
        const vehicles = await Vehicle.findAll({ where: { userId: req.user.userId } });
        res.json(vehicles);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch vehicles' });
    }
};

exports.deleteVehicle = async (req, res) => {
    try {
        const vehicle = await Vehicle.findByPk(req.params.id);
        if (!vehicle) return res.status(404).json({ message: 'Vehicle not found' });

        if (vehicle.userId !== req.user.userId) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        await vehicle.destroy();
        res.json({ message: 'Vehicle deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete vehicle' });
    }
};
