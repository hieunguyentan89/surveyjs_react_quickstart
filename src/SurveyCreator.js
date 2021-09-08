import React, { Component } from "react";
import * as SurveyKo from "survey-knockout";
import * as SurveyJSCreator from "survey-creator";
import * as Survey from "survey-react";
// import "survey-react/survey.css";
import "survey-creator/survey-creator.css";
import "./custom.css";
import "jquery-ui/themes/base/all.css";
import "nouislider/distribute/nouislider.css";
import "select2/dist/css/select2.css";
import "bootstrap-slider/dist/css/bootstrap-slider.css";

import "jquery-bar-rating/dist/themes/css-stars.css";
import "jquery-bar-rating/dist/themes/fontawesome-stars.css";

import $ from "jquery";
import "jquery-ui/ui/widgets/datepicker.js";
import "select2/dist/js/select2.js";
import "jquery-bar-rating";
import { v4 as uuidv4 } from 'uuid';
//import "icheck/skins/square/blue.css";
import "pretty-checkbox/dist/pretty-checkbox.css";

import * as widgets from "surveyjs-widgets";
SurveyJSCreator.StylesManager.applyTheme("bootstrapmaterial");

var widget = {
  //the widget name. It should be unique and written in lowcase.
  name: "header",
  //the widget title. It is how it will appear on the toolbox of the SurveyJS Editor/Builder
  title: "Text with header",
  //the name of the icon on the toolbox. We will leave it empty to use the standard one
  iconName: "",
  //If the widgets depends on third-party library(s) then here you may check if this library(s) is loaded
  widgetIsLoaded: function () {
      //return typeof $ == "function" && !!$.fn.select2; //return true if jQuery and select2 widget are loaded on the page
      return true; //we do not require anything so we just return true. 
  },
  //SurveyJS library calls this function for every question to check, if it should use this widget instead of default rendering/behavior
  isFit: function (question) {
    console.log(question);
      //we return true if the type of question is textwithbutton
      return question.getType() === 'header';
      //the following code will activate the widget for a text question with inputType equals to date
      //return question.getType() === 'text' && question.inputType === "date";
  },
  //Use this function to create a new class or add new properties or remove unneeded properties from your widget
  //activatedBy tells how your widget has been activated by: property, type or customType
  //property - it means that it will activated if a property of the existing question type is set to particular value, for example inputType = "date" 
  //type - you are changing the behaviour of entire question type. For example render radiogroup question differently, have a fancy radio buttons
  //customType - you are creating a new type, like in our example "textwithbutton"
  activatedByChanged: function (activatedBy) {
      //we do not need to check acticatedBy parameter, since we will use our widget for customType only
      //We are creating a new class and derived it from text question type. It means that text model (properties and fuctions) will be available to us
      SurveyKo.JsonObject.metaData.addClass("header", [], null, "expression");
      //signaturepad is derived from "empty" class - basic question class
      //Survey.JsonObject.metaData.addClass("signaturepad", [], null, "empty");

      //Add new property(s)
      //For more information go to https://surveyjs.io/Examples/Builder/?id=addproperties#content-docs
      SurveyKo.JsonObject.metaData.addProperties("header", [
          { name: "internal header name", category: "general" , visibleIndex: 0},
          { name: "header", category: "general", visibleIndex: 1 },
          { name: "header description", category: "general", visibleIndex: 2},
      ]);

  },
  //If you want to use the default question rendering then set this property to true. We do not need any default rendering, we will use our our htmlTemplate
  isDefaultRender: true,
  //You should use it if your set the isDefaultRender to false
  htmlTemplate: "<div><input/><input/><input/></div>",
  //The main function, rendering and two-way binding
  afterRender: function (question, el) {
      //el is our root element in htmlTemplate, is "div" in our case
      //get the text element
      var text = el.getElementsByTagName("input")[0];
      var text1 = el.getElementsByTagName("input")[1];
      var text2 = el.getElementsByTagName("input")[2];
      console.log(text);
      console.log(text1);
      console.log(text2);

      question.registerFunctionOnPropertyValueChanged(
        "header",
        function () {
          text.value = question.header;
        }
      );

      question.registerFunctionOnPropertyValueChanged(
        "internal header name",
        function () {
          text1.value = question['internal header name'];
        }
      );

      question.registerFunctionOnPropertyValueChanged(
        "header description",
        function () {
          text2.value = question["header description"];
        }
      );
  },
  //Use it to destroy the widget. It is typically needed by jQuery widgets
  willUnmount: function (question, el) {
      //We do not need to clear anything in our simple example
      //Here is the example to destroy the image picker
      //var $el = $(el).find("select");
      //$el.data('picker').destroy();
  }
};

