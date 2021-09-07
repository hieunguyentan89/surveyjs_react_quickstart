import React from "react";
import * as SurveyReact from "survey-react-ui";
import * as SurveyCreator from "survey-creator-react";

class CustomDesignerTab extends SurveyCreator.TabDesignerComponent {
    constructor(props) {
        super(props);
    }
    renderElement() {
        const survey = this.creator.survey;
        const designerTabClassName = "svc-tab-designer " + survey.css.root;

        return (
            <React.Fragment>
                
                <div className={designerTabClassName}>
                    {/* <SurveyReact.SurveyActionBar model={this.creator.toolbar} /> */}
                    <div className={survey.css.container}>
                        
                        <SurveyCreator.SurveyNavigation survey={survey} location="top" />
                        {this.renderPages()}
                        <SurveyCreator.SurveyNavigation survey={survey} location="bottom" css={survey.css} />
                    </div>
                </div>
                <div className="svc-flex-column">
                    {SurveyReact.ReactElementFactory.Instance.createElement('svc-toolbox', { creator: this.creator })}
                    {SurveyReact.ReactElementFactory.Instance.createElement('svc-property-grid', { model: this.creator })}
                </div>
                
            </React.Fragment>
        );
    }
}

SurveyReact.ReactElementFactory.Instance.registerElement(
    "svc-tab-designer",
    (props) => {
        return React.createElement(CustomDesignerTab, props);
    }
);

class CustomCreator extends SurveyCreator.SurveyCreatorComponent {
    constructor(props) {
        super(props);
    }
    renderElement() {
        const creator = this.props.creator;
        return (
            <div className="svc-creator">
                <div className="svc-creator__area svc-flex-column">
                    <div className="svc-creator__content-wrapper svc-flex-row">
                        <div className="svc-creator__content-holder svc-flex-column">
                            {this.renderActiveTab()}
                        </div>
                    </div>
                    <SurveyCreator.NotifierComponent
                        creator={creator}
                        notifier={creator.notifier}
                    />
                </div>
            </div>
        );
    }
}

export default CustomCreator;