const mongoose = require('mongoose');

const connectMongoDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/techtips');
        console.log('Conectado a MongoDB');
    } catch (error) {
        console.error('Error conectando a MongoDB: ', error);
        process.exit(1);
    }
};

module.exports = connectMongoDB;