var searchStringWidget = {
  name: "searchstring",
  isFit: function (question) {
    return question.getType() == "comment";
  },
  init() {
    Survey.Serializer.addProperty("comment", {
      name: "hasSearch:switch",
      category: "general",
    });
  },
  isDefaultRender: true,
  afterRender: function (question, el) {
    var mainDiv = document.createElement("div");
    var searchEl = document.createElement("input");
    searchEl.style.width = "calc(100% - 120px)";
    var btnEl = document.createElement("button");
    btnEl.innerText = "Search";
    btnEl.style.width = "120px";
    var searchIndex = 0;
    searchEl.onchange = function () {
      searchIndex = 0;
    };
    btnEl.onclick = function () {
      var searchText = searchEl.value;
      var text = el.value;
      if (!searchText || !text) return;
      var index = text.indexOf(searchText, searchIndex + 1);
      if (index < 0 && searchIndex > -1) {
        index = text.indexOf(searchText, 0);
      }
      searchIndex = index;
      if (index > -1) {
        el.focus();
        el.setSelectionRange(index, index + searchText.length);
      }
    };
    mainDiv.appendChild(searchEl);
    mainDiv.appendChild(btnEl);
    el.parentElement.insertBefore(mainDiv, el);

    mainDiv.style.display = !question.hasSearch ? "none" : "";
    question.registerFunctionOnPropertyValueChanged(
      "hasSearch",
      function () {
        mainDiv.style.display = !question.hasSearch ? "none" : "";
      }
    );
  },
};
const assss = "{\n \"pages\": [\n  {\n   \"name\": \"page1\",\n   \"elements\": [\n    {\n     \"type\": \"text\",\n     \"name\": \"question1\",\n     \"validators\": [\n      {\n       \"type\": \"email\"\n      }\n     ],\n     \"internal id\": \"f86e63e9-7565-4ddb-a76c-8c6df5f65a40\",\n     \"inputType\": \"email\",\n     \"placeHolder\": \"Input Email\"\n    }\n   ]\n  }\n ]\n}";
// SurveyKo.CustomWidgetCollection.Instance.addCustomWidget(searchStringWidget);
SurveyKo.CustomWidgetCollection.Instance.addCustomWidget(widget, "customtype");
    // SurveyJSCreator
    // .SurveyQuestionEditorDefinition
    // .definition["header"]
    // .properties = [
    //     "internal header name",
    //     "header",
    //     "header description",
    //     "visible"
    // ];
