// This determines if the app actually records data to Firebase, and allows the Admin page to quickly download a small bit of data
export const IS_DEMO_VERSION = true;

// This is the password to log into the admin page and download the data
export const adminPassword = "it's so so secret";

// This is the Firebase configuration, which you can get from the Firebase console
export const firebaseConfig = {
	apiKey: "alphanumeric",
	authDomain: "your-project.firebaseapp.com",
	projectId: "your-project",
	storageBucket: "your-project.appspot.com",
	messagingSenderId: "number",
	appId: "alphanumeric:with:colons",
	measurementId: "G-alphanumeric",
};
