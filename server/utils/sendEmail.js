/**
 * @description Send email using SendGrid
 * @param {Object} to - The recipient's email address
 * @param {Object} from - The sender's email address
 * @param {Object} subject - The email subject
 * @param {Object} text - The email text
 * @param {Object} html - The email html
 * @returns {Object} The email response
 * @requires @sendgrid/mail - The SendGrid mail module
   */


// import required modules
const sendgrid = require('@sendgrid/mail');

// Set the SendGrid API key
sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

// Send email using SendGrid
const sendEmail = ({ to, from, subject, text, html }) => {
	const msg = { to, from, subject, text, html };
	return sendgrid.send(msg);
};

// Export the sendEmail function
module.exports = sendEmail;

