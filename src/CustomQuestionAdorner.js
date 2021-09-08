import React from "react";
import * as SurveyReact from "survey-react-ui";
import * as SurveyCreator from "survey-creator-react";

class CustomQuestionAdorner extends SurveyCreator.QuestionAdornerComponent {
    constructor(props) {
        super(props);
    }
    toggleHovered(e: MouseEvent, element: HTMLElement) {
        const processedFlagName = "__svc_question_processed";
        const name = "svc-hovered";
        if (!e[processedFlagName] && e.type === "mouseover") {
          const arr = element.className.split(" ");
          if (arr.indexOf(name) == -1) {
            element.className += " " + name;
          }
          e[processedFlagName] = true;
        } else {
          element.className = element.className.replace(" svc-hovered", "");
        }
      }
    renderElement() {
        const allowInteractions = this.model.surveyElement
          .isInteractiveDesignElement;
        const content = this.renderContent(allowInteractions);
        return (
          <React.Fragment>
            <div
              data-sv-drop-target-survey-element={this.model.surveyElement.name}
              ref={this.rootRef}
              className={"svc-question__adorner"}
              onMouseOut={(e) =>
                allowInteractions && this.toggleHovered(e.nativeEvent, e.currentTarget)
              }
              onMouseOver={(e) =>
                allowInteractions && this.toggleHovered(e.nativeEvent, e.currentTarget)
              }
            >
              {content}
            </div>
            <div className="svc-question__content-actions">
              <SurveyReact.SurveyActionBar model={this.model.actionContainer}></SurveyReact.SurveyActionBar>
            </div>
          </React.Fragment>
        );
      }
      renderContent(allowInteractions) {
        var content = this.renderElementContent();
        if (!allowInteractions) return content;
        return SurveyReact.attachKey2click(
          <div
            className={"svc-question__content " + this.model.css()}
            onClick={(e) => this.model.select(this.model, new SurveyCreator.ReactMouseEvent(e))}
          >
            {this.renderContentOnTop()}
            {this.renderDragAria()}
            {content}
          </div>
        );
      }
}

export default CustomQuestionAdorner;