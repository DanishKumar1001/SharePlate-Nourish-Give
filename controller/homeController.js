
// Display the welcome page
exports.getWelcomePage = (req, res) => {
    res.render("home/welcome");
};

// Display the About Us page
exports.getAboutUsPage = (req, res) => {
    res.render("home/aboutUs", { title: "About Us | Food Aid" });
};

// Display the Mission page
exports.getMissionPage = (req, res) => {
    res.render("home/mission", { title: "Our mission | Food Aid" });
};

// Display the Contact Us page
exports.getContactUsPage = (req, res) => {
    res.render("home/contactUs", { title: "Contact us | Food Aid" });
};