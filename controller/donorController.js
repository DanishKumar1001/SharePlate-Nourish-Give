const Donation = require('../models/donation');
const User = require('../models/user');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const donorController = {
  getDashboard: async (req, res) => {
    try {
      const donorId = req.user._id;
      const numPendingDonations = await Donation.countDocuments({ donor: donorId, status: 'pending' });
      const numAcceptedDonations = await Donation.countDocuments({ donor: donorId, status: 'accepted' });
      const numAssignedDonations = await Donation.countDocuments({ donor: donorId, status: 'assigned' });
      const numCollectedDonations = await Donation.countDocuments({ donor: donorId, status: 'collected' });

      res.render('donor/dashboard', {
        title: 'Dashboard',
        numPendingDonations,
        numAcceptedDonations,
        numAssignedDonations,
        numCollectedDonations,
      });
    } catch (err) {
      console.error(err);
      req.flash('error', 'Some error occurred on the server.');
      res.redirect('back');
    }
  },

  getDonateForm: (req, res) => {
    res.render('donor/donate', { title: 'Donate' });
  },

  postDonateForm: async (req, res) => {
    try {
      const donation = req.body.donation;
      donation.status = 'pending';
      donation.donor = req.user._id;
      const newDonation = new Donation(donation);
      await newDonation.save();
      req.flash('success', 'Donation request sent successfully');
      res.redirect('/donor/donations/pending');
    } catch (err) {
      console.error(err);
      req.flash('error', 'Some error occurred on the server.');
      res.redirect('back');
    }
  },

  getPendingDonations: async (req, res) => {
    try {
      const pendingDonations = await Donation.find({
        donor: req.user._id,
        status: { $in: ['pending', 'rejected', 'accepted', 'assigned'] },
      }).populate('agent');
      res.render('donor/pendingDonations', { title: 'Pending Donations', pendingDonations });
    } catch (err) {
      console.error(err);
      req.flash('error', 'Some error occurred on the server.');
      res.redirect('back');
    }
  },

  getPreviousDonations: async (req, res) => {
    try {
      const previousDonations = await Donation.find({
        donor: req.user._id,
        status: 'collected',
      }).populate('agent');
      res.render('donor/previousDonations', { title: 'Previous Donations', previousDonations });
    } catch (err) {
      console.error(err);
      req.flash('error', 'Some error occurred on the server.');
      res.redirect('back');
    }
  },

  deleteRejectedDonation: async (req, res) => {
    try {
      const donationId = req.params.donationId;
      await Donation.findByIdAndDelete(donationId);
      res.redirect('/donor/donations/pending');
    } catch (err) {
      console.error(err);
      req.flash('error', 'Some error occurred on the server.');
      res.redirect('back');
    }
  },

  getProfile: (req, res) => {
    res.render('donor/profile', { title: 'My Profile' });
  },

  updateProfile: async (req, res) => {
    try {
      const id = req.user._id;
      const updateObj = req.body.donor; // updateObj: { firstName, lastName, gender, address, phone }
      await User.findByIdAndUpdate(id, updateObj);

      req.flash('success', 'Profile updated successfully');
      res.redirect('/donor/profile');
    } catch (err) {
      console.error(err);
      req.flash('error', 'Some error occurred on the server.');
      res.redirect('back');
    }
  },

  getPaymentForm: (req, res) => {
    res.render('donor/paymentForm', { title: 'Payment Form' });
  },

  postPayment: async (req, res) => {
    try {
      const { amount, donationId } = req.body;

      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount * 100,
        currency: 'usd',
        metadata: {
          donationId: donationId,
          donorId: req.user._id
        }
      });

      res.render('donor/paymentConfirmation', {
        title: 'Payment Confirmation',
        publicKey: process.env.STRIPE_PUBLIC_KEY,
        clientSecret: paymentIntent.client_secret,
        amount: amount,
        donationId: donationId
      });
    } catch (err) {
      console.error(err);
      req.flash('error', 'Payment failed. Please try again.');
      res.redirect('/donor/donate');
    }
  }
};

module.exports = donorController;
