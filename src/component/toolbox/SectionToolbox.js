
import * as Survey from "survey-core";

export function SectionToolbox() {
    const widget =  {
        name: "section",
        title: "Text with section",
        iconName: "",
        placeholderText: "abc",
        widgetIsLoaded: function () {
            return true;
        },
        isFit: (question) => {
            return question.getType() === "section";
        },
        init() {
            //Register a new type using the empty question as the base.
            // Survey.Serializer.addClass("header", [], null, "expression");
            Survey.Serializer.addClass("section", 
            [],
            function() {
                return new Survey.PanelModel("");
            }
            , "panel");
            // Rename property
            Survey.Serializer.findProperty("section", "name").displayName = "Internal Section Name";
            Survey.Serializer.findProperty("section", "title").displayName = "Section Name";
            // Set require for property
            Survey.Serializer.findProperty("section", "name").isRequired = true;
            // Log all properties of section
            console.log("Survey.Serializer.getProperties", Survey.Serializer.getProperties("section"));
            // Set max length for property
            Survey.Serializer.findProperty("section", "description").maxLength = 160;

        },
        activatedByChanged: function (activatedBy) {},
        //If you want to use the default question rendering then set this property to true. We do not need any default rendering, we will use our our htmlTemplate
        isDefaultRender: true,
        //You should use it if your set the isDefaultRender to false
        htmlTemplate: "<div><input/><input/><input/></div>",
        //The main function, rendering and two-way binding
        afterRender: function (question, el) {},
        //Use it to destroy the widget. It is typically needed by jQuery widgets
        willUnmount: function (question, el) {}
    };
    Survey.CustomWidgetCollection.Instance.addCustomWidget(widget, "section");
}
