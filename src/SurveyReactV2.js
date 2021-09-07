import React, { Component } from "react";
import * as SurveyCreator from "survey-creator-react";
import { HeaderToolbox } from "./HeaderToolbox";
import "survey-knockout/modern.css";
import "survey-creator-react/survey-creator-react.css";

class SurveyReactV2 extends Component {
  render() {
    HeaderToolbox();
    var creator = new SurveyCreator.SurveyCreator({}, {});
    creator.toolbox.clearItems();
    creator.toolbox.addItem({
        name: "header",
        isCopied: true,
        iconName: "header",
        title: "Header",
        json: {
            "type": "header",
        }
      });
      creator.toolbox.addItem({
        name: "inputtext",
        iconName: "icon-text1",
        title: "Text",
        json: {
            "type": "text",
            "placeHolder": "Input Text",
        }
      });

      creator.toolbox.addItem({
        name: "inputpass",
        isCopied: true,
        iconName: "icon-password",
        title: "Password",
        json: {
            "type": "text",
            "name": "q1",
            "placeHolder": "Input Password",
            "inputType": "password",
        }
      });
  
      creator.toolbox.addItem({
        name: "inputnumber",
        iconName: "icon-number",
        title: "Number",
        json: {
            "type": "text",
            "name": "q1",
            "placeHolder": "Input Number",
            "inputType": "number",
        }
      });
  
      creator.toolbox.addItem({
        name: "inputemail",
        iconName: "icon-email",
        title: "Email",
        json: {
            "type": "text",
            "name": "q1",
            "placeHolder": "Input Email",
            "inputType": "email",
            "validators": [
              {
                  "type": "email"
              }
          ],
        }
      });
    return (
        <div>
      
        <i data-fa-symbol="icon-actioncopy" className="fas fa-clone fa-fw"></i>
        <i data-fa-symbol="icon-actiondragelement" className="fas fa-arrows-alt fa-fw"></i>
        <i data-fa-symbol="icon-actiondelete" className="fas fa-trash fa-fw"></i>
        <i data-fa-symbol="edit" className="fas fa-pencil fa-fw"></i>
        <i data-fa-symbol="header" className="fas fa-heading fa-fw"></i>
        <i data-fa-symbol="icon-text1" className="fas fs-text fa-fw"></i>
        <i data-fa-symbol="icon-number" className="fas fa-hashtag fa-fw"></i>
        <i data-fa-symbol="icon-email" className="fas fa-envelope-open-text fa-fw"></i>

        <SurveyCreator.SurveyCreatorComponent creator={creator} />;
      </div>
    )
    
  }
}

export default SurveyReactV2;