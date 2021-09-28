import React from "react";
import * as Survey from "survey-core";
import * as SurveyReact from "survey-react-ui";
import * as SurveyCreator from "survey-creator-react";

class CustomQuestionText extends SurveyReact.SurveyQuestionText {
  constructor(props) {
    super(props);
    console.log(props);
  }
  renderElement() {
    const inputClass = this.question.getControlClass();
    console.log(this.question);
    var onKeyDown = null;
    var onKeyUp = null;
    var onCompositionUpdate = null;
    if (this.question.isInputTextUpdate) {
      onKeyDown = (e) => (this._isWaitingForEnter = e.keyCode === 229);
      onKeyUp = (e) => {
        if (!this._isWaitingForEnter || e.keyCode === 13) {
          this.updateValueOnEvent(e);
          this._isWaitingForEnter = false;
        }
      };
      onCompositionUpdate = (e) => {
        e.persist();
        setTimeout(() => {
          this.updateValueOnEvent(e);
        }, 1);
      };
    }
    var onChange = (e) => {
      if (e.target === document.activeElement) {
        if (this.question.isInputTextUpdate) {
          this.updateValueOnEvent(e);
        }
      } else {
        this.updateValueOnEvent(e);
      }
    };
    debugger;
    var placeHolder = 'aaaaaaaaaaaaaaaaa';
    // var dataList = this.renderDataList();
    return (
      <React.Fragment>
        <input
          id={this.question.inputId}
          disabled={this.isDisplayMode}
          className={inputClass}
          type={this.question.inputType}
          //ref={this.controlRef}
          ref={(input) => (this.control = input)}
          style={this.question.inputStyle}
          maxLength={this.question.getMaxLength()}
          min={this.question.renderedMin}
          max={this.question.renderedMax}
          step={this.question.renderedStep}
          size={this.question.inputSize}
          placeholder={placeHolder}
          list={this.question.dataListId}
          autoComplete={this.question.autoComplete}
          onBlur={this.updateValueOnEvent}
          onChange={onChange}
          onKeyUp={onKeyUp}
          onKeyDown={onKeyDown}
          onCompositionUpdate={onCompositionUpdate}
          aria-required={this.question.ariaRequired}
          aria-label={this.question.ariaLabel}
          aria-invalid={this.question.ariaInvalid}
          aria-describedby={this.question.ariaDescribedBy}
        />
        {/* {dataList} */}
      </React.Fragment>
    );
  }
}

export default CustomQuestionText;
