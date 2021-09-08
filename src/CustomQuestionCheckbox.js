import React from "react";
import * as Survey from "survey-core";
import * as SurveyReact from "survey-react-ui";
import * as SurveyCreator from "survey-creator-react";

class CustomQuestionCheckbox extends SurveyReact.SurveyQuestionCheckbox {
    constructor(props) {
        super(props);
    }

    onclick(el) {

      const question = el.props.question;
      const isNew = !question.isItemInList(question.newItemValue);
      if (isNew) {
        const nextValue1 = el.props.creator.getNextItemValue(question);
        const newValue = new Survey.ItemValue(nextValue1);

        question.choices.push(newValue);
        const nextValue = el.props.creator.getNextItemValue(question);

        question.newItemValue.value = nextValue;
      }
      console.log(el);
    }

    renderElement() {

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
          <button onClick={() => this.onclick(this)}>Add Item</button>
        </fieldset>
      );
    }
}

export default CustomQuestionCheckbox;
