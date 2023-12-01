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

		// Ensures screen readers don't see the content while the modal is open
		const rootElement = document.getElementById("root");
		ModalReact.setAppElement(rootElement);
	}

	// componentDidMount() {
	// 	console.log("mounted");
	// }

	/** Handles typing in the password box */
	handleChange(event) {
		this.setState({ errorMessage: false });
		this.setState({ password: event.target.value });
	}

	/** When the submit button is clicked */
	submitPassword() {
		if (this.state.password === adminPassword || IS_DEMO_VERSION) {
			this.setState({ modalOpened: false, isAuthenticated: true });
		} else {
			this.setState({ errorMessage: true, isAuthenticated: false });
		}
	}

	/** Main function that kick-starts all the downloading */
	async getStudyLists() {
		let userIDs = null;

		// In the demo version, only use the sample response IDs
		if (IS_DEMO_VERSION) {
			userIDs = ["0sampleResponseIDstudy1", "0sampleResponseIDstudy2"];
		} else {
			const tmp = await this.DATABASE.collection("responseIDs").get();
			userIDs = tmp.docs;
		}

		if (userIDs.length > 0) {
			this.setState({ userIDs: userIDs }, () => {
				const promises = userIDs.map((user) => {
					return Promise.all([
						this.getResumeContent(user, 1),
						this.getResumeContent(user, 2),
					]);
				});

				// Wait for all promises to resolve
				Promise.all(promises)
					.then(() => {
						// Create a CSV from the resume content
						this.createCSV(this.resumeContent);
					})
					.catch((error) => {
						console.error("Error fetching resumes:", error);
					});
			});

			// this.setState({ totalResume: this.state.userIDs.length });
			// this.getResume1(0);

			// this.setState({ totalActivity: this.state.userIDs.length });
			// this.getActivity1(0);
		}
	}

	// /** Get the content of each user's Resume 1 */
	// getResume1(i) {
	// 	console.log(this.state.userIDs.length);
	// 	var max = i + 80;
	// 	while (i < max && i < this.state.userIDs.length) {
	// 		this.getResumeContent(this.userIDs[i].id, 1);
	// 		i++;
	// 	}
	// 	this.setState({ completedResume: i });
	// 	if (i < this.state.userIDs.length) {
	// 		this.getResume1(i);
	// 	}
	// }

	getActivityContent(itemID, studyVersion) {
		console.log("getting activity for " + itemID);
		let text = "masterActivity" + studyVersion;
		let csvList = [];
		let newObj = [];

		let singleText = "singleActivity" + studyVersion;
		let newObjSingle = [];

		//get activity data - page 1
		var snapshot1 = firebase
			.firestore()
			.collection("userIDs")
			.doc(itemID)
			.collection("activityData_page1")
			.onSnapshot((snapshot) => {
				snapshot.forEach((doc) => {
					newObj = ["page 1", doc.data().time, doc.data().description];
					csvList = [...csvList, newObj];

					newObjSingle = [
						itemID,
						"page 1",
						doc.data().time,
						doc.data().description,
					];
					this[singleText] = [...this[singleText], newObjSingle];
				});
				snapshot1();
			});

		//get activity data - page 2
		var snapshot2 = firebase
			.firestore()
			.collection("userIDs")
			.doc(itemID)
			.collection("activityData_page2")
			.onSnapshot((snapshot) => {
				snapshot.forEach((doc) => {
					newObj = ["page 2", doc.data().time, doc.data().description];
					csvList = [...csvList, newObj];

					newObjSingle = [
						itemID,
						"page 2",
						doc.data().time,
						doc.data().description,
					];
					this[singleText] = [...this[singleText], newObjSingle];
				});
				snapshot2();
			});

		//get activity data - page 3
		var snapshot3 = firebase
			.firestore()
			.collection("userIDs")
			.doc(itemID)
			.collection("activityData_page3")
			.onSnapshot((snapshot) => {
				snapshot.forEach((doc) => {
					newObj = ["page 3", doc.data().time, doc.data().description];
					csvList = [...csvList, newObj];

					newObjSingle = [
						itemID,
						"page 3",
						doc.data().time,
						doc.data().description,
					];
					this[singleText] = [...this[singleText], newObjSingle];
				});
				snapshot3();
			});

		//get activity data - page 4
		var snapshot4 = firebase
			.firestore()
			.collection("userIDs")
			.doc(itemID)
			.collection("activityData_page4")
			.onSnapshot((snapshot) => {
				snapshot.forEach((doc) => {
					newObj = ["page 4", doc.data().time, doc.data().description];
					csvList = [...csvList, newObj];

					newObjSingle = [
						itemID,
						"page 4",
						doc.data().time,
						doc.data().description,
					];
					this[singleText] = [...this[singleText], newObjSingle];
				});
				snapshot4();
			});
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

	getActivity1(i) {
		setTimeout(() => {
			console.log("in loop func");
			console.log(this.state.userIDs.length);
			var max = i + 20;
			while (i < max && i < this.state.userIDs.length) {
				this.getActivityContent(this.userIDs[i].id, 1);
				i++;
			}
			this.setState({ completedActivity: i });
			if (i < this.state.userIDs.length) {
				this.getActivity1(i);
			}
		}, 30000);
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

	// renderActivityData = (studyVersion) => {
	// 	let text = "masterActivity" + studyVersion;
	// 	//console.log(this[text].length)
	// 	if (this[text].length > 0) {
	// 		let viewPositionList = [];
	// 		this[text].forEach((item, index) => {
	// 			//console.log("ITEM: " + item)

	// 			viewPositionList.push(
	// 				<div>
	// 					{/* <CSVLink data={item[1]} filename={item[0] + "_activityData.csv"}>
	// 						{item[0]}_activityData
	// 					</CSVLink> */}
	// 				</div>
	// 			);
	// 		});
	// 		return viewPositionList;
	// 	} else {
	// 		return null;
	// 	}
	// };

	// renderResumeData = (studyVersion) => {
	// 	let text = "masterResume" + studyVersion;
	// 	//console.log(this[text].length)
	// 	if (this[text].length > 0) {
	// 		let viewPositionList = [];
	// 		this[text].forEach((item, index) => {
	// 			//console.log("ITEM: " + item)

	// 			viewPositionList.push(
	// 				<div>
	// 					<CSVLink data={item[1]} filename={item[0] + "_resumeData.csv"}>
	// 						{item[0]}_resumeData
	// 					</CSVLink>
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

	// renderActivitySingle = (studyVersion) => {
	// 	let text = "singleActivity" + studyVersion;
	// 	if (this[text].length > 0) {
	// 		let viewPositionList = [];
	// 		viewPositionList.push(
	// 			<div>
	// 				<CSVLink
	// 					data={this[text]}
	// 					filename={"activityData" + studyVersion + ".csv"}
	// 				>
	// 					{"activityData" + studyVersion + ".csv"}
	// 				</CSVLink>
	// 			</div>
	// 		);
	// 		return viewPositionList;
	// 	} else {
	// 		return null;
	// 	}
	// };

	// renderResumeSingle = (studyVersion) => {
	// 	let text = "singleResume" + studyVersion;
	// 	if (this[text].length > 0) {
	// 		let viewPositionList = [];
	// 		viewPositionList.push(
	// 			<div>
	// 				<CSVLink
	// 					data={this[text]}
	// 					filename={"resumeData" + studyVersion + ".csv"}
	// 				>
	// 					{"resumeData" + studyVersion + ".csv"}
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
		const url = URL.createObjectURL(blob);
		this.setState({ resumeCSVurl: url });
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

					<button onClick={this.getStudyLists.bind(this)}>Go!</button>

					{this.state.displayingActivity && (
						<div className="horizontal" id="big">
							<div>Activity Data</div>
						</div>
					)}

					{this.state.resumeCSVurl && (
						<div className="horizontal" id="big">
							<a href={this.state.resumeCSVurl} download={`resume_data.csv`}>
								Resume Data
							</a>
						</div>
					)}

					<hr />

					<div className="list">
						<div id="title">Study Data: </div>

						<div className="horizontal">
							<div>
								User Data Processed {this.state.completedUser}/
								{this.state.userIDs.length}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Admin;
