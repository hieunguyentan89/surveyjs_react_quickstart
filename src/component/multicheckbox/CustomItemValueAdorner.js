import React from "react";
import * as Survey from "survey-core";
import * as SurveyReact from "survey-react-ui";
import * as SurveyCreator from "survey-creator-react";

class CustomItemValueAdorner extends SurveyCreator.ItemValueAdornerComponent {
    constructor(props) {
        super(props);
    }

    render() {
      this.model.item = this.props.item;
      return (
        <div
          className={
            "svc-item-value-wrapper" +
            (this.model.allowAdd ? " svc-item-value--new" : "") +
            (this.model.isDragging ? " svc-item-value--dragging" : "")
          }
          key={this.props.element.key}
          data-sv-drop-target-item-value={
            this.model.isDraggable ? this.model.item.value : undefined
          }
        >
          {this.getDragDropGhost("top")}
          <div className={"svc-item-value__item"} onClick={(event) => this.model.select(this.model, event)}>
            {this.props.element}
          </div>
          {this.getDragDropGhost("bottom")}
        </div>
      );
    }
}

export default CustomItemValueAdorner;
