// The demo version doesn't log to Firebase, and speeds up the Admin page by only downloading a small amount of sample data
export const IS_DEMO_VERSION = true;

// This is the password to log into the admin page and download the data
export const adminPassword = "it's so so secret";

// This is the Firebase configuration, which you can get from the Firebase console
// (Order doesn't matter)
export const firebaseConfig = {
	apiKey: "alphanumeric",
	authDomain: "your-project.firebaseapp.com",
	projectId: "your-project",
	storageBucket: "your-project.appspot.com",
	messagingSenderId: "number",
	appId: "alphanumeric:with:colons",
	// Optional
	measurementId: "G-alphanumeric",
};
