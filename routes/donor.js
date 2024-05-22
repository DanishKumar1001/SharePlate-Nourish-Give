const express = require('express');
const router = express.Router();
const middleware = require('../middleware/index.js');
const donorController = require('../controller/donorController');

// Route for displaying donor dashboard
router.get('/donor/dashboard', middleware.ensureDonorLoggedIn, donorController.getDashboard);

// Route for displaying donation form
router.get('/donor/donate', middleware.ensureDonorLoggedIn, donorController.getDonateForm);

// Route for submitting donation form
router.post('/donor/donate', middleware.ensureDonorLoggedIn, donorController.postDonateForm);

// Route for displaying donation payment form
router.get('/donor/donate/payment', middleware.ensureDonorLoggedIn, donorController.getPaymentForm);

// Route for handling donation payment
router.post('/donor/donate/payment', middleware.ensureDonorLoggedIn, donorController.postPayment);

// Route for displaying pending donations
router.get('/donor/donations/pending', middleware.ensureDonorLoggedIn, donorController.getPendingDonations);

// Route for displaying previous donations
router.get('/donor/donations/previous', middleware.ensureDonorLoggedIn, donorController.getPreviousDonations);

// Route for deleting rejected donation
router.get('/donor/donation/deleteRejected/:donationId', donorController.deleteRejectedDonation);

// Route for displaying donor profile
router.get('/donor/profile', middleware.ensureDonorLoggedIn, donorController.getProfile);

// Route for updating donor profile
router.put('/donor/profile', middleware.ensureDonorLoggedIn, donorController.updateProfile);

module.exports = router;
