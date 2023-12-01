import React, { useState } from "react";

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
				<strong>
					TODO: these are based on the studyVersion in the code, which does not
					align to the DTD paper.
				</strong>
			</p>

			<h2>Study 1</h2>

			<p>
				In Study 1, we are manipulating candidate gender and parenthood status.
			</p>

			<p>There are two resumes. Here's Candidate A.</p>

			<h3>First Resume</h3>

			<button onClick={() => renderEmbeddedResume(1, 1)}>
				Generate Candidate A resume
			</button>
			{iframes.length >= 1 && iframes[0]}

			<h3>Second Resume</h3>

			<p>And now Candidate B.</p>

			<button onClick={() => renderEmbeddedResume(1, 2)}>
				Generate Candidate A resume
			</button>
			{iframes.length >= 2 && iframes[1]}

			<h2>Study 2</h2>

			<p>
				In Study 2, we are additionally manipulating if the candidate has remote
				work experience.
			</p>

			<p>There are two resumes. Here's Candidate A.</p>

			<h3>First Resume</h3>

			<button onClick={() => renderEmbeddedResume(2, 1)}>
				Generate Candidate A resume
			</button>
			{iframes.length >= 3 && iframes[2]}

			<h3>Second Resume</h3>

			<p>And now Candidate B.</p>

			<button onClick={() => renderEmbeddedResume(2, 2)}>
				Generate Candidate A resume
			</button>
			{iframes.length >= 4 && iframes[3]}

			<h2>Downloading the Data</h2>
			<p>
				Once you've run your study, you can download the data in CSV format at{" "}
				<a href="#/admin">/admin</a>. In this demo, you can download the data no
				matter what password you put in.
			</p>
		</div>
	);
}
