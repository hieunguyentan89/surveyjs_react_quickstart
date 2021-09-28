import React, { Component } from 'react';
import * as Survey from 'survey-core';
import * as SurveyReact from 'survey-react-ui';
import * as SurveyCreator from 'survey-creator-react';
import 'survey-core/modern.css';
import 'survey-creator-react/survey-creator-react.css';
import HeaderToolbox from './toolbox/HeaderToolbox';
import CustomQuestionCheckbox from './multicheckbox/CustomQuestionCheckbox';
import { MultiCheckboxToolbox, defineMultiCheckboxCSS } from './toolbox/MultiCheckboxToolbox';
import CustomBooleanCheckbox from './toolbox/properties/CustomBooleanCheckbox';
import CustomItemValueAdorner from './multicheckbox/CustomItemValueAdorner';
import CustomIconSVG from './CustomIconSVG';
import styles from './survey.scss';

class SurveyReactV2 extends Component {
  CLASS_NAME = styles['edit-smart-form-survey'];
  render() {
    HeaderToolbox();
    MultiCheckboxToolbox();
    SurveyReact.ReactQuestionFactory.Instance.registerQuestion(
      'multicheckbox',
      props => React.createElement(CustomQuestionCheckbox, props)
    );

    SurveyReact.ReactQuestionFactory.Instance.registerQuestion(
      'sv-boolean-checkbox',
      props => React.createElement(CustomBooleanCheckbox, props)
    );

    SurveyReact.ReactElementFactory.Instance.registerElement(
      'svc-item-value',
      props => React.createElement(CustomItemValueAdorner, props)
    );
    const creator = new SurveyCreator.SurveyCreator({}, {});
    creator.haveCommercialLicense = true;
    creator.onDefineElementMenuItems.add((sender, options) => {
      let actionDelete;
      let actionClone;
      let actionRequire;
      const internalOptions = options;
      if (internalOptions.obj.startWithNewLine === undefined) {
        return;
      }
      const question = internalOptions.obj;
      // Define a new bar item (action).
      const showhideTitleAction = new Survey.Action({
        id: 'action1',
        css: 'sv-action-bar-item--action-show-hide',
        title: '',
        visibleIndex: 8,
        iconName: question.titleLocation === 'default'
          ? 'icon-eye' : 'icon-eye-slash',
        iconSize: 16,
        action: () => {
          question.titleLocation = question.titleLocation === 'default'
            ? 'hidden' : 'default';
        },
      });

      internalOptions.items.forEach((element) => {
        if (element.id === 'delete') {
          actionDelete = element;
          actionDelete.needSeparator = 0;
          actionDelete.title = '';
          actionDelete.visibleIndex = 14;
          actionDelete.iconName = 'icon-action-delete';
          actionDelete.css = 'sv-action-bar-item--action-delete';
        } else if (element.id === 'duplicate') {
          actionClone = element;
          actionClone.title = '';
          actionClone.visibleIndex = 12;
          actionClone.iconName = 'icon-action-clone';
          actionClone.css = 'sv-action-bar-item--action-clone';
        } else if (element.id === 'isrequired') {
          actionRequire = element;
          actionRequire.title = '';
          actionRequire.iconName = 'icon-asterisk';
          actionRequire.css = 'sv-action-bar-item--action-required';
          actionRequire.visibleIndex = 10;
        }
      });

      internalOptions.items.length = 0;
      internalOptions.items.push(showhideTitleAction);
      internalOptions.items.push(actionRequire);
      internalOptions.items.push(actionClone);
      internalOptions.items.push(actionDelete);

      question.registerFunctionOnPropertyValueChanged(
        'isRequired',
        () => {
          actionRequire.iconName = question.isRequired
            ? 'icon-email' : 'icon-asterisk';
        },
        'isRequiredAdorner'
      );

      question.registerFunctionOnPropertyValueChanged(
        'titleLocation',
        () => {
          showhideTitleAction.iconName = question.titleLocation === 'default'
            ? 'icon-eye' : 'icon-eye-slash';
        },
        ''
      );
    });

    creator.rightContainerActiveItem('toolbox');
    creator.toolbox.clearItems();
    creator.toolbox.addItem({
      name: 'header',
      isCopied: true,
      iconName: 'header',
      title: 'Header',
      json: {
        type: 'header',
      },
    });

    creator.toolbox.addItem({
      name: 'multiselect',
      isCopied: true,
      iconName: 'icon-multi-select',
      title: 'Multi-Select',
      json: {
        type: 'multicheckbox',
      },
    });

    creator.toolbox.addItem({
      name: 'inputtext',
      iconName: 'icon-text1',
      title: 'Text',
      json: {
        type: 'text',
        placeHolder: 'Input Text',
      },
    });

    creator.toolbox.addItem({
      name: 'inputpass',
      isCopied: true,
      iconName: 'icon-password',
      title: 'Password',
      json: {
        type: 'text',
        name: 'q1',
        placeHolder: 'Input Password',
        inputType: 'password',
      },
    });

    creator.toolbox.addItem({
      name: 'inputnumber',
      iconName: 'icon-number',
      title: 'Number',
      json: {
        inputType: 'number',
        type: 'text',
      },
    });

    creator.toolbox.addItem({
      name: 'inputemail',
      iconName: 'icon-email',
      title: 'Email',
      json: {
        type: 'text',
        name: 'q1',
        placeHolder: 'Input Email',
        inputType: 'email',
        validators: [
          {
            type: 'email',
          },
        ],
      },
    });

    creator.onTestSurveyCreated.add((editor, options) => {
      defineMultiCheckboxCSS(options.survey);
    });
    defineMultiCheckboxCSS(creator.survey);

    return (
      <div className={this.CLASS_NAME}>
        <CustomIconSVG />
        <SurveyCreator.SurveyCreatorComponent creator={creator} />
      </div>
    );
  }
}

export default SurveyReactV2;
