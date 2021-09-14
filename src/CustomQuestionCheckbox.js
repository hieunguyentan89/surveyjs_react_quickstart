import React from "react";
import * as Survey from "survey-core";
import * as SurveyReact from "survey-react-ui";
import * as SurveyCreator from "survey-creator-react";
import CustomMultiCheckboxItem from "./CustomMultiCheckboxItem";

class CustomQuestionCheckbox extends SurveyReact.SurveyQuestionCheckbox {
  constructor(props) {
    super(props);
  }

  onAddSelectAll(el) {
    const question = el.props.question;
    const isNew = !question.isItemInList(question.selectAllItem);
    if (isNew) {
      question.hasSelectAll = true;
    }
  }
  onAddNone(el) {
    const question = el.props.question;
    const isNew = !question.isItemInList(question.noneItem);
    if (isNew) {
      question.hasNone = true;
    }
  }
  onAddOther(el) {
    const question = el.props.question;
    const isNew = !question.isItemInList(question.otherItem);
    if (isNew) {
      question.hasOther = true;
    }
  }
  onAddItem(el) {
    const question = el.props.question;
    const isNew = !question.isItemInList(question.newItemValue);
    if (isNew) {
      const nextValue1 = el.props.creator.getNextItemValue(question);
      const newValue = new Survey.ItemValue(nextValue1);

      question.choices.push(newValue);
      const nextValue = el.props.creator.getNextItemValue(question);

      question.newItemValue.value = nextValue;
    }
  }

  renderItem(
    key,
    item,
    isFirst,
    cssClasses,
    index
  ) {
    const renderedItem = (
      <CustomMultiCheckboxItem
        key={key}
        question={this.question}
        cssClasses={cssClasses}
        isDisplayMode={this.isDisplayMode}
        item={item}
        textStyle={this.textStyle}
        isFirst={isFirst}
        index={index}
      />
    );
    const survey = this.question.survey;
    let wrappedItem = null;
    if (survey instanceof SurveyReact.Model) {
      wrappedItem = survey.wrapItemValue(renderedItem, this.question, item);
    }
    return wrappedItem ? wrappedItem : renderedItem;
  }

  renderElement() {

    const question = this.props.question;
    // console.log(this.props);
    var cssClasses = question.cssClasses;
    return (
      <fieldset
        className={cssClasses.root}
        ref={(fieldset) => (this.control = fieldset)}
      >

        <legend aria-label={question.locTitle.renderedHtml} />
        { this.question.hasColumns
          ? this.getColumns(cssClasses)
          : this.getItems(cssClasses)}
        { question.survey instanceof SurveyCreator.DesignTimeSurveyModel &&
          <div className="svc-flex-row-custom">
            <span className="multicheck-button-add" onClick={() => this.onAddItem(this)}>Add Item</span>
            <span className="multicheck-button-add" onClick={() => this.onAddOther(this)}>Add 'Other'</span>
            <span className="multicheck-button-add" onClick={() => this.onAddNone(this)}>Add 'None'</span>
            <span className="multicheck-button-add" onClick={() => this.onAddSelectAll(this)}>Add 'Select All'</span>
          </div>
        }

      </fieldset>
    );
  }
}

export default CustomQuestionCheckbox;
