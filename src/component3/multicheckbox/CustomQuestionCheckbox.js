import React from 'react';
import * as Survey from 'survey-core';
import * as SurveyReact from 'survey-react-ui';
import * as SurveyCreator from 'survey-creator-react';
import CustomMultiCheckboxItem from './CustomMultiCheckboxItem';

class CustomQuestionCheckbox extends SurveyReact.SurveyQuestionCheckbox {
  constructor(props) {
    super(props);
    this.question.setCanShowOptionItemCallback(() => false);
  }

  onAddSelectAll = (el) => {
    const question = el.props.question;
    const isNew = !question.isItemInList(question.selectAllItem);
    if (isNew) {
      question.hasSelectAll = true;
    }
  }
  onAddNone = (el) => {
    const question = el.props.question;
    const isNew = !question.isItemInList(question.noneItem);
    if (isNew) {
      question.hasNone = true;
    }
  }
  onAddOther = (el) => {
    const question = el.props.question;
    const isNew = !question.isItemInList(question.otherItem);
    if (isNew) {
      question.hasOther = true;
    }
  }
  onAddItem = (el) => {
    const question = el.props.question;
    const nextValue1 = el.props.creator.getNextItemValue(question);
    const newValue = new Survey.ItemValue(nextValue1);
    question.choices.push(newValue);
    question.newItemValue.value = nextValue1;
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
    return !wrappedItem ? renderedItem : wrappedItem;
  }

  renderElement() {
    const question = this.props.question;
    const cssClasses = question.cssClasses;
    return (
      <fieldset
        className={cssClasses.root}
        ref={(fieldset) => { this.control = fieldset; }}
      >

        <legend aria-label={question.locTitle.renderedHtml} />
        {this.question.hasColumns
          ? this.getColumns(cssClasses)
          : this.getItems(cssClasses)}
        {question.survey instanceof SurveyCreator.DesignTimeSurveyModel &&
          <div className="svc-flex-row-custom">
            <span role="button" tabIndex="0" className="multicheck-button-add" onClick={() => this.onAddItem(this)}>Add Item</span>
            <span role="button" tabIndex="-1" disabled={question.hasOther} className="multicheck-button-add" onClick={() => this.onAddOther(this)}>{"Add 'Other'"}</span>
            <span role="button" tabIndex="-2" disabled={question.hasNone} className="multicheck-button-add" onClick={() => this.onAddNone(this)}>{"Add 'None'"}</span>
            <span role="button" tabIndex="-3" disabled={question.hasSelectAll} className="multicheck-button-add" onClick={() => this.onAddSelectAll(this)}>{"Add 'Select All'"}</span>
          </div>
        }

      </fieldset>
    );
  }
}

export default CustomQuestionCheckbox;
