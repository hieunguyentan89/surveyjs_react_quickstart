import React, { Component } from "react";
import * as Survey from "survey-core";
import * as SurveyReact from "survey-react-ui";
import * as SurveyCreator from "survey-creator-react";
import { HeaderToolbox } from "./component/toolbox/HeaderToolbox";
import CustomCreator from "./CustomDesigner";
import CustomToolboxWrapper from "./CustomToolboxWrapper";
import CustomQuestionCheckbox from "./component/multicheckbox/CustomQuestionCheckbox";
import "survey-core/modern.css";
import "survey-creator-react/survey-creator-react.css";
import "./custom.css";
import { MultiCheckboxToolbox, defineMultiCheckboxCSS } from "./component/toolbox/MultiCheckboxToolbox";
import CustomBooleanCheckbox from "./component/toolbox/properties/CustomBooleanCheckbox";
import CustomItemValueAdorner from "./component/multicheckbox/CustomItemValueAdorner";
import CustomIconSVG from "./component/CustomIconSVG";
import CustomPropertyGrid from './component/CustomPropertyGrid';

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
  
  // SurveyCreator
  // .SurveyQuestionEditorDefinition
  // .definition["page"]
  // .properties = [
  //     {   name: "name",
  //         title: "Internal Field Name",
  //         visibleIndex: 1,
  //     }, {
  //         name: "title",
  //         title: "Field Name",
  //         visibleIndex: 2,
  //     }, {
  //         name: "description",
  //         title: "Field Description",
  //         maxLength: 160,
  //         visibleIndex: 3,
  //     }
  // ];

  SurveyReact.ReactElementFactory.Instance.registerElement(
    "svc-property-grid",
    (props) => {
      return React.createElement(CustomPropertyGrid, props);
    }
  );

  SurveyReact.ReactQuestionFactory.Instance.registerQuestion("multicheckbox", (props) => {
    return React.createElement(CustomQuestionCheckbox, props);
  });

  SurveyReact.ReactQuestionFactory.Instance.registerQuestion("sv-boolean-checkbox", (props) => {
    return React.createElement(CustomBooleanCheckbox, props);
  });

  SurveyReact.ReactElementFactory.Instance.registerElement(
    "svc-item-value",
    (props) => {
      return React.createElement(CustomItemValueAdorner, props);
    }
  );

const property = Survey.Serializer.findProperty("page", "description");
property.typeValue = "input";
const property1 = Survey.Serializer.findProperty("page", "title");
property1.typeValue = "input";
console.log(property);
  SurveyCreator
      .SurveyQuestionEditorDefinition
      .definition.page
      .properties = [{
        name: 'name',
        title: 'Internal Field Name',
        visibleIndex: 1,
      }, {
        name: 'title',
        title: 'Field Name',
        visibleIndex: 2,
      }, {
        name: 'description',
        title: 'Field Description',
        maxLength: 160,
        visibleIndex: 3,
      }];
    
    // creator.toolbarItems.push(
    //   new Survey.Action({
    //     id: "icon-setting-page",
    //     iconName: "icon-setting-page",
    //     needSeparator: true,
    //     action: () => {
    //       console.log(creator.survey.visiblePages);
    //       if (!creator.showPropertyGrid) {
    //         creator.showPropertyGrid = true;
    //       } else {
    //         creator.selectElement(creator.survey.visiblePages[0]);
    //       }
    //     },
    //     active: creator.isElementSelected(creator.survey),
    //     visible: creator.viewType === "designer",
    //     title: "Settings",
    //     showTitle: true
    //   })
    // );

    var creator = new SurveyCreator.SurveyCreator({}, {});
    const placeHolderTexts = {
      page: {
        name: {
          placeHolder: 'Please type page name',
        },
        title: {
          placeHolder: 'Please type page title',
        },
        description: {
          placeHolder: 'Please type page description',
        },
      },
    };

    creator.onPropertyEditorCreated.add((_, options) => {
      const internalOptions = options;
      
      const type = internalOptions.obj.isQuestion ? "question" : internalOptions.obj.getType();;
      const placeHolderObj = placeHolderTexts[type];
      if (!placeHolderObj || !placeHolderObj[internalOptions.property.name]) return;
      internalOptions.editor.placeHolder =
        placeHolderObj[internalOptions.property.name].placeHolder;
      // if (type === 'page') {
      //   internalOptions.property.displayName =
      //     placeHolderObj[internalOptions.property.name].displayName;
      //     // console.log(internalOptions);
      // }
    });
  
    

    creator.onDefineElementMenuItems.add((sender, options) => {
      // If an element doesn't have such a property, the element is not a question.
      if (options.obj.startWithNewLine === undefined) return;
      var question = options.obj;
      // Define a new bar item (action).
      const showhideTitleAction = new Survey.Action({
        id: "action1",
        css: "sv-action-bar-item--action-show-hide",
        title: "",
        visibleIndex : 8,
        iconName: question.titleLocation === "default"
          ? "icon-eye" : "icon-eye-slash",
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
          actionDelete.visibleIndex = 14;
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
          actionRequire.iconName = "icon-asterisk";
          actionRequire.css = "sv-action-bar-item--action-required";
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
            ? "icon-email" : "icon-asterisk";
        },
        "isRequiredAdorner"
      );

      question.registerFunctionOnPropertyValueChanged(
        "titleLocation",
        () => {
          showhideTitleAction.iconName = question.titleLocation === "default"
          ? "icon-eye" : "icon-eye-slash";
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

    creator.onTestSurveyCreated.add(function(editor, options){
      defineMultiCheckboxCSS(options.survey);
    });
    defineMultiCheckboxCSS(creator.survey);
    
    return (
        <div>
          <CustomIconSVG />
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
