import React from "react";
import * as Survey from "survey-core";
import * as SurveyReact from "survey-react-ui";
import * as SurveyCreator from "survey-creator-react";
import MultiQuestionCheckboxModel from "./multicheckbox/MultiQuestionCheckboxModel";

class CustomPropertyGrid extends SurveyCreator.PropertyGridComponent {
    toolbar = new Survey.AdaptiveActionContainer();
    constructor(props) {
        super(props);
        this.state = {displaytitle: '', objSelected: null};
        console.log(props);
        props.model.onSelectedElementChanged.add((sender, options) => {
            console.log(options);
            const newSelect = options.newSelectedElement;
            if (newSelect instanceof Survey.QuestionExpressionModel){
                this.setState({displaytitle: 'Header Setting', objSelected: newSelect});
            } else if (newSelect instanceof MultiQuestionCheckboxModel){
                this.setState({displaytitle: 'Content Setting', objSelected: newSelect});
            } else if (newSelect instanceof Survey.QuestionTextModel) {
                this.setState({displaytitle: 'Text Setting', objSelected: newSelect});
            }
        });
        this.toolbar.actions.push(
            new Survey.Action({
              id: "svd-grid-clone",
              iconName: "icon-action-clone",
              component: "sv-action-bar-item",
              title: '',
              showTitle: false,
              action: () => {
                this.visible = false;
                console.log(this.state.objSelected);
                if (this.state.objSelected) {
                  const creator = this.state.objSelected.survey.creator;
                  var newElement = creator.fastCopyQuestion(this.state.objSelected);
                  creator.selectElement(newElement);
                }
                
              }
            })
          );

          this.toolbar.actions.push(
            new Survey.Action({
              id: "svd-grid-delete",
              iconName: "icon-action-delete",
              component: "sv-action-bar-item",
              title: '',
              showTitle: false,
              action: () => {
                this.visible = false;
                console.log(this.state.objSelected);
                if (this.state.objSelected) {
                  const creator = this.state.objSelected.survey.creator;
                  creator.deleteElement(this.state.objSelected);
                }
                
              }
            })
          );
    }

    renderElement() {
        console.log(this.toolbar);
        const style = { display: !this.model.visible ? "none" : "" };
        return (
          <div className="svc-flex-column svc-properties-wrapper">
            <div ref={this.containerRef} style={style} className="svc-property-panel">
              <div className="svc-property-panel__header">
                <div className="svc-property-panel__title">
                    <div className="spg_title">
                        {this.state.displaytitle}
                    </div>
                </div>
                <div className="svc-property-panel__actions">
                  <SurveyReact.SurveyActionBar model={this.toolbar}></SurveyReact.SurveyActionBar>
                </div>
              </div>
              <div className="svc-property-panel__expander">
                <SurveyReact.Survey model={this.model.survey}></SurveyReact.Survey>
              </div>
            </div>
          </div>
        );
      }
}

export default CustomPropertyGrid;
