
import * as Survey from 'survey-core';
import MultiQuestionCheckboxModel from '../multicheckbox/MultiQuestionCheckboxModel';

export const MultiCheckboxToolbox = () => {
  const widget = {
    name: 'multicheckbox',
    title: 'Text with multicheckbox',
    iconName: '',
    widgetIsLoaded: () => true,
    isFit: question => question.getType() === 'multicheckbox',
    init() {
      Survey.Serializer.addClass('multicheckbox', [
        { name: 'name', displayName: 'Internal Field Name', category: 'general', visibleIndex: 0 },
        { name: 'title', displayName: 'Field Name', category: 'general', visibleIndex: 1 },
        { name: 'description', displayName: 'Field Description', category: 'general', visibleIndex: 2 },
        { name: 'visible', displayName: 'Is this field visible?', default: true, category: 'general' },
        { name: 'isRequired', displayName: 'Is this field required?', default: false, category: 'general' },
        { name: 'readOnly', displayName: 'Is this field read only?', default: false, category: 'general' },
        { name: 'hasComment', displayName: 'Are comments allowed?', default: false, category: 'general' },
      ],
      () => {
        const multiCheckboxModel = new MultiQuestionCheckboxModel('');
        const item1 = new Survey.ItemValue('item1');
        const item2 = new Survey.ItemValue('item2');
        const item3 = new Survey.ItemValue('item3');
        multiCheckboxModel.choices.push(item1);
        multiCheckboxModel.choices.push(item2);
        multiCheckboxModel.choices.push(item3);
        multiCheckboxModel.newValue = item3;
        return multiCheckboxModel;
      }, 'checkbox');
    },
    isDefaultRender: true,
  };
  Survey.CustomWidgetCollection.Instance.addCustomWidget(widget, 'multicheckbox');
};

export const defineMultiCheckboxCSS = (survey) => {
  survey.onUpdateQuestionCssClasses
    .add((_, options) => {
      const classes = options.cssClasses;
      if (options.question.getType() === 'multicheckbox') {
        classes.root = 'sd-selectbase';
        classes.item = 'sd-item sd-checkbox sd-selectbase__item';
        classes.itemSelectAll = 'sd-checkbox--selectall';
        classes.itemNone = 'sd-checkbox--none';
        classes.itemDisabled = 'sd-item--disabled sd-checkbox--disabled';
        classes.itemChecked = 'sd-item--checked sd-checkbox--checked';
        classes.itemHover = 'sd-item--allowhover sd-checkbox--allowhover';
        classes.itemInline = 'sd-selectbase__item--inline';
        classes.label = 'sd-selectbase__label';
        classes.labelChecked = '';
        classes.itemControl = 'sd-visuallyhidden sd-item__control sd-checkbox__control';
        classes.itemDecorator = 'sd-item__svg sd-checkbox__svg';
        classes.controlLabel = 'sd-item__control-label';
        classes.materialDecorator = 'sd-item__decorator sd-checkbox__decorator';
        classes.other = 'sd-comment sd-question__other';
        classes.column = 'sd-selectbase__column';
      }
    });
};

