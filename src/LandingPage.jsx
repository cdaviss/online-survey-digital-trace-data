import React from "react";

export default function LandingPage({ props }) {
	return (
		<div className="LandingPage container">
			<h1>Pretend this is the Qualtrics Survey</h1>

			<h2>You'll have some questions</h2>
			<p>And information and such</p>

			<p>And then you can embed the Digital Trace Data page.</p>

			<iframe
				height="600px"
				width="100%"
				src="/online-survey-digital-trace-data/#/1/1/0sampleResponseID"
				title="11"
			></iframe>
		</div>
	);
}
