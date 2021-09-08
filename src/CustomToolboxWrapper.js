import React from "react";
import * as SurveyReact from "survey-react-ui";
import * as SurveyCreator from "survey-creator-react";

class CustomToolboxWrapper extends React.Component {
    constructor(props) {
      super(props);
      this.state = { collapsed: false };
    }
    toggle() {
      this.setState({ collapsed: !this.state.collapsed });
    }
    render() {
      return (
        <div style={{ position: "relative", height: "100%" }}>
          <div
            style={{
              position: "absolute",
              left: "100%",
              top: 0,
              padding: "16px",
              cursor: "pointer"
            }}
            title={this.state.collapsed ? "Show toolbox" : "Hide toolbox"}
            onClick={() => this.toggle()}
          >
            {this.state.collapsed ? ">>" : "<<"}
          </div>
          {this.state.collapsed ? null : (
            <SurveyCreator.SurveyCreatorToolbox
              creator={this.props.creator}
            ></SurveyCreator.SurveyCreatorToolbox>
          )}
        </div>
      );
    }
  }

  export default CustomToolboxWrapper;