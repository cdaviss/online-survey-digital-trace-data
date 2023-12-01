import React from "react";
import "./App.css";
import Divider from "@material-ui/core/Divider";
import firebase from "./firebase";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

export default class Resume extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			positionList: [],
		};

		// Add props to "this"
		this.recordActivity = this.props.recordActivity;

		const db = firebase.firestore();
		this.USER_DATA = db
			.collection("responseIDs")
			.doc(this.props.qualtricsUserId);
		this.RESUME_CONTENT = db.collection("resume");

		this.collapsibleOpened = this.collapsibleToggled.bind(this);
		this.voteClick = this.voteClick.bind(this);
	}

	componentDidMount() {
		this.setState({ studyVersion: this.props.studyVersion });
		this.setState({ resumeVersion: this.props.resumeVersion }, () => {
			// On the first resume, we'll decide the data the user will see in the whole study
			if (this.state.resumeVersion === 1) {
				this.getResume1Values(this.displayValues);
			} else {
				// Show the appropriate resume data
				this.getResume2Values(this.displayValues);
			}
		});
	}

	// componentWillUnmount() {
	// 	if (this.timer) {
	// 		clearInterval(this.timer);
	// 	}
	// }

	/** The first resume has randomly-decided values. Decide them and put into state. */
	getResume1Values(callback) {
		// Get city
		this.RESUME_CONTENT.doc("study2_location")
			.get()
			.then((doc) => {
				this.setState({ city: doc.data().city });
			});

		// Select gender
		const isMan = Math.random() < 0.5;

		// Select parenthood
		const isParent = Math.random() < 0.5;

		// Select education
		// Could be more than two options in the future
		const education = Math.random() < 0.5 ? "a" : "b";

		// Could be more than two options in the future
		const work1 = Math.random() < 0.5 ? "a" : "b";
		const work2 = Math.random() < 0.5 ? "a" : "b";

		// Decide if remote or not
		// Only used for study 2! but always calculate it to keep the code simple
		const isRemote = Math.random() < 0.5;

		// Store resume 1 values in state
		this.setState(
			{
				isMan: isMan,
				isParent: isParent,
				education: education,
				work1: work1,
				work2: work2,
				isRemote: isRemote,
			},
			// Now that info is in state, call the callback
			callback
		);

		// Store resume 1 values in the database
		this.USER_DATA.collection("values shown").doc("resume 1").set({
			isMan: isMan,
			isParent: isParent,
			education: education,
			work1: work1,
			work2: work2,
			isRemote: isRemote,
		});
	}

	/** The second resume has the opposite values to the first. Calculate them and put into state. */
	getResume2Values(callback) {
		// Get the values shown to this user for resume 1
		this.USER_DATA.collection("values shown")
			.doc("resume 1")
			.get()
			.then((doc) => {
				const resume1values = doc.data();
				// Same gender
				const isMan = resume1values.isMan;

				// Opposite parenthood
				const isParent = !resume1values.isParent;

				// Opposite education
				// Could be more than two options in the future, which would need more logic
				const education = resume1values.education === "a" ? "b" : "a";

				// Opposite work history
				// Could be more than two options in the future, which would need more logic
				const work1 = resume1values.work1 === "a" ? "b" : "a";
				const work2 = resume1values.work2 === "a" ? "b" : "a";

				// Opposite remote status
				// Only used for study 2! but always calculate it to keep the code simple
				const isRemote = !resume1values.isRemote;

				// Store resume 2 values in state
				this.setState(
					{
						isMan: isMan,
						isParent: isParent,
						education: education,
						work1: work1,
						work2: work2,
						isRemote: isRemote,
					},
					// Now that info is in state, call the callback
					callback
				);

				// Store resume 2 values in the database
				this.USER_DATA.collection("values shown").doc("resume 2").set({
					isMan: isMan,
					isParent: isParent,
					education: education,
					work1: work1,
					work2: work2,
					isRemote: isRemote,
				});
			});
	}

	/** Once we've decided the values, actually display them (based on state) */
	displayValues() {
		// City
		this.RESUME_CONTENT.doc("study2_location")
			.get()
			.then((doc) => {
				this.setState({ city: doc.data().city });
			});

		// Initial phone screen notes
		this.RESUME_CONTENT.doc("notes from initial phone screen")
			.get()
			.then((doc) => {
				let parenthoodText = null;
				// Based on parent/nonparent
				if (this.state.isParent) {
					parenthoodText = doc.data().nonparent.toString();
				} else {
					parenthoodText = doc.data().parent.toString();
				}

				// Put the text into a nicer format
				let split = parenthoodText
					// Split each sentence into a bullet point,
					.split(".")
					// Clean up whitespace
					.map((str) => str.trim())
					// Remove any empty strings (by removing falsy values)
					.filter(Boolean);
				this.setState({ bulletList: split });
			});

		// Education
		this.RESUME_CONTENT.doc(`education ${this.state.education}`)
			.get()
			.then((doc) => {
				this.setState({ degree: doc.data().degree });
				this.setState({ distinction: doc.data().distinction });
				this.setState({ duration: doc.data().duration });
				this.setState({ major: doc.data().major });
				this.setState({ university: doc.data().university });
			});

		// Work experience
		this.RESUME_CONTENT.doc(`work box 1${this.state.work1}`)
			.get()
			.then((doc) => {
				this.addPositionToList(doc.data());
			});
		this.RESUME_CONTENT.doc(`work box 2${this.state.work1}`)
			.get()
			.then((doc) => {
				this.addPositionToList(doc.data());
			});
	}

	// TODO: move to separate file
	/** Called when a section is toggled open/closed */
	collapsibleToggled(eventKey) {
		// TODO: add open/closed based on state
		if (eventKey === 0) {
			// Education Section
			this.recordActivity(
				"collapsibleToggled",
				"education",
				"toggled education section "
			);
		} else if (eventKey === 1) {
			// Work Section
			this.recordActivity(
				"collapsibleToggled",
				"work",
				"toggled work section "
			);
		}
	}

	// TODO: move to separate file
	/** Called when one of the upvote/circle/downvote buttons are clicked */
	voteClick(event) {
		const db = firebase.firestore();

		this.activityCounter = this.activityCounter + 1;
		let count = this.activityCounter.toString();

		var options = { hour12: false };
		let time = new Date().toLocaleString("en-US", options);

		this.setState(
			{ [event.target.name]: !this.state[event.target.name] },
			() => {
				if (this.state[event.target.name]) {
					db.collection("studies")
						.doc("study " + this.state.studyVersion)
						.collection("userIDs")
						.doc(this.state.currentUserID)
						.collection(
							"activityData_resume" + this.state.resumeVersion.toString()
						)
						.doc(count)
						.set({
							time: time,
							description: "clicked " + event.target.name + " button",
						});

					//unclick the others in the same box
					if (event.target.name === "work1_up") {
						this.setState({ work1_down: false, work1_q: false });
					} else if (event.target.name === "work2_up") {
						this.setState({ work2_down: false, work2_q: false });
					} else if (event.target.name === "work3_up") {
						this.setState({ work3_down: false, work3_q: false });
					} else if (event.target.name === "work1_down") {
						this.setState({ work1_up: false, work1_q: false });
					} else if (event.target.name === "work2_down") {
						this.setState({ work2_up: false, work2_q: false });
					} else if (event.target.name === "work3_down") {
						this.setState({ work3_up: false, work3_q: false });
					} else if (event.target.name === "work1_q") {
						this.setState({ work1_up: false, work1_down: false });
					} else if (event.target.name === "work2_q") {
						this.setState({ work2_up: false, work2_down: false });
					} else if (event.target.name === "work3_q") {
						this.setState({ work3_up: false, work3_down: false });
					} else if (event.target.name === "education_down") {
						this.setState({ education_up: false, education_q: false });
					} else if (event.target.name === "education_up") {
						this.setState({ education_down: false, education_q: false });
					} else if (event.target.name === "education_q") {
						this.setState({ education_up: false, education_down: false });
					} else if (event.target.name === "notes_down") {
						this.setState({ notes_up: false, notes_q: false });
					} else if (event.target.name === "notes_up") {
						this.setState({ notes_down: false, notes_q: false });
					} else if (event.target.name === "notes_q") {
						this.setState({ notes_up: false, notes_down: false });
					}
				} else {
					db.collection("studies")
						.doc("study " + this.state.studyVersion)
						.collection("userIDs")
						.doc(this.state.currentUserID)
						.collection(
							"activityData_resume" + this.state.resumeVersion.toString()
						)
						.doc(count)
						.set({
							time: time,
							description: "unclicked " + event.target.name + " button",
						});
				}
			}
		);
	}

	/** Helper function: append a new position to the positionList */
	addPositionToList(newPosition) {
		this.setState((prevState) => ({
			positionList: [...prevState.positionList, newPosition],
		}));
	}

	render() {
		// If our data hasn't loaded yet, show a loading screen
		if (!(this.state.bulletList && this.state.positionList.length > 0)) {
			return <h1>Loading...</h1>;
		}

		return (
			<div className="overall">
				<div className="App">
					<div className="resume">
						<div>
							<img
								className="profile_image"
								src={imageToURL(this.state.isMan ? "male_user" : "female_user")}
								alt="the candidate"
							/>
							<div className="header">
								Candidate {this.state.resumeVersion === 1 ? "A" : "B"}
							</div>

							<div className="votingblock_notes">
								<VotingButtons
									state={this.state}
									clickFunction={this.voteClick}
									sectionName="notes"
								/>

								<div className="notes">
									Notes from Initial Phone Screen:
									<span id="subtext_bullet">
										<ul>
											{this.state.remoteNotesText && (
												<li>{this.state.remoteNotesText}</li>
											)}
											{this.state.bulletList.map((item, index) => {
												return <li key={index}>{item}</li>;
											})}
										</ul>
									</span>
								</div>
							</div>

							<Accordion>
								<Card>
									<Card.Header
										style={{
											background: "white",
											paddingLeft: 0,
											paddingRight: 0,
										}}
									>
										<Accordion.Toggle
											as={Button}
											style={{
												color: "black",
												width: "100%",
												display: "flex",
												flexDirection: "row",
												justifyContent: "space-between",
												fontSize: "18px",
												alignItems: "center",
											}}
											variant="link"
											eventKey="0"
											onClick={() =>
												// TODO: clean this up
												this.setState(
													{
														educationSectionOpened:
															!this.state.educationSectionOpened,
													},
													() => {
														this.collapsibleToggled(0);
														if (this.state.educationSectionOpened) {
															this.setState({ workSectionOpened: false });
														}
													}
												)
											}
										>
											Education{" "}
											<img
												id="toggle_icon"
												src={
													this.state.educationSectionOpened
														? imageToURL("minus_icon")
														: imageToURL("plus_icon")
												}
												alt="toggle icon"
											/>
										</Accordion.Toggle>
									</Card.Header>

									<Accordion.Collapse eventKey="0">
										<Card.Body>
											<div className="votingblock">
												<VotingButtons
													state={this.state}
													sectionName={"education"}
												/>
												<div id="subtext">
													{this.state.university}
													<div id="subinfo">
														{this.state.degree}, {this.state.major}
													</div>
													<div id="subinfogray">{this.state.duration}</div>
												</div>
											</div>
										</Card.Body>
									</Accordion.Collapse>
								</Card>

								<Card>
									<Card.Header
										style={{
											background: "white",
											paddingLeft: 0,
											paddingRight: 0,
											borderTop: "1px solid black",
										}}
									>
										<Accordion.Toggle
											as={Button}
											style={{
												color: "black",
												width: "100%",
												display: "flex",
												flexDirection: "row",
												justifyContent: "space-between",
												fontSize: "18px",
												alignItems: "center",
											}}
											variant="link"
											eventKey="1"
											onClick={() =>
												this.setState(
													{
														workSectionOpened: !this.state.workSectionOpened,
													},
													() => {
														this.collapsibleToggled(1);
														if (this.state.workSectionOpened) {
															this.setState({
																educationSectionOpened: false,
															});
														}
													}
												)
											}
										>
											Work Experience {/* TODO: make toggle bars a component */}
											<img
												id="toggle_icon"
												src={
													this.state.workSectionOpened
														? imageToURL("minus_icon")
														: imageToURL("plus_icon")
												}
												alt="toggle icon"
											/>
										</Accordion.Toggle>
									</Card.Header>

									{/* Position List */}
									<Accordion.Collapse eventKey="1">
										<Card.Body>
											{this.state.positionList.map((position, index) => {
												return (
													<div key={index}>
														<div className="votingblock">
															<VotingButtons
																state={this.state}
																clickFunction={this.voteClick}
																sectionName={`work${index + 1}`}
															/>

															<div id="subtext">
																{" "}
																{position.title}
																<div id="horizontal">
																	<div id="subinfo">{position.company}</div>

																	{/*remote && study version 2*/}
																	{this.state.studyVersion === 2 &&
																		this.state.remote &&
																		index === 0 && (
																			<div id="subinfo">
																				<i>Remote</i>
																			</div>
																		)}

																	{this.state.studyVersion === 2 &&
																		!this.state.remote &&
																		index === 0 && (
																			<div id="subinfo">
																				<i>{this.state.city}</i>
																			</div>
																		)}

																	{this.state.studyVersion === 2 &&
																		index !== 0 && (
																			<div id="subinfo">
																				<i>{this.state.city}</i>
																			</div>
																		)}
																</div>
																<div id="subinfogray">{position.duration}</div>
																<div id="subinfo">{position.description}</div>
															</div>
														</div>
														<Divider />
													</div>
												);
											})}
										</Card.Body>
									</Accordion.Collapse>
								</Card>
							</Accordion>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

/**
 * Turns an image name into the src, relative to /public/images. Image should be a png.
 */
function imageToURL(imageName) {
	return `${process.env.PUBLIC_URL}/images/${imageName}.png`;
}

// TODO: default params for state, clickFunction
/** Component: upvote, circle, and downvote, in traffic light colors. */
const VotingButtons = ({ state, clickFunction, sectionName }) => {
	return (
		<div className="vertical">
			<img
				name={`${sectionName}_up`}
				src={
					state[`${sectionName}_up`]
						? imageToURL("upvote_selected")
						: imageToURL("upvote")
				}
				onClick={clickFunction}
				alt="upvote"
			/>

			<img
				name={`${sectionName}_q`}
				src={
					state[`${sectionName}_q`]
						? imageToURL("circle_selected")
						: imageToURL("circle")
				}
				onClick={clickFunction}
				alt="question mark"
			/>

			<img
				name={`${sectionName}_down`}
				src={
					state[`${sectionName}_down`]
						? imageToURL("downvote_selected")
						: imageToURL("downvote")
				}
				onClick={clickFunction}
				alt="downvote"
			/>
		</div>
	);
};
