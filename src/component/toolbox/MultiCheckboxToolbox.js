
import * as Survey from "survey-core";
import * as SurveyReact from "survey-react-ui";
import * as SurveyCreator from "survey-creator-react";
import MultiQuestionCheckboxModel from "../multicheckbox/MultiQuestionCheckboxModel";

export function MultiCheckboxToolbox() {
  const widget = {
    name: "multicheckbox",
    title: "Text with header",
    iconName: "",
    widgetIsLoaded: function () {
      return true; //we do not require anything so we just return true. 
    },
    isFit: (question) => {
      return question.getType() == "multicheckbox";
    },

    init() {
      Survey.Serializer.addClass("multicheckbox", [
      ],
        function () {
          const multiCheckboxModel = new MultiQuestionCheckboxModel("");
          var item1 = new Survey.ItemValue('item1');
          var item2 = new Survey.ItemValue('item2');
          var item3 = new Survey.ItemValue('item3');
          multiCheckboxModel.choices.push(item1);
          multiCheckboxModel.choices.push(item2);
          multiCheckboxModel.choices.push(item3);
          multiCheckboxModel.newValue = item3;
          return multiCheckboxModel;
        }
        , "checkbox");
    },
    //Use this function to create a new class or add new properties or remove unneeded properties from your widget
    //activatedBy tells how your widget has been activated by: property, type or customType
    //property - it means that it will activated if a property of the existing question type is set to particular value, for example inputType = "date" 
    //type - you are changing the behaviour of entire question type. For example render radiogroup question differently, have a fancy radio buttons
    //customType - you are creating a new type, like in our example "textwithbutton"
    activatedByChanged: function (activatedBy) {
      // Survey.Serializer.removeProperty("multicheckbox", "hasComment");
      // Survey.Serializer.findProperty("multicheckbox", "title").displayName = "Question";
      // Survey.Serializer.findProperty("multicheckbox", "description").displayName = "Question Description";
      //we do not need to check acticatedBy parameter, since we will use our widget for customType only
      //We are creating a new class and derived it from text question type. It means that text model (properties and fuctions) will be available to us
      // SurveyKo.JsonObject.metaData.addClass("header", [], null, "expression");
      //signaturepad is derived from "empty" class - basic question class
      //Survey.JsonObject.metaData.addClass("signaturepad", [], null, "empty");

      //Add new property(s)
      //For more information go to https://surveyjs.io/Examples/Builder/?id=addproperties#content-docs
      // SurveyKo.JsonObject.metaData.addProperties("header", [
      //     { name: "internal header name", category: "general" , visibleIndex: 0},
      //     { name: "header", category: "general", visibleIndex: 1 },
      //     { name: "header description", category: "general", visibleIndex: 2},
      // ]);

    },
    //If you want to use the default question rendering then set this property to true. We do not need any default rendering, we will use our our htmlTemplate
    isDefaultRender: true,
    //You should use it if your set the isDefaultRender to false
    htmlTemplate: "<div><input/><input/><input/></div>",
    //The main function, rendering and two-way binding
    afterRender: function (question, el) {
      //el is our root element in htmlTemplate, is "div" in our case
      //get the text element
    },
    //Use it to destroy the widget. It is typically needed by jQuery widgets
    willUnmount: function (question, el) {
      //We do not need to clear anything in our simple example
      //Here is the example to destroy the image picker
      //var $el = $(el).find("select");
      //$el.data('picker').destroy();
    }
  };
  Survey.CustomWidgetCollection.Instance.addCustomWidget(widget, "multicheckbox");
}

export function defineMultiCheckboxCSS(survey) {
  survey.onUpdateQuestionCssClasses
    .add(function (survey, options) {
      var classes = options.cssClasses
      if (options.question.getType() === "multicheckbox") {
        classes.root = "sd-selectbase";
        classes.item = "sd-item sd-checkbox sd-selectbase__item";
        classes.itemSelectAll = "sd-checkbox--selectall";
        classes.itemNone = "sd-checkbox--none";
        classes.itemDisabled = "sd-item--disabled sd-checkbox--disabled";
        classes.itemChecked = "sd-item--checked sd-checkbox--checked";
        classes.itemHover = "sd-item--allowhover sd-checkbox--allowhover";
        classes.itemInline = "sd-selectbase__item--inline";
        classes.label = "sd-selectbase__label";
        classes.labelChecked = "";
        classes.itemControl = "sd-visuallyhidden sd-item__control sd-checkbox__control";
        classes.itemDecorator = "sd-item__svg sd-checkbox__svg";
        classes.controlLabel = "sd-item__control-label";
        classes.materialDecorator = "sd-item__decorator sd-checkbox__decorator";
        classes.other = "sd-comment sd-question__other";
        classes.column = "sd-selectbase__column";
      }
    });
}