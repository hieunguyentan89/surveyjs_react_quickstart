import React, { Component } from "react";
import * as Survey from "survey-core";
import * as SurveyReact from "survey-react-ui";
import * as SurveyCreator from "survey-creator-react";
import { HeaderToolbox } from "./HeaderToolbox";
import CustomCreator from "./CustomDesigner";
import CustomToolboxWrapper from "./CustomToolboxWrapper";
import CustomQuestionCheckbox from "./CustomQuestionCheckbox";
import "survey-knockout/modern.css";
import "survey-creator-react/survey-creator-react.css";
import "./custom.css";
import { MultiCheckboxToolbox } from "./MultiCheckboxToolbox";


class SurveyReactV2 extends Component {
  render() {
    HeaderToolbox();
    MultiCheckboxToolbox();
    // SurveyReact.ReactElementFactory.Instance.registerElement(
    //   "svc-question",
    //   (props) => {
    //       return React.createElement(CustomQuestionAdorner, props);
    //   }
    // );
      
  // SurveyReact.ReactElementFactory.Instance.registerElement(
  //   "svc-toolbox",
  //   (props) => {
  //     return React.createElement(CustomToolboxWrapper, props);
  //   }
  // );
  SurveyReact.ReactQuestionFactory.Instance.registerQuestion("checkbox", (props) => {
    return React.createElement(CustomQuestionCheckbox, props);
  });
    var creator = new SurveyCreator.SurveyCreator({}, {});
    // creator.toolbarItems.push(
    //   new Survey.Action({
    //     id: "toolboxCustomization",
    //     visible: true,
    //     title: "Toolbox Customization",
    //     enabled: true,
    //     action: function () {
    //       alert("Hi!");
    //     }
    //   })
    // );

    creator.onDefineElementMenuItems.add((sender, options) => {
      // If an element doesn't have such a property, the element is not a question.
      if (options.obj.startWithNewLine === undefined) return;
      var question = options.obj;
      // Define a new bar item (action).
      var action1 = {
          id: "action1", // Unique id
          css: () => "sv-action-bar-item--action1",
          title: "", // Item text
          // An icon to render depending on a property's value:
          iconName: "icon-action1",
          // An action to perform on a click:
          action: () => {
              alert('action1');
          }
      };

      var action2 = {
        id: "action2", // Unique id
        css: () => "sv-action-bar-item--action2",
        title: "", // Item text
        // An icon to render depending on a property's value:
        iconName: "icon-action2",
        // An action to perform on a click:
        action: () => {
            alert('action2');
        }
      };

      var action3 = {
        id: "action3", // Unique id
        css: () => "sv-action-bar-item--action3",
        title: "", // Item text
        // An icon to render depending on a property's value:
        iconName: "icon-action3",
        // An action to perform on a click:
        action: () => {
            alert('action3');
        }
      };
      // Find the "delete" action's position.
      var actionDelete;
      var actionCopy;
      var index = -1;
      for (var i = 0; i < options.items.length; i++) {
        if (options.items[i].id === "delete"){
          actionDelete = options.items[i];
          actionDelete.needSeparator = 0;
          actionDelete.title = "";
          actionDelete.iconName = "icon-actiondelete";
        } else if (options.items[i].id === "duplicate") {
          actionCopy = options.items[i];
          actionCopy.title = "";
          actionCopy.iconName = "icon-actioncopy";
        }
      }
      options.items.length = 0;
      options.items.push(action1);
      options.items.push(action2);
      options.items.push(actionCopy);
      options.items.push(actionDelete);
      // Insert a new action before the "delete" action or at the end.
      // if (index > -1) {
      //     options.items.splice(index, 0, barItem);
      // } else {
      //     options.items.push(barItem);
      // }
    });
    //Make toolbox active by default
    creator.rightContainerActiveItem("toolbox");
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
        name: "multicheckbox",
        isCopied: true,
        iconName: "icon-multi-check",
        title: "Multi Checkbox",
        json: {
            "type": "multicheckbox",
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
            "type": "checkbox",
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

      for (var i = 0; i < creator.tabs.length; i++) {
        console.log(creator.tabs[i]);
      }

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
        <i data-fa-symbol="icon-undo" className="fas fa-undo-alt"></i>
        <i data-fa-symbol="icon-redo" className="fas fa-redo-alt"></i>
        <i data-fa-symbol="icon-settings" className="fas fa-settings"></i>
        <i data-fa-symbol="icon-action1" className="fas fa-undo-alt"></i>
        <i data-fa-symbol="icon-action2" className="fas fa-redo-alt"></i>
        <i data-fa-symbol="icon-action3" className="fas fa-settings"></i>
        <i data-fa-symbol="icon-multi-check" className="fas fa-trash"></i>

        {/* <SurveyCreator.SurveyCreatorComponent creator={creator} />; */}
        <SurveyReact.SurveyActionBar model={creator.toolbar}/>
        <CustomCreator creator={creator} />
      </div>
    )
    
  }
}

export default SurveyReactV2;