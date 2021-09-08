import React from "react";
import * as Survey from "survey-core";
import * as SurveyReact from "survey-react-ui";
import * as SurveyCreator from "survey-creator-react";

class CustomQuestionCheckbox extends SurveyReact.SurveyQuestionCheckbox {
    constructor(props) {
        super(props);
    }

    onclick(el) {
      // const question = el.question;
      // const itemValue = question.creator.createNewItemValue(question);
      // question.choices.push(itemValue);
    }

    renderElement() {
      console.log(this.props);
      const question = this.props.question;
      var cssClasses = question.cssClasses;
      return (
        <fieldset
          className={cssClasses.root}
          ref={(fieldset) => (this.control = fieldset)}
        >
          
          <legend aria-label={question.locTitle.renderedHtml} />
          {this.question.hasColumns
            ? this.getColumns(cssClasses)
            : this.getItems(cssClasses)}
          <button onClick={this.onclick(this)}>Add Item</button>
        </fieldset>
      );
    }
}

export default CustomQuestionCheckbox;