import React from 'react';
import * as SurveyReact from 'survey-react-ui';

class CustomBooleanCheckbox extends SurveyReact.SurveyQuestionBooleanCheckbox {
  onClick = () => {
    this.handleOnClick();
  }
  renderElement() {
    const question = this.props.question;
    return (
      <div className={'sd-toggle-custom'}>
        <span className={'toggle-title-custom'}>
          {question.locDisplayLabel.text}
        </span>
        <label htmlFor={this.question.inputId} className={'sd-boolean-custom'} role="presentation" onClick={this.onClick}>
          <div className="switch">
            <input
              ref={this.checkRef}
              name="toggle"
              type="checkbox"
              value={
                this.question.checkedValue === null
                  ? ''
                  : this.question.checkedValue
              }
              id={this.question.inputId}
              className={'sd-boolean__control sd-visuallyhidden'}
              disabled={this.isDisplayMode}
              checked={this.question.checkedValue || false}
              onChange={this.handleOnChange}
              aria-label={this.question.locTitle.renderedHtml}
              aria-invalid={this.question.errors.length > 0}
              aria-describedby={
                this.question.errors.length > 0
                  ? `${this.question.id}'_errors'`
                  : null
              }
            />
            <div className="slidercontainer">
              <div className="ballslider" />
              { question.checkedValue ?
                <div className="active-text">{'Yes'}</div>
                : <div className="inactive-text">{'No'}</div>
              }
            </div>
          </div>
        </label>
      </div>
    );
  }
}

export default CustomBooleanCheckbox;
