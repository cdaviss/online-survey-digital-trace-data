import React, { useState } from "react";

/*
  This is the landing page for the demo. 
  It's a simple page that explains the study and shows you what the website looks like when embedded into a Qualtrics survey.
*/

export default function LandingPage() {
	const [iframes, setIframes] = useState([]);

	const renderEmbeddedResume = (studyVersion, resumeVersion) => {
		const iframeSrc = `/online-survey-digital-trace-data/#/${studyVersion}/${resumeVersion}/0sampleResponseIDstudy${studyVersion}`;
		const iframeTitle = `${studyVersion}${resumeVersion}`;

		const newIframe = (
			<iframe
				key={iframeTitle}
				height="630px"
				width="100%"
				src={iframeSrc}
				title={iframeTitle}
			></iframe>
		);
		setIframes([...iframes, newIframe]);
	};

	return (
		<div className="LandingPage container">
			<h1>Pretend this is the Qualtrics Survey</h1>

			<h2>You'll have some questions</h2>
			<p>And information and such</p>

			<p>And then you can embed the Digital Trace Data page.</p>

			<p>
				By default, we are manipulating candidate gender and parenthood status.
			</p>

			<p>There are two resumes. Here's Candidate 1.</p>

			<h3>First Resume</h3>

			<button onClick={() => renderEmbeddedResume(1, 1)}>
				Generate Candidate 1 resume
			</button>
			{iframes.length >= 1 && iframes[0]}

			<h3>Second Resume</h3>

			<p>And now Candidate 2.</p>

			<button onClick={() => renderEmbeddedResume(1, 2)}>
				Generate Candidate 2 resume
			</button>
			{iframes.length >= 2 && iframes[1]}

			<h2>Downloading the Data</h2>
			<p>
				Once you've run your study, you can download the data in CSV format at{" "}
				<a href="#/admin">/admin</a>. In this demo, you can download the data no
				matter what password you put in.
			</p>
		</div>
	);
}
