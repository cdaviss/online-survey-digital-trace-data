(this["webpackJsonpdigital-trace-data"]=this["webpackJsonpdigital-trace-data"]||[]).push([[0],{40:function(e,t,n){},63:function(e,t,n){},82:function(e,t,n){"use strict";n.r(t);var i=n(3),s=n(1),a=n.n(s),c=n(22),o=n.n(c),r=(n(63),n(30)),d=n(29),l=n.n(d),u=n(32),h=n(24),j=n(25),b=n(26),p=n(28),m=n(27),v=n(56),O=n(6),g=n(44);n(83);g.a.initializeApp({apiKey:"AIzaSyAlwuSMohoigYsmJ5oeQcdah3kTVHcObWw",authDomain:"accountability-study-2024.firebaseapp.com",projectId:"accountability-study-2024",storageBucket:"accountability-study-2024.appspot.com",messagingSenderId:"222692886404",appId:"1:222692886404:web:a80a18f08983ecb60c7fd1",measurementId:"G-ZN34ZSKHTX"});var f=g.a,x=n(35),y=(n(40),n(96)),S=n(20),w=n(37),k=n(16),C=n(36);function A(e){var t=e.sectionName,n=e.recordActivity,a=Object(s.useState)(null),c=Object(C.a)(a,2),o=c[0],r=c[1];function d(e){var t;switch(e.target.name.split("_")[1]){case"upvote":t=0;break;case"circle":t=1;break;case"downvote":t=2}o===t?(r(null),n("click",e.target.name,"un-clicked ".concat(e.target.name," button"))):(r(t),n("click",e.target.name,"clicked ".concat(e.target.name," button")))}return Object(i.jsxs)("div",{className:"vertical",children:[Object(i.jsx)("img",{name:"".concat(t,"_upvote"),src:E(0===o?"upvote_selected":"upvote"),onClick:d,alt:"upvote"}),Object(i.jsx)("img",{name:"".concat(t,"_circle"),src:E(1===o?"circle_selected":"circle"),onClick:d,alt:"question mark"}),Object(i.jsx)("img",{name:"".concat(t,"_downvote"),src:E(2===o?"downvote_selected":"downvote"),onClick:d,alt:"downvote"})]})}var T=function(e){Object(p.a)(n,e);var t=Object(m.a)(n);function n(e){var i;Object(h.a)(this,n),(i=t.call(this,e)).state={positionList:[]},i.recordActivity=i.props.recordActivity;var s=f.firestore();return i.db=s,i.USER_DATA=s.collection("responseIDs").doc(i.props.qualtricsUserId),i.RESUME_CONTENT=s.collection("resume"),i.collapsibleOpened=i.collapsibleToggled.bind(Object(b.a)(i)),i}return Object(j.a)(n,[{key:"componentDidMount",value:function(){var e=this;this.setState({studyVersion:this.props.studyVersion}),this.setState({resumeVersion:this.props.resumeVersion},(function(){e.parseCandidateData((function(){1===e.state.resumeVersion?e.getResume1Values(e.displayValues):e.getResume2Values(e.displayValues)}))}))}},{key:"getResume1Values",value:function(e){var t=Math.random()<.5,n=Math.random()<.5?0:1,i=t?this.state.whiteCandidates[n].name:this.state.blackCandidates[n].name,s=Math.random()<.5,a=Math.random()<.5?"a":"b",c=Math.random()<.5?"a":"b",o=Math.random()<.5?"a":"b";this.setState({isMan:0,isWhite:t,isParent:s,education:a,work1:c,work2:o,name:i,nameIndex:n},e),this.USER_DATA.set({}),this.USER_DATA.collection("values shown").doc("resume 1").set({isMan:0,isWhite:t,isParent:s,education:a,work1:c,work2:o,name:i,nameIndex:n})}},{key:"getResume2Values",value:function(e){var t=this;this.USER_DATA.collection("values shown").doc("resume 1").get().then((function(n){var i=n.data(),s=i.isMan,a=i.isWhite,c=0===i.nameIndex?1:0,o=a?t.state.whiteCandidates[c].name:t.state.blackCandidates[c].name,r=!i.isParent,d="a"===i.education?"b":"a",l="a"===i.work1?"b":"a",u="a"===i.work2?"b":"a";t.setState({isMan:s,isWhite:a,isParent:r,education:d,work1:l,work2:u,name:o,nameIndex:c},e),t.USER_DATA.collection("values shown").doc("resume 2").set({isMan:s,isWhite:a,isParent:r,education:d,work1:l,work2:u,name:o,nameIndex:c})}))}},{key:"displayValues",value:function(){var e=this;this.RESUME_CONTENT.doc("notes from initial phone screen").get().then((function(t){var n=(e.state.isParent?t.data().nonparent.toString():t.data().parent.toString()).split(".").map((function(e){return e.trim()})).filter(Boolean);e.setState({bulletList:n})})),this.RESUME_CONTENT.doc("misc").get().then((function(t){var n=(e.state.isParent?t.data().nonparent.toString():t.data().parent.toString()).split(".").map((function(e){return e.trim()})).filter(Boolean);e.setState({misc:n})})),this.RESUME_CONTENT.doc("education ".concat(this.state.education)).get().then((function(t){e.setState({degree:t.data().degree}),e.setState({duration:t.data().duration}),e.setState({major:t.data().major}),e.setState({university:t.data().university})})),this.RESUME_CONTENT.doc("work box 1".concat(this.state.work1)).get().then((function(t){e.addPositionToList(t.data())})),this.RESUME_CONTENT.doc("work box 2".concat(this.state.work1)).get().then((function(t){e.addPositionToList(t.data())}))}},{key:"collapsibleToggled",value:function(e){0===e?this.recordActivity("collapsibleToggled","education","toggled education section "):1===e?this.recordActivity("collapsibleToggled","work","toggled work section "):2===e&&this.recordActivity("collapsibleToggled","misc","toggled misc section ")}},{key:"parseCandidateData",value:function(e){var t=this,n=this.db.collection("candidates"),i=[],s=[];n.where("isWhite","==",!0).get().then((function(e){e.forEach((function(e){i.push(e.data())}))})).then((function(){return n.where("isWhite","==",!1).get().then((function(e){e.forEach((function(e){s.push(e.data())}))}))})).then((function(){t.setState({whiteCandidates:i,blackCandidates:s},e)})).catch((function(e){console.error("Error getting candidates:",e)}))}},{key:"replaceGenderOptions",value:function(e){var t=this,n=e.match(/\[(.*?)\/(.*?)\]/g);return n?(n.forEach((function(n){var i=n.slice(1,-1).split("/");e=e.replace(n,t.state.isMan?i[0]:i[1])})),e):e}},{key:"addPositionToList",value:function(e){this.setState((function(t){return{positionList:[].concat(Object(x.a)(t.positionList),[e])}}))}},{key:"_onMouseMove",value:function(e){}},{key:"render",value:function(){var e=this;return this.state.bulletList&&this.state.positionList.length>0&&this.state.name?Object(i.jsx)("div",{className:"overall",children:Object(i.jsx)("div",{className:"App",onMouseMove:this._onMouseMove.bind(this),children:Object(i.jsx)("div",{className:"resume",children:Object(i.jsxs)("div",{children:[Object(i.jsx)("img",{className:"profile_image",src:E(this.state.isMan?"male_user":"female_user"),alt:"the candidate"}),Object(i.jsx)("div",{className:"header",children:this.state.name||"Candidate ".concat(1===this.state.resumeVersion?"1":"2")}),Object(i.jsxs)("div",{className:"votingblock_notes",children:[Object(i.jsx)(A,{sectionName:"notes",recordActivity:this.recordActivity}),Object(i.jsxs)("div",{className:"notes",children:["Notes from Initial Phone Screen:",Object(i.jsxs)("ul",{children:[this.state.remoteNotesText&&Object(i.jsx)("li",{children:this.replaceGenderOptions(this.state.remoteNotesText)}),this.state.bulletList.map((function(t,n){return Object(i.jsx)("li",{children:e.replaceGenderOptions(t)},n)}))]})]})]}),Object(i.jsxs)(S.a,{children:[Object(i.jsxs)(k.a,{children:[Object(i.jsx)(k.a.Header,{style:{background:"white",paddingLeft:0,paddingRight:0},children:Object(i.jsxs)(S.a.Toggle,{as:w.a,style:{color:"black",width:"100%",display:"flex",flexDirection:"row",justifyContent:"space-between",fontSize:"18px",alignItems:"center"},variant:"link",eventKey:"0",onClick:function(){return e.setState({educationSectionOpened:!e.state.educationSectionOpened},(function(){e.collapsibleToggled(0),e.state.educationSectionOpened&&e.setState({workSectionOpened:!1,miscSectionOpened:!1})}))},children:["Education"," ",Object(i.jsx)("img",{id:"toggle_icon",src:this.state.educationSectionOpened?E("minus_icon"):E("plus_icon"),alt:"toggle icon"})]})}),Object(i.jsx)(S.a.Collapse,{eventKey:"0",children:Object(i.jsx)(k.a.Body,{children:Object(i.jsxs)("div",{className:"votingblock",children:[Object(i.jsx)(A,{sectionName:"education",recordActivity:this.recordActivity}),Object(i.jsxs)("div",{id:"subtext",children:[this.state.university,Object(i.jsxs)("div",{id:"subinfo",children:[this.state.degree,", ",this.state.major]}),Object(i.jsx)("div",{id:"subinfogray",children:this.state.duration})]})]})})})]}),Object(i.jsxs)(k.a,{children:[Object(i.jsx)(k.a.Header,{style:{background:"white",paddingLeft:0,paddingRight:0,borderTop:"1px solid black"},children:Object(i.jsxs)(S.a.Toggle,{as:w.a,style:{color:"black",width:"100%",display:"flex",flexDirection:"row",justifyContent:"space-between",fontSize:"18px",alignItems:"center"},variant:"link",eventKey:"1",onClick:function(){return e.setState({workSectionOpened:!e.state.workSectionOpened},(function(){e.collapsibleToggled(1),e.state.workSectionOpened&&e.setState({educationSectionOpened:!1,miscSectionOpened:!1})}))},children:["Work Experience",Object(i.jsx)("img",{id:"toggle_icon",src:this.state.workSectionOpened?E("minus_icon"):E("plus_icon"),alt:"toggle icon"})]})}),Object(i.jsx)(S.a.Collapse,{eventKey:"1",children:Object(i.jsx)(k.a.Body,{children:this.state.positionList.map((function(t,n){return Object(i.jsxs)("div",{children:[Object(i.jsxs)("div",{className:"votingblock",children:[Object(i.jsx)(A,{sectionName:"work".concat(n+1),recordActivity:e.recordActivity}),Object(i.jsxs)("div",{id:"subtext",children:[" ",t.title,Object(i.jsx)("div",{id:"horizontal",children:Object(i.jsx)("div",{id:"subinfo",children:t.company})}),Object(i.jsx)("div",{id:"subinfogray",children:t.duration}),Object(i.jsx)("div",{id:"subinfo",children:t.description})]})]}),Object(i.jsx)(y.a,{})]},n)}))})})]}),Object(i.jsxs)(k.a,{children:[Object(i.jsx)(k.a.Header,{style:{background:"white",paddingLeft:0,paddingRight:0,borderTop:"1px solid black"},children:Object(i.jsxs)(S.a.Toggle,{as:w.a,style:{color:"black",width:"100%",display:"flex",flexDirection:"row",justifyContent:"space-between",fontSize:"18px",alignItems:"center"},variant:"link",eventKey:"2",onClick:function(){return e.setState({miscSectionOpened:!e.state.miscSectionOpened},(function(){e.collapsibleToggled(2),e.state.miscSectionOpened&&e.setState({educationSectionOpened:!1,workSectionOpened:!1})}))},children:["Miscellaneous",Object(i.jsx)("img",{id:"toggle_icon",src:this.state.miscSectionOpened?E("minus_icon"):E("plus_icon"),alt:"toggle icon"})]})}),Object(i.jsx)(S.a.Collapse,{eventKey:"2",children:Object(i.jsx)(k.a.Body,{children:Object(i.jsxs)("div",{className:"votingblock",children:[Object(i.jsx)(A,{sectionName:"misc",recordActivity:this.recordActivity}),Object(i.jsxs)("div",{className:"notes",children:["Other:",Object(i.jsx)("ul",{children:this.state.misc.map((function(t,n){return Object(i.jsx)("li",{children:e.replaceGenderOptions(t)},n)}))})]})]})})})]})]})]})})})}):Object(i.jsx)("h1",{children:"Loading..."})}}]),n}(a.a.Component);function E(e){return"".concat("/online-survey-digital-trace-data","/images/").concat(e,".png")}function N(){var e=Object(s.useState)([]),t=Object(C.a)(e,2),n=t[0],a=t[1],c=function(e,t){var s="/online-survey-digital-trace-data/#/".concat(e,"/").concat(t,"/0sampleResponseIDstudy").concat(e),c="".concat(e).concat(t),o=Object(i.jsx)("iframe",{height:"630px",width:"100%",src:s,title:c},c);a([].concat(Object(x.a)(n),[o]))};return Object(i.jsxs)("div",{className:"LandingPage container",children:[Object(i.jsx)("h1",{children:"Pretend this is the Qualtrics Survey"}),Object(i.jsx)("h2",{children:"You'll have some questions"}),Object(i.jsx)("p",{children:"And information and such"}),Object(i.jsx)("p",{children:"And then you can embed the Digital Trace Data page."}),Object(i.jsx)("p",{children:"By default, we are manipulating candidate gender and parenthood status."}),Object(i.jsx)("p",{children:"There are two resumes. Here's Candidate 1."}),Object(i.jsx)("h3",{children:"First Resume"}),Object(i.jsx)("button",{onClick:function(){return c(1,1)},children:"Generate Candidate 1 resume"}),n.length>=1&&n[0],Object(i.jsx)("h3",{children:"Second Resume"}),Object(i.jsx)("p",{children:"And now Candidate 2."}),Object(i.jsx)("button",{onClick:function(){return c(1,2)},children:"Generate Candidate 2 resume"}),n.length>=2&&n[1],Object(i.jsx)("h2",{children:"Downloading the Data"}),Object(i.jsxs)("p",{children:["Once you've run your study, you can download the data in CSV format at"," ",Object(i.jsx)("a",{href:"#/admin",children:"/admin"}),". In this demo, you can download the data no matter what password you put in."]})]})}var D=n(55),I=n.n(D),_=n(46),V=n.n(_),M=(n(53),function(e){Object(p.a)(n,e);var t=Object(m.a)(n);function n(e){var i;Object(h.a)(this,n),(i=t.call(this,e)).state={showPasswordErrorMessage:!1,isAuthenticated:!1,typedText:"",userIDs:[],resumeCSVurl:null,activitiesCSVurl:null},i.DATABASE=f.firestore(),i.resumeContent=[],i.activityContent=[];var s=document.getElementById("root");return V.a.setAppElement(s),i}return Object(j.a)(n,[{key:"handleChange",value:function(e){this.setState({showPasswordErrorMessage:!1}),this.setState({typedText:e.target.value})}},{key:"submitPassword",value:function(){this.state.typedText,this.setState({isAuthenticated:!0}),this.fetchData()}},{key:"fetchData",value:function(){var e=Object(u.a)(l.a.mark((function e(){var t,n,i=this;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t=null,t=["0sampleResponseIDstudy1","0sampleResponseIDstudy2"],e.next=9;break;case 5:return e.next=7,this.DATABASE.collection("responseIDs").get();case 7:n=e.sent,t=n.docs.map((function(e){return e.id}));case 9:t.length>0&&this.setState({userIDs:t},(function(){var e=t.map((function(e){return Promise.all([i.getResumeContent(e,1),i.getResumeContent(e,2)])}));Promise.all(e).then((function(){i.setState({resumeCSVurl:i.createCSV(i.resumeContent)})})).catch((function(e){console.error("Error fetching resumes:",e)}));var n=t.map((function(e){return Promise.all([i.getActivityContent(e,1),i.getActivityContent(e,2)])}));Promise.all(n).then((function(){i.setState({activitiesCSVurl:i.createCSV(i.activityContent)})})).catch((function(e){console.error("Error fetching activity:",e)}))}));case 10:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"getResumeContent",value:function(e,t){var n=this;return this.DATABASE.collection("responseIDs").doc(e).collection("values shown").doc("resume ".concat(t)).get().then((function(i){i.exists?n.resumeContent.push(Object(r.a)({responseID:e,resumeNum:t},i.data())):console.log("No such document!")})).catch((function(e){console.error("Error getting document:",e)}))}},{key:"getActivityContent",value:function(e,t){var n=this;return this.DATABASE.collection("responseIDs").doc(e).collection("activityData_resume".concat(t)).get().then((function(i){i.forEach((function(i){n.activityContent.push(Object(r.a)({responseID:e,resumeNum:t,activityID:i.id},i.data()))}))}))}},{key:"createCSV",value:function(e){var t=I.a.unparse(e),n=new Blob([t],{type:"text/csv"});return URL.createObjectURL(n)}},{key:"render",value:function(){var e=this;return this.state.isAuthenticated?Object(i.jsx)("div",{className:"overall",children:Object(i.jsxs)("div",{className:"container",children:[Object(i.jsx)("div",{className:"title",children:"Download Data"}),!this.state.activitiesCSVurl&&!this.state.resumeCSVurl&&Object(i.jsx)("p",{children:"Processing..."}),this.state.activitiesCSVurl&&Object(i.jsx)("div",{className:"horizontal",id:"big",children:Object(i.jsx)("a",{href:this.state.activitiesCSVurl,download:"activity_data.csv",children:"Activity Data"})}),this.state.resumeCSVurl&&Object(i.jsx)("div",{className:"horizontal",id:"big",children:Object(i.jsx)("a",{href:this.state.resumeCSVurl,download:"resume_data.csv",children:"Resume Data"})})]})}):Object(i.jsx)(V.a,{className:"modal_dtp",isOpen:!this.state.isAuthenticated,children:Object(i.jsxs)("form",{onSubmit:function(t){t.preventDefault(),e.submitPassword()},children:[Object(i.jsxs)("div",{children:[Object(i.jsx)("label",{htmlFor:"password",children:"Enter Password:"}),Object(i.jsx)("input",{type:"password",id:"password",onChange:this.handleChange.bind(this),value:this.state.typedText,autoFocus:!0}),Object(i.jsx)("button",{type:"submit",children:"Submit"})]}),this.state.showPasswordErrorMessage&&Object(i.jsx)("div",{id:"red",children:"Invalid password. Please re-enter."})]})})}}]),n}(a.a.Component)),R=M,P=n(77),U=function(e){Object(p.a)(n,e);var t=Object(m.a)(n);function n(e){var i;Object(h.a)(this,n),(i=t.call(this,e)).activityCounter=1,i.recordActivity=i.recordActivity.bind(Object(b.a)(i)),i.DATABASE=f.firestore();var s=document.location.hash;return i.studyVersion=parseInt(s.split("/")[1]),i.resumeVersion=parseInt(s.split("/")[2]),i.qualtricsUserId=s.split("/")[3],console.log("qualtricsUserId: "+i.qualtricsUserId),i}return Object(j.a)(n,[{key:"recordActivity",value:function(){var e=Object(u.a)(l.a.mark((function e(t,n,i){var s;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:s=this.activityCounter.toString().padStart(5,"0"),this.activityCounter=this.activityCounter+1,P(),console.log(s+" "+t+": "+n+" -- "+i);case 5:case"end":return e.stop()}}),e,this)})));return function(t,n,i){return e.apply(this,arguments)}}()},{key:"componentDidMount",value:function(){this.recordActivity("loading","accessed","App mounted")}},{key:"render",value:function(){var e=this;return Object(i.jsx)("div",{children:Object(i.jsxs)(v.a,{children:[Object(i.jsx)(O.a,{path:"/:studyVersion/:resumeVersion/:qualtricsUserId",render:function(t){return Object(i.jsx)(T,Object(r.a)(Object(r.a)({},t),{},{studyVersion:e.studyVersion,resumeVersion:e.resumeVersion,recordActivity:e.recordActivity,qualtricsUserId:e.qualtricsUserId}))}}),Object(i.jsx)(O.a,{path:"/admin",render:function(){return Object(i.jsx)(R,{})}}),Object(i.jsx)(O.a,{path:"/",exact:!0,render:function(){return Object(i.jsx)(N,{})}})]})})}}]),n}(a.a.Component);o.a.render(Object(i.jsx)(a.a.StrictMode,{children:Object(i.jsx)(U,{})}),document.getElementById("root"))}},[[82,1,2]]]);
//# sourceMappingURL=main.911697b9.chunk.js.map