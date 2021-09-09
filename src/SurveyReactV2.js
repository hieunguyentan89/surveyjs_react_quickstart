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

// SurveyCreator
//     .SurveyQuestionEditorDefinition
//     .definition["question"]
//     .properties = [
//         {   name: "name",
//             title: "Internal Name"
//         }, {
//             name: "title",
//             title: "Title"
//         }, {
//             name: "description",
//             title: "Description"
//         }
//     ];

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
      const showhideTitleAction = new Survey.Action({
        id: "action1",
        css: "sv-action-bar-item--action1",
        title: "",
        visibleIndex : 8,
        iconName: question.titleLocation === "default"
          ? "icon-action1" : "icon-action2",
        iconSize: 16,
        action: () => {
          {
            question.titleLocation = question.titleLocation === "default" ? "hidden" : "default";
          }
        }
      });

      // Find the "delete" action's position.
      var actionDelete;
      var actionClone;
      var actionRequire;
      for (var i = 0; i < options.items.length; i++) {
        if (options.items[i].id === "delete"){
          actionDelete = options.items[i];
          actionDelete.needSeparator = 0;
          actionDelete.title = "";
          actionClone.visibleIndex = 14;
          actionDelete.iconName = "icon-action-delete";
          actionDelete.css = "sv-action-bar-item--action-delete";
        } else if (options.items[i].id === "duplicate") {
          actionClone = options.items[i];
          actionClone.title = "";
          actionClone.visibleIndex = 12;
          actionClone.iconName = "icon-action-clone";
          actionClone.css = "sv-action-bar-item--action-clone";
        } else if (options.items[i].id === "isrequired") {
          actionRequire = options.items[i];
          actionRequire.title = "";
          actionRequire.iconName = "icon-action2";
          actionRequire.css = "sv-action-bar-item--action-require";
          actionRequire.visibleIndex = 10;
        }
      }

      options.items.length = 0;
      options.items.push(showhideTitleAction);
      options.items.push(actionRequire);
      options.items.push(actionClone);
      options.items.push(actionDelete);

      question.registerFunctionOnPropertyValueChanged(
        "isRequired",
        () => {
          actionRequire.iconName = question.isRequired
            ? "icon-action1" : "icon-action2";
            actionRequire.css = question.isRequired
            ? "sv-action-bar-item--action3"
            : "";
        },
        "isRequiredAdorner"
      );

      question.registerFunctionOnPropertyValueChanged(
        "titleLocation",
        () => {
          showhideTitleAction.iconName = question.titleLocation === "default"
          ? "icon-action1" : "icon-action2";
            showhideTitleAction.css = question.titleLocation === "default"
            ? "sv-action-bar-item--action1"
            : "";
        },
        ""
      );
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
        name: "multiselect",
        isCopied: true,
        iconName: "icon-multi-select",
        title: "Multi-Select",
        json: {
            "type": "multicheckbox",
            "hasNone": true,
            "hasOther": true,
            "hasSelectAll": true,
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

        <i data-fa-symbol="icon-action-clone" className="fas fa-clone fa-fw"></i>
        <i data-fa-symbol="icon-actiondragelement" className="fas fa-arrows-alt fa-fw"></i>
        <i data-fa-symbol="icon-action-delete" className="fas fa-trash fa-fw"></i>
        <i data-fa-symbol="edit" className="fas fa-pencil fa-fw"></i>
        <i data-fa-symbol="header" className="fas fa-heading fa-fw"></i>
        <i data-fa-symbol="icon-text1" className="fas fs-text fa-fw"></i>
        <i data-fa-symbol="icon-number" className="fas fa-hashtag fa-fw"></i>
        <i data-fa-symbol="icon-email" className="fas fa-envelope-open-text fa-fw"></i>
        <i data-fa-symbol="icon-undo" className="fas fa-undo-alt"></i>
        <i data-fa-symbol="icon-redo" className="fas fa-redo-alt"></i>
        <i data-fa-symbol="icon-settings" className="fas fa-settings"></i>
        <i data-fa-symbol="icon-action1" className="fas fa-eye"></i>
        <i data-fa-symbol="icon-action2" className="fas fa-asterisk"></i>
        <i data-fa-symbol="icon-action3" className="fas fa-settings"></i>
        <i data-fa-symbol="icon-multi-select" className="fas fa-check-square icon-multi-select"></i>

        <SurveyCreator.SurveyCreatorComponent creator={creator} />
        {/*
          <SurveyReact.SurveyActionBar model={creator.toolbar}/>
          <CustomCreator creator={creator} />
        */}
      </div>
    )

  }
}

export default SurveyReactV2;
