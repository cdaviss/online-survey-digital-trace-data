import React from "react";
import Resume from "./Resume";
import "./App.css";
import { HashRouter, Route } from "react-router-dom";
import ReadData from "./ReadData";
import LandingPage from "./LandingPage";
import "bootstrap/dist/css/bootstrap.min.css";

var moment = require("moment-timezone");

// import Admin from "./Admin";

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.activityCounter = 1;
		this.recordActivity = this.recordActivity.bind(this);

		// This is hacky, but ReactRouter can't parse URL parameters unless inside a Route
		const loc = document.location.hash;
		this.studyVersion = parseInt(loc.split("/")[1]);
		this.resumeVersion = parseInt(loc.split("/")[2]);
		this.qualtricsUserId = loc.split("/")[3];

		// Print for debugging purposes within Qualtrics
		console.log("qualtricsUserId: " + this.qualtricsUserId);
	}

	/** Record the data in Firebase */
	async recordActivity(category, value, description) {
		// This will be the ID of the activity in Firebase -- a string, padded to 5 digits so alphabetical sorting works
		const id = this.activityCounter.toString().padStart(5, "0");
		this.activityCounter = this.activityCounter + 1;

		const now = moment();

		if (this.DATABASE) {
			this.DATABASE.collection("userIDs")
				.doc(this.qualtricsUserId)
				.collection("activityData_resume" + this.resumeVersion.toString())
				.doc(id)
				.set({
					category: category,
					description: description,
					value: value,
					timestamp: new Date(now),
					timeEpoch: Number(now.format("x")),
					timeReadable: now.tz("America/Los_Angeles").format("M-D-YY h:mm:ssa"),
				});
		}

		console.log(id + " " + category + ": " + value + " -- " + description);
	}

	componentDidMount() {
		this.recordActivity("loading", "accessed", "App mounted");
	}

	render() {
		return (
			<div>
				<HashRouter>
					<Route
						path="/:studyVersion/:resumeVersion/:qualtricsUserId"
						render={(props) => (
							<Resume
								{...props}
								studyVersion={this.studyVersion}
								resumeVersion={this.resumeVersion}
								recordActivity={this.recordActivity}
								qualtricsUserId={this.qualtricsUserId}
							/>
						)}
					/>

					{/* <Route path="/admin" render={<ReadData />} /> */}

					<Route path="/" exact render={() => <LandingPage />} />
				</HashRouter>
			</div>
		);
	}
}
