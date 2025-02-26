const express = require('express');
const router = express.Router();
const donateModel = require('../Models/donateModel');

// Route to create a new donation
router.post('/donate', async (req, res) => {
    try {
        const { donorName, phoneNumber, address, items } = req.body;
        const newDonation = new donateModel({ donorName, phoneNumber, address, items });
        await newDonation.save();
        res.status(201).json({ message: 'Donation successfully recorded!' });
    } catch (error) {
        res.status(500).json({ message: 'Error saving donation', error });
    }
});

// Route to fetch all donations
router.get('/all', async (req, res) => {
    try {
        const donations = await donateModel.find();
        res.json(donations);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching donations', error });
    }
});

module.exports = router;
