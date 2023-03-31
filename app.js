const express = require("express");
const https = require("https");
const path = require("path");
const port = 3000;
const key = "f71504f52cd48d552c0ed7e6b10e8e89-us10";
const mailchimp = require("@mailchimp/mailchimp_marketing");
const { response } = require("express");
const ReportsApi = require("@mailchimp/mailchimp_marketing/src/api/ReportsApi");

const app = express(); //create new express app

app.use(express.json()); //Used to parse JSON body
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname));

//GET MAIN HTML PAGE
app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "signup.html"));
});

//SEND POST REQUEST
app.post("/", (req, res) => {
	let firstName = req.body.fName;
	let lastName = req.body.lName;
	let email = req.body.email;
	var userData = {
		email_address: email,
		status: "subscribed",
		merge_fields: {
			FNAME: firstName,
			LNAME: lastName,
		},
	};
	mailchimp.setConfig({
		apiKey: "f71504f52cd48d552c0ed7e6b10e8e89-us10",
		server: "us10",
	});
	const listId = "47aafdbbfb";

//SEND DATA  TO MAILCHIMP
	async function run() {
		const response = await mailchimp.lists.addListMember(listId, userData)
        .then((r)=>{
res.sendFile(path.join(__dirname,"success.html"));
        })
        .catch((err)=>{
			
            res.sendFile(path.join(__dirname,"failure.html"));
			
        })
		
	}
	run();
});

app.post("/failure", (req, res) =>{
res.redirect("/");
})

app.listen(port, () => {
	console.log(`server has started on port ${port}`);
});
