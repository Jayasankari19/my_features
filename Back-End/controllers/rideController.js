const { Ride } = require('../models/tableSchema');

exports.createRide = async (req, res) => {
    try {
        const { vehicleId, pickupLocation, dropLocation } = req.body;
        const ride = await Ride.create({
            rideGiverId: req.user.userId,
            vehicleId,
            pickupLocation,
            dropLocation,
        });

        res.status(201).json(ride);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create ride' });
    }
};

exports.bookRide = async (req, res) => {
    try {
        const ride = await Ride.findByPk(req.params.id);
        if (!ride) return res.status(404).json({ message: 'Ride not found' });

        ride.rideTakerId = req.user.userId;
        ride.status = 'ongoing';
        await ride.save();

        res.json({ message: 'Ride booked successfully!' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to book ride' });
    }
};

exports.completeRide = async (req, res) => {
    try {
        const ride = await Ride.findByPk(req.params.id);
        if (!ride) return res.status(404).json({ message: 'Ride not found' });

        ride.status = 'completed';
        await ride.save();

        res.json({ message: 'Ride completed successfully!' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to complete ride' });
    }
};
