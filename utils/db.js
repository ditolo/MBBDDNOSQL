const mongoose = require('mongoose');

const urlDb = 'mongodb://100.67.210.79:8034/proyecto-basico-express-movies'

const connect = async () => {
    try {
        await mongoose.connect(urlDb, { });
        console.log(`Conected with db succesfully`);
    }catch(error) {
        console.log('Error to connect with db')
    };
}

module.exports = {
    connect
};