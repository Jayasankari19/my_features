const DataTypes = require('sequelize');
const sequelize = require('../database/db');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            isEmail: true,
        },
    },
}, {
    timestamps: true,
});

const Vehicle = sequelize.define('Vehicle', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        },
    },
    registrationNumber: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    type: {
        type: DataTypes.ENUM('car', 'bike'),
        allowNull: false,
    },
    licenseNumber: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: true,
});

Vehicle.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });

const Ride = sequelize.define('Ride', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    rideGiverId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        },
    },
    rideTakerId: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
            model: User,
            key: 'id',
        },
    },
    vehicleId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Vehicle,
            key: 'id',
        },
    },
    pickupLocation: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    dropLocation: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('pending', 'ongoing', 'completed', 'cancelled'),
        defaultValue: 'pending',
    },
}, {
    timestamps: true,
});

Ride.belongsTo(User, { as: 'RideGiver', foreignKey: 'rideGiverId' });
Ride.belongsTo(User, { as: 'RideTaker', foreignKey: 'rideTakerId' });
Ride.belongsTo(Vehicle, { foreignKey: 'vehicleId' });

const Rating = sequelize.define('Rating', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    rideId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Ride,
            key: 'id',
        },
    },
    givenBy: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        },
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 5,
        },
    },
    feedback: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
}, {
    timestamps: true,
});

Rating.belongsTo(Ride, { foreignKey: 'rideId' });
Rating.belongsTo(User, { foreignKey: 'givenBy' });

const Auth = sequelize.define('Auth', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        },
    },
    passwordHash: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: true,
});

Auth.belongsTo(User, { foreignKey: 'userId' });
User.hasOne(Auth, { foreignKey: 'userId' });

module.exports = {User, Vehicle, Ride, Rating, Auth};