class SurveyCreator extends Component {
  surveyCreator;
  componentDidMount() {
    let options = { showEmbededSurveyTab: true };
    this.surveyCreator = new SurveyJSCreator.SurveyCreator(
      null,
      options
    );
    //Show toolbox in the right container. It is shown on the left by default
    this.surveyCreator.showToolbox = "right";
    //Show property grid in the right container, combined with toolbox
    this.surveyCreator.showPropertyGrid = "right";
    //Make toolbox active by default
    this.surveyCreator.rightContainerActiveItem("toolbox");;
    
    this.surveyCreator.toolbox.changeCategories([
      { name: "panel", category: "Panels" }, 
      { name: "paneldynamic", category: "Panels" }, 
      { name: "matrix", category: "Matrix" }
    ]);
    this.surveyCreator.toolbox.clearItems();
    this.surveyCreator.toolbox.addItem({
      id : "text",
      name: "text",
      isCopied: true,
      iconName: "my-custom-class",
      title: "Add Text",
      json: {
          "type": "text"
      }
    });
    console.log(this.surveyCreator.toolbox.jsonText);
    this.surveyCreator.toolbox.addItem({
      name: "inputpass",
      isCopied: true,
      // iconName: "icon-default",
      title: "Password",
      json: {
          "type": "text",
          "name": "q1",
          "placeHolder": "Input Password",
          "inputType": "password",
      }
    });

    this.surveyCreator.toolbox.addItem({
      name: "inputnumber",
      isCopied: true,
      // iconName: "icon-default",
      title: "Number",
      json: {
          "type": "text",
          "name": "q1",
          "placeHolder": "Input Number",
          "inputType": "number",
      }
    });

    this.surveyCreator.toolbox.addItem({
      name: "inputemail",
      isCopied: true,
      // iconName: "icon-default",
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

    this.surveyCreator.toolbox.addItem({
      name: "header",
      isCopied: true,
      iconName: "header",
      title: "Header",
      json: {
          "type": "header",
      }
    });
    SurveyKo
    .Serializer
    .addProperty("question", {
        name: "internal id",
        default: uuidv4()
    });

    // SurveyKo
    // .Serializer
    // .addProperty("survey", {
    //     name: "survey id",
    //     default: uuidv4()
    // });

    SurveyKo
    .Serializer
    .addProperty("pages", {
        name: "internal id",
        // default: uuidv4()
    });

    SurveyKo
    .Serializer
    .addProperty("expression", {
        name: "header",
        category: "general"
    });

    SurveyKo
    .Serializer
    .addProperty("expression", {
        name: "header description:text",
        category: "general"
    });
   


    this.surveyCreator
    .onPropertyValueChanging
    .add(function (sender, options) {
      // console.log(sender);
      // console.log(options);
      // if (options.property.name === 'header'){

      // } else if (options.property.name === 'internal header name'){
        
      // } else if (options.property.name === 'header description'){
        
      // } else if (options.property.name === 'name'){
        
      // } else if (options.property.name === 'title'){
        
      // } else if (options.property.name === 'description'){
        
      // }
    });

    this.surveyCreator
    .onShowingProperty
    .add(function (sender, options) {
      console.log(options.obj.getType());
      console.log(options.property.name);
      console.log(options.property);
        
    });

    var myWhitePropertiesList = ["header", "header description", "internal header name", "visible"]; //the list of properties you want to show
    this.surveyCreator
    .onShowingProperty
    .add(function (sender, options) {
        if (options.obj.getType() == "header") {
          options.canShow = myWhitePropertiesList.indexOf(options.property.name) > -1; 
        }
    });

    this.surveyCreator
    .onQuestionAdded
    .add(function (sender, options) {
      console.log(options);
        if (options.question["internal id"]) {
          options.question["internal id"] = uuidv4();
        }
    });
    this.surveyCreator.onElementAllowOperations.add(function (sender, options) {
      var obj = options.obj;
      if (!obj || !obj.page) return;
      //if it is panel
      console.log(options);
      options.allowAddToToolbox = true;
      options.allowChangeRequired= false;
      options.allowChangeType= false;
      options.allowCopy= true;
      options.allowDelete= true;
      options.allowDragging= true;
      options.allowEdit= true;
      options.allowShowEditor= true;

      //Show/hide "Edit" button for showing modal Question/Panel Editor Window
      //options.allowEdit = false;
      
      //Enable/disable element drag&drop
      //options.allowDragging = false;
      
      //Enable/disable element changing isRequired property
      //options.allowChangeRequired = false
  
      //Enable/disable element changing titleLocation property to hidden/default
      //options.allowShowHideTitle = false
  });
    this.surveyCreator.saveSurveyFunc = this.saveMySurvey;
    this.surveyCreator.tabs().push({
      name: "survey-templates",
      title: "Hieu Tab",
      template: "custom-tab-survey-templates",
      action: () => {
          this.surveyCreator.makeNewViewActive("survey-templates");
      },
      data: {},
    });
    this.surveyCreator.render("surveyCreatorContainer");
    this.surveyCreator.text = assss;

  }
  render() {
    return (<div>
      <div>
      
        <i data-fa-symbol="icon-action-clone" className="fas fa-clone fa-fw"></i>
        <i data-fa-symbol="icon-actiondragelement" className="fas fa-arrows-alt fa-fw"></i>
        <i data-fa-symbol="icon-action-delete" className="fas fa-trash fa-fw"></i>
        <i data-fa-symbol="edit" className="fas fa-pencil fa-fw"></i>
        <i data-fa-symbol="header" className="fas fa-heading fa-fw"></i>
      </div>
      <script type="text/html" id="custom-tab-survey-templates">
        {`<div id="test">TEST</div>`}
      </script>

      <div id="surveyCreatorContainer" />
    </div>);
  }
  saveMySurvey = () => {
    console.log(JSON.stringify(this.surveyCreator.text));
  };
}

export default SurveyCreator;
