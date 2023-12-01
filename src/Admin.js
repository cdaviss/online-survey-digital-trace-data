import React from "react";
import "./App.css";
import firebase from "./firebase";
import Papa from "papaparse";
import ModalReact from "react-modal";
import { IS_DEMO_VERSION, adminPassword } from "./config";
import "bootstrap/dist/css/bootstrap.min.css";

class Admin extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			//displaying mouse or displaying activity+resume (pulled from props)
			// displayingMouse: false,
			// displayingResume: false,
			// displayingActivity: false,

			// generatedID: "",
			showPasswordErrorMessage: false,
			isAuthenticated: false,

			//all tracking outputs
			// activityData: [],

			// loading1: true,
			// loading2: true,
			// loading3: true,

			// mousestate: false,

			// study1: [],

			password: "",
			modalOpened: true,

			// adminVersion: "singleCSV",
			// buttonText: "Switch to individual CSV format",

			userIDs: [],
			resumeCSVurl: null,
			activitiesCSVurl: null,
		};
		// this.study2List = [];
		// this.study2bList = [];
		// this.study3List = [];

		// this.masterMouse1 = [];
		// this.masterMouse2 = [];
		// this.masterMouse2b = [];
		// this.masterMouse3 = [];

		// this.masterActivity1 = [];
		// this.masterActivity2 = [];
		// this.masterActivity2b = [];
		// this.masterActivity3 = [];

		// this.masterResume1 = [];
		// this.masterResume2 = [];
		// this.masterResume2b = [];
		// this.masterResume3 = [];

		// this.singleMouse1 = [];
		// this.singleMouse2 = [];
		// this.singleMouse2b = [];
		// this.singleMouse3 = [];
		// this.singleActivity1 = [];
		// this.singleActivity2 = [];
		// this.singleActivity2b = [];
		// this.singleActivity3 = [];
		// this.singleResume1 = [];
		// this.singleResume2 = [];
		// this.singleResume2b = [];
		// this.singleResume3 = [];

		this.DATABASE = firebase.firestore();

		this.resumeContent = [];
		this.activityContent = [];

		// Ensures screen readers don't see the content while the modal is open
		const rootElement = document.getElementById("root");
		ModalReact.setAppElement(rootElement);
	}

	// componentDidMount() {
	// 	console.log("mounted");
	// }

	/** Handles typing in the password box */
	handleChange(event) {
		this.setState({ showPasswordErrorMessage: false });
		this.setState({ password: event.target.value });
	}

	/** When the submit button is clicked */
	submitPassword() {
		if (this.state.password === adminPassword || IS_DEMO_VERSION) {
			this.setState({ modalOpened: false, isAuthenticated: true });
			this.fetchData();
		} else {
			this.setState({ showPasswordErrorMessage: true, isAuthenticated: false });
		}
	}

	/** Main function that kick-starts all the downloading */
	async fetchData() {
		let userIDs = null;

		// In the demo version, only use the sample response IDs
		if (IS_DEMO_VERSION) {
			userIDs = ["0sampleResponseIDstudy1", "0sampleResponseIDstudy2"];
		} else {
			const tmp = await this.DATABASE.collection("responseIDs").get();
			userIDs = tmp.docs.map((doc) => doc.id);
		}

		if (userIDs.length > 0) {
			this.setState({ userIDs: userIDs }, () => {
				// Get resume content for each user
				const resumePromises = userIDs.map((user) => {
					return Promise.all([
						this.getResumeContent(user, 1),
						this.getResumeContent(user, 2),
					]);
				});

				// Wait for all promises to resolve
				Promise.all(resumePromises)
					.then(() => {
						// Create a CSV from the resume content
						this.setState({
							resumeCSVurl: this.createCSV(this.resumeContent),
						});
					})
					.catch((error) => {
						console.error("Error fetching resumes:", error);
					});

				// Get activity content for each user
				const activityPromises = userIDs.map((user) => {
					return Promise.all([
						this.getActivityContent(user, 1),
						this.getActivityContent(user, 2),
					]);
				});

				// Wait for all promises to resolve
				Promise.all(activityPromises)
					.then(() => {
						// Create a CSV from the activity content
						this.setState({
							activitiesCSVurl: this.createCSV(this.activityContent),
						});
					})
					.catch((error) => {
						console.error("Error fetching activity:", error);
					});
			});
		}
	}

	/** Get the content of the resume a user saw */
	getResumeContent(responseID, resumeNum) {
		// Get the reference to the resume
		const resumeRef = this.DATABASE.collection("responseIDs")
			.doc(responseID)
			.collection("values shown")
			.doc(`resume ${resumeNum}`);

		// Get the content of the resume
		return resumeRef
			.get()
			.then((doc) => {
				if (doc.exists) {
					this.resumeContent.push({
						responseID: responseID,
						resumeNum: resumeNum,
						...doc.data(),
					});
				} else {
					console.log("No such document!");
				}
			})
			.catch((error) => {
				console.error("Error getting document:", error);
			});
	}

	/** Get the activity of a user on a specific resume */
	getActivityContent(responseID, resumeNum) {
		// Get the reference to the resume
		const resumeRef = this.DATABASE.collection("responseIDs")
			.doc(responseID)
			.collection(`activityData_resume${resumeNum}`);

		// Get the content of the resume
		return resumeRef.get().then((querySnapshot) => {
			querySnapshot.forEach((doc) => {
				this.activityContent.push({
					responseID: responseID,
					resumeNum: resumeNum,
					activityID: doc.id,
					...doc.data(),
				});
			});
		});
	}

	// renderMouseData = (studyVersion) => {
	// 	let text = "masterMouse" + studyVersion;
	// 	//console.log(this[text].length)
	// 	if (this[text].length > 0) {
	// 		let viewPositionList = [];
	// 		this[text].forEach((item, index) => {
	// 			//console.log("ITEM: " + item)

	// 			viewPositionList.push(
	// 				<div>
	// 					{/* <CSVLink data={item[1]} filename={item[0] + "_mouseData.csv"}>
	// 						{item[0]}_mouseData
	// 					</CSVLink> */}
	// 					{/*<div id="subinfogray">{item}</div>*/}
	// 				</div>
	// 			);
	// 		});
	// 		return viewPositionList;
	// 	} else {
	// 		return null;
	// 	}
	// };

	// renderMouseSingle = (studyVersion) => {
	// 	let text = "singleMouse" + studyVersion;
	// 	if (this[text].length > 0) {
	// 		let viewPositionList = [];
	// 		viewPositionList.push(
	// 			<div>
	// 				<CSVLink
	// 					data={this[text]}
	// 					filename={"mouseData" + studyVersion + ".csv"}
	// 				>
	// 					{"mouseData" + studyVersion + ".csv"}
	// 				</CSVLink>
	// 			</div>
	// 		);
	// 		return viewPositionList;
	// 	} else {
	// 		return null;
	// 	}
	// };

	/** Create a CSV from an array of dictionaries */
	createCSV(data) {
		console.log(data);
		// Convert the array of dictionaries to CSV format
		const csv = Papa.unparse(data);

		// Create a Blob containing the CSV data
		const blob = new Blob([csv], { type: "text/csv" });

		// Create a download link
		return URL.createObjectURL(blob);
	}

	render() {
		/* Login popup */
		if (!this.state.isAuthenticated) {
			return (
				<ModalReact className="modal_dtp" isOpen={this.state.modalOpened}>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							this.submitPassword();
						}}
					>
						<div>
							<label htmlFor="password">Enter Password:</label>
							<input
								type="password"
								id="password"
								onChange={this.handleChange.bind(this)}
								value={this.state.password}
								autoFocus
							/>
							<button type="submit">Submit</button>
						</div>
						{this.state.showPasswordErrorMessage && (
							<div id="red">Invalid password. Please re-enter.</div>
						)}
					</form>
				</ModalReact>
			);
		}

		return (
			<div className="overall">
				<div className="container">
					<div className="title">Download Data</div>

					{!this.state.activitiesCSVurl && !this.state.resumeCSVurl && (
						<p>Processing...</p>
					)}

					{this.state.activitiesCSVurl && (
						<div className="horizontal" id="big">
							<a
								href={this.state.activitiesCSVurl}
								download={`activity_data.csv`}
							>
								Activity Data
							</a>
						</div>
					)}

					{this.state.resumeCSVurl && (
						<div className="horizontal" id="big">
							<a href={this.state.resumeCSVurl} download={`resume_data.csv`}>
								Resume Data
							</a>
						</div>
					)}
				</div>
			</div>
		);
	}
}

export default Admin;
