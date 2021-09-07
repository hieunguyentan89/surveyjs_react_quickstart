import React, { Component } from "react";
import * as SurveyCreator from "survey-creator-react";
import "survey-knockout/modern.css";
import "survey-creator-react/survey-creator-react.css";

class SurveyReactV2 extends Component {
  render() {
    var creator = new SurveyCreator.SurveyCreator({}, {});

    return <SurveyCreator.SurveyCreatorComponent creator={creator} />;
  }
}

export default SurveyReactV2;