import React, { useState } from "react";
import { imageToURL } from "./Resume";

/** Component: upvote, circle, and downvote, in traffic light colors. */
export default function VotingBlock({ sectionName, recordActivity }) {
	// null = not selected, 0 = upvote, 1 = circle, 2 = downvote
	const [selectedIndex, setSelectedIndex] = useState(null);

	/** Handles click on upvote, circle, or downvote. */
	function clickFunction(event) {
		const name = event.target.name;

		let whichClicked;
		switch (name.split("_")[1]) {
			case "upvote":
				whichClicked = 0;
				break;
			case "circle":
				whichClicked = 1;
				break;
			case "downvote":
				whichClicked = 2;
				break;
			default:
				break;
		}

		if (selectedIndex === whichClicked) {
			// If already selected, deselect
			setSelectedIndex(null);
			recordActivity(
				"click",
				event.target.name,
				`un-clicked ${event.target.name} button`
			);
		} else {
			// Otherwise, select
			setSelectedIndex(whichClicked);
			recordActivity(
				"click",
				event.target.name,
				`clicked ${event.target.name} button`
			);
		}
	}

	return (
		<div className="vertical">
			<img
				name={`${sectionName}_upvote`}
				src={
					selectedIndex === 0
						? imageToURL("upvote_selected")
						: imageToURL("upvote")
				}
				onClick={clickFunction}
				alt="upvote"
			/>

			<img
				name={`${sectionName}_circle`}
				src={
					selectedIndex === 1
						? imageToURL("circle_selected")
						: imageToURL("circle")
				}
				onClick={clickFunction}
				alt="question mark"
			/>

			<img
				name={`${sectionName}_downvote`}
				src={
					selectedIndex === 2
						? imageToURL("downvote_selected")
						: imageToURL("downvote")
				}
				onClick={clickFunction}
				alt="downvote"
			/>
		</div>
	);
}
