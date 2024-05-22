const express = require("express");
const app = express();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY); // Add Stripe
const passport = require("passport");
const flash = require("connect-flash");
const session = require("express-session");
const expressLayouts = require("express-ejs-layouts");
const methodOverride = require("method-override");
const homeRoutes = require("./routes/home.js");
const authRoutes = require("./routes/auth.js");
const adminRoutes = require("./routes/admin.js");
const donorRoutes = require("./routes/donor.js");
const agentRoutes = require("./routes/agent.js");
require("dotenv").config();
require("./config/dbConnection.js")();
require("./config/passport.js")(passport);

// Setting up view engine and middleware
app.set("view engine", "ejs");
app.use(expressLayouts);
app.use("/assets", express.static(__dirname + "/assets"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(methodOverride("_method"));
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    res.locals.warning = req.flash("warning");
    next();
});

// Routes
app.use(homeRoutes);
app.use(authRoutes);
app.use(adminRoutes);
app.use(donorRoutes);
app.use(agentRoutes);

// Payment confirmation route
app.post('/donor/payment/confirm', async (req, res) => {
    try {
        const { paymentIntentId } = req.body;
        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
        
        // Update your database with payment status
        // Example: update donation status to 'paid'
        
        req.flash('success', 'Donation payment successful');
        res.redirect('/donor/donations/pending');
    } catch (err) {
        console.error(err);
        req.flash('error', 'Payment failed. Please try again.');
        res.redirect('/donor/donate'); // Redirect back to donation form
    }
});

// 404 Page
app.use((req, res) => {
    res.status(404).render("404page", { title: "Page not found" });
});

const port = process.env.PORT || 3000;
app.listen(port, console.log(`Server is running on port: ${port}`));

module.exports = app;
