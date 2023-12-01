<!--
# Steven G. Opferman | steven.g.opferman@gmail.com
# Adapted from:
#   https://github.com/othneildrew/Best-README-Template/
#   https://github.com/kylelobo/The-Documentation-Compendium/
-->

<h1 align="center">Online Survey Digital Trace Data</h1>
<div id="top"></div>

<p align="left">
Code repository for <em>Untapped Potential: Collecting and Analyzing Digital Trace Data within Survey Experiments</em>, by Erin Macke, Claire Daviss, and Emma Williams-Baron.

SocArXiv Preprint: [10.31235/osf.io/frhj6](10.31235/osf.io/frhj6)
</p>

## Table of Contents

- [About](#about)
- [Usage](#usage)
- [Getting Started](#getting_started)
- [Contributing](#contributing)
- [Acknowledgements](#acknowledgements)

## About <a name="about"></a>

Researchers can collect digital trace data during online survey experiments with relative ease, at modest costs, and to substantial benefit. Because digital trace data unobtrusively measure survey participants’ behaviors, they can be used to analyze digital outcomes of theoretical and empirical interest, while reducing the risk of social desirability bias. We demonstrate the utility of collecting digital trace data during online survey experiments through two original studies. In both, participants evaluated interactive digital resumes, which we designed to track participants’ clicks, mouse movements, and time spent on the resumes. This novel approach allowed us to better understand participants’ search for information and cognitive processing in hiring decisions. Overall, there is immense untapped potential value in collecting digital trace data during online survey experiments and using it to address important sociological research questions. We provide this repository so that future research can build their own tools and run similar studies.

<p align="right">(<a href="#top">back to top</a>)</p>

## Usage <a name="usage"></a>

This code is designed to be hosted on GitHub Pages, with individual pages embedded within Qualtrics surveys.

A live demo can be found [here](https://thefirstquestion.github.io/online-survey-digital-trace-data/#/).

<p align="right">(<a href="#top">back to top</a>)</p>

## Getting Started <a name="getting_started"></a>

These instructions will get you a copy of the project up and running.

### Prerequisites

Get the code and install dependencies.

1. [Set up Git and GitHub](https://docs.github.com/en/get-started/quickstart/set-up-git).

2. [Fork this repository](https://docs.github.com/en/get-started/quickstart/fork-a-repo) to create your own copy of the code.

3. [Clone your fork](https://docs.github.com/en/get-started/quickstart/fork-a-repo#cloning-your-forked-repository) of the code to get the files on your local computer.

4. [Install npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) (Node Package Manager), which you will use to run the code.

5. [Create a Firebase project and register your app](https://firebase.google.com/docs/web/setup#create-firebase-project-and-app). Firebase is the database for this project. You will provide the resume data here, and the digital trace data will also be recorded here.

<p align="right">(<a href="#top">back to top</a>)</p>

### Set Up Firebase

The code reads the resume information from Firebase.

TODO: write this section

### Installation

1. Install NPM packages.

    ```sh
    npm install
    ```

    You might get scary-looking warnings here. This is fine! _(Technical explanation of why these warnings happen [here](https://overreacted.io/npm-audit-broken-by-design/).)_

2. Add your Firebase API keys and create your Admin password.

    You can make your changes in `src/config_sample.js` and rename the file to `config.js`.
    **This file contains things that should be kept secret!** Anyone who has your API key has total control over all of your data.

3. Start serving the code.

    ```sh
    npm start
    ```

    In the future, you can start with this step.

4. When you're done, use `Ctrl+C` to stop.

<p align="right">(<a href="#top">back to top</a>)</p>

### Deploying

1. Ensure that the correct homepage URL is in `package.json`. This should be right at the top:

    ```json
    {
      "name": "digital-trace-data",
      "homepage": "https://YOUR_GITHUB_USERNAME.github.io/online-survey-digital-trace-data/",
      "version": "0.1.0",
      ...
    ```

2. Deploy the website to [GitHub Pages](https://pages.github.com/).

    ```sh
    npm run deploy
    ```

<p align="right">(<a href="#top">back to top</a>)</p>

### Use in Qualtrics

We will embed the website in Qualtrics so that study participants will interact with it.

TODO: finish this section with Claire/Emma/Erin help

In Qualtrics, use the following:

> `<iframe height="600px" width="100%" src="https://YOUR_GITHUB_USERNAME.github.io/online-survey-digital-trace-data/#/${e://Field/studyVersion}/${e://Field/resumeVersion}/${e://Field/ResponseID}"></iframe>`

This will produce a URL that looks like <https://YOUR_GITHUB_USERNAME.github.io/online-survey-digital-trace-data/#/NUMBER/NUMBER/QUALTRICS_RESPONSE_ID>.

## Contributing <a name="contributing"></a>

Collaboration is what makes the world such an amazing place to learn, inspire, and create. **Any contributions or suggestions you make are greatly appreciated!**

Feel free to do any of the following:

- send me an [email](mailto:steven.g.opferman@gmail.com)
- [open an issue](https://docs.github.com/en/issues/tracking-your-work-with-issues/creating-an-issue) with the tag "enhancement"
- [fork the repo](https://docs.github.com/en/get-started/quickstart/fork-a-repo) and [create a pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request)

<p align="right">(<a href="#top">back to top</a>)</p>

## Acknowledgements <a name="acknowledgements"></a>

This project was originally developed by [Neha Sharma](https://github.com/sharman99) in 2021.
The codebase was updated and the documentation written by [Steven Opferman](https://thefirstquestion.github.io/) in 2023.

<p align="right">(<a href="#top">back to top</a>)</p>
