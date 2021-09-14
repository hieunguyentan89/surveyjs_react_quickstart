
import * as Survey from "survey-core";

export function HeaderToolbox() {
        const widget =  {
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
            isFit: (question) => {
              return question.getType() == "header";
            },

            init() {
              //Register a new type using the empty question as the base.
              // Survey.Serializer.addClass("header", [], null, "expression");
              Survey.Serializer.addClass("header", [
                { name: "name", displayName: "Internal Header Name", category: "general" , visibleIndex: 0},
                { name: "title",displayName :"Header", category: "general", visibleIndex: 1 },
                { name: "description", displayName: "Header Description", category: "general", visibleIndex: 2},
                { name: "visible", displayName: "Is this visible header?", default: true, category: "general"},
              ], null, "expression");
            },
            //Use this function to create a new class or add new properties or remove unneeded properties from your widget
            //activatedBy tells how your widget has been activated by: property, type or customType
            //property - it means that it will activated if a property of the existing question type is set to particular value, for example inputType = "date" 
            //type - you are changing the behaviour of entire question type. For example render radiogroup question differently, have a fancy radio buttons
            //customType - you are creating a new type, like in our example "textwithbutton"
            activatedByChanged: function (activatedBy) {
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
          Survey.CustomWidgetCollection.Instance.addCustomWidget(widget, "header");
}