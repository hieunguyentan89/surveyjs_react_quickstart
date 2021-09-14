import React from "react";
import * as Survey from "survey-core";
import * as SurveyReact from "survey-react-ui";
import * as SurveyCreator from "survey-creator-react";

class CustomBooleanCheckbox extends SurveyReact.SurveyQuestionBooleanCheckbox {
    constructor(props) {
        super(props);
    }

    renderElement() {
      const question = this.props.question;
      const cssClasses = question.cssClasses;
      const itemClass = question.getItemCss();
      return (
        <div className={"sd-toggle-custom"}>
          <span className={"toggle-title-custom"}>
            {question.locDisplayLabel.text}
          </span>
          <label className={"sd-boolean-custom"} onClick={this.handleOnClick}>
          <div className="switch">
          <input
              ref={this.checkRef}
              name="toggle"
              type="checkbox"
              value={
                this.question.checkedValue === null
                  ? ""
                  : this.question.checkedValue
              }
              id={this.question.inputId}
              className={"sd-boolean__control sd-visuallyhidden"}
              disabled={this.isDisplayMode}
              checked={this.question.checkedValue || false}
              onChange={this.handleOnChange}
              aria-label={this.question.locTitle.renderedHtml}
              aria-invalid={this.question.errors.length > 0}
              aria-describedby={
                this.question.errors.length > 0
                  ? this.question.id + "_errors"
                  : null
              }
            />
            <div className="slidercontainer">
              <div className="ballslider"></div>
              { question.checkedValue ?
                  <div className="active-text">Yes</div>
                  : <div className="inactive-text">No</div>
              }
            </div>
            
          </div>
          
        </label>
        </div>
      );
    }
}

export default CustomBooleanCheckbox;
