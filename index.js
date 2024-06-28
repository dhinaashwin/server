const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware to parse JSON bodies and handle CORS
app.use(bodyParser.json());
app.use(cors());

const corsOptions = {
    origin: 'http://localhost:5173', // Allow only requests from this origin
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
};

app.use(cors(corsOptions));

// Replace with your MongoDB connection string
const mongoURI = 'mongodb+srv://dhinaashwin11:Mongodbpassword@demo-cluster.uvfzqd3.mongodb.net/?appName=demo-cluster';

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

// Define a schema and model
const dressSchema = new mongoose.Schema({
    name: String,
    size: String,
    color: String,
    price: Number,
});

const Dress = mongoose.model('Dress', dressSchema);
app.get('/', (req,res) =>{
    res.send("Connected")
})

// Create a new dress (example)
app.post('/create-dress', async (req, res) => {
    const { name, size, color, price } = req.body;

    const newDress = new Dress({
        name,
        size,
        color,
        price,
    });

    try {
        const savedDress = await newDress.save();
        res.status(201).send(savedDress);
    } catch (error) {
        console.error(error); // Log the error
        res.status(400).send({ message: 'Error creating dress', error });
    }
});
const PORT = 'https://server-sigma-pearl.vercel.app/' || 3002;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
