const express = require('express');
const router = express.Router();
const Receiver = require('../Models/receiveModel');

// POST endpoint to handle receiver form submission
router.post('/receiver', async (req, res) => {
    try {
        const { name, phoneNumber, address, location } = req.body;

        // Validation (basic)
        if (!name || !phoneNumber || !address || !location) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Create a new Receiver document
        const newReceiver = new Receiver({
            name,
            phoneNumber,
            address,
            location
        });

        // Save the receiver details to the database
        await newReceiver.save();

        res.status(201).json({ message: 'Receiver details added successfully!' });
    } catch (error) {
        console.error('Error saving receiver details:', error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
});

module.exports = router;
