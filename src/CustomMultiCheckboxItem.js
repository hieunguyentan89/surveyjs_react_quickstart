import React from "react";
import * as Survey from "survey-core";
import * as SurveyReact from "survey-react-ui";
import * as SurveyCreator from "survey-creator-react";
import CustomStringEdit from "./CustomStringEdit";

class CustomMultiCheckboxItem extends SurveyReact.SurveyQuestionCheckboxItem {
    constructor(props) {
        super(props);
    }

    onDelete(item) {
      const question = item.locOwner;
      if (question.noneItem === item) {
        question.hasNone = false;
      } else if (question.otherItem === item) {
        question.hasOther = false;
      } else if (
        question.getType() === "checkbox" &&
        (question.selectAllItem === item
      )) {
        question.hasSelectAll = false;
      } else {
        var index = question.choices.indexOf(item);
        question.choices.splice(index, 1);
      }
      item.isNew = !question["isItemInList"](item);
    }

    onDrag(item, e) {
      const question = item.locOwner;
      const creator = question.survey.creator;
      creator.dragDropChoices.startDrag(e, item, question);
    }

    isDraggableItem(item) {
      const question = item.locOwner;
      const creator = question.survey.creator;
      if (creator.readOnly) return false;
      return question.choices.indexOf(item) !== -1;
    }

    renderLocString( item, style){
      if (item.locText.renderAs === "svc-string-editor") {
        return React.createElement(CustomStringEdit, {
          locStr: item.locText,
          style: style,
          onDelete: () => this.onDelete(item),
          onDrag: (e) => this.onDrag(item, e),
          isDraggable: this.isDraggableItem(item),
        });
      }

      return SurveyReact.ReactElementFactory.Instance.createElement(item.locText.renderAs, {
        locStr: item.locText,
        style: style,
      });
    }

    renderCheckbox(
      isChecked,
      otherItem
    ) {
      var id = this.question.inputId + "_" + this.index;
      var text = !this.hideCaption ? this.renderLocString(this.item) : "";
      let itemClass = this.question.getItemClass(this.item);
      let labelClass = this.question.getLabelClass(this.item);
      var onItemChanged =
        this.item == this.question.selectAllItem
          ? this.selectAllChanged
          : this.handleOnChange;
  
      var locText = this.item.locText;
      return (
        <div className={itemClass}>
          <label className={labelClass}>
            <input
              className={this.cssClasses.itemControl}
              type="checkbox"
              value={this.item.value}
              id={id}
              style={this.inputStyle}
              disabled={this.isDisplayMode || !this.item.isEnabled}
              checked={isChecked}
              onChange={onItemChanged}
              aria-required={this.question.isRequired}
              aria-label={locText.renderedHtml}
              aria-invalid={this.question.errors.length > 0}
              aria-describedby={
                this.question.errors.length > 0
                  ? this.question.id + "_errors"
                  : null
              }
            />
            <span className={this.cssClasses.materialDecorator}>
              <svg viewBox="0 0 24 24" className={this.cssClasses.itemDecorator}>
                <path d="M5,13l2-2l3,3l7-7l2,2l-9,9L5,13z" />
              </svg>
              <span className="check" />
            </span>
            <span className={this.cssClasses.controlLabel} title={locText.text}>
              {text}
            </span>
          </label>
          {otherItem}
        </div>
      );
    }
}

export default CustomMultiCheckboxItem;
