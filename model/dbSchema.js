const mongoose = require('mongoose');

mongoose
    .connect('mongodb://localhost:27017/packboxdb', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connection to DB Successful'));
let models={};

//User Schema 

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Required Field'],
        unique: true
    },
    emailid: {
        type: String,
        required: [true, 'Required Field']
    },
    password: {
        type: String,
        required: [true, 'Required Field']
    },
    phoneno: {
        type: Number,
        required: [true, 'Required Field']
    },
    bookings: {
        shiftingTo: {
            type: String
        },
        shiftingFrom: {
            type: String
        },
        shiftingType: {
            type: String
        }
    }
});

//creating User Model

models.userModel = new mongoose.model("userdetails",userSchema);

//Package Schema
let packageSchema = new mongoose.Schema({
    shiftType: {
        type: String
    },
    description: {
        type: String
    }
});

models.packageModel=new mongoose.model("packagedetails",packageSchema);

models.packageDetails=[
    {
        shiftType: "Home",
        description: " Depending upon BHK price varies=> 1BHK : 3000 - 6000, 2BHK : 5000 - 9000, 3BHK : 6000 - 10000,4BHK :  10000 - 15000"
    },
    {
        shiftType: "Vehicle",
        description: " Car/Bike, Price within 10 km => Bike:4500, car:6500"
    }
];


module.exports=models;