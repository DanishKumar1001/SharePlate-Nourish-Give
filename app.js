const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");

// Setting up view engine
app.set("view engine", "ejs");
app.use(expressLayouts);
app.use("/assets", express.static(__dirname + "/assets"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 404 Page
app.use((req, res) => {
	res.status(404).render("404page", { title: "Page not found" });
});

const port = process.env.PORT || 3000;
app.listen(port, console.log(`Server is running on port: ${port}`));

module.exports = app;
