import React from 'react';
import * as SurveyCreator from 'survey-creator-react';

class CustomItemValueAdorner extends SurveyCreator.ItemValueAdornerComponent {
  render() {
    this.model.item = this.props.item;
    const classDefine = `svc-item-value-wrapper
      ${(this.model.allowAdd ? ' svc-item-value--new' : '')}
      ${(this.model.isDragging ? ' svc-item-value--dragging' : '')}`;
    return (
      <div
        className={classDefine}
        key={this.props.element.key}
        data-sv-drop-target-item-value={
          this.model.isDraggable ? this.model.item.value : undefined
        }
      >
        {this.getDragDropGhost('top')}
        <div className={'svc-item-value__item'} onClick={e => this.model.select(this.model, e)} role="button" tabIndex="0">
          {this.props.element}
        </div>
        {this.getDragDropGhost('bottom')}
      </div>
    );
  }
}

export default CustomItemValueAdorner;
