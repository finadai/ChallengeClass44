const User = require('../models/user');

exports.findByEmail = async (email) => {
    try {
        const user = await User.findOne({ email });
        return user;
    } catch (error) {
        console.error('Error al buscar usuario por correo electrónico:', error);
        throw error;
    }
};

exports.createUser = async (userData) => {
    try {
        const newUser = new User(userData);
        const savedUser = await newUser.save();
        return savedUser;
    } catch (error) {
        console.error('Error al crear un nuevo usuario:', error);
        throw error;
    }
};
