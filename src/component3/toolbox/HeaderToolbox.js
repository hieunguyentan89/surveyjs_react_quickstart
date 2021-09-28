import * as Survey from 'survey-core';

const HeaderToolbox = () => {
  const widget = {
    name: 'header',
    title: 'Text with header',
    iconName: '',
    widgetIsLoaded: () => true,
    isFit: question => question.getType() === 'header',

    init() {
      Survey.Serializer.addClass('header', [
        { name: 'name', displayName: 'Internal Header Name', category: 'general', visibleIndex: 0 },
        { name: 'title', displayName: 'Header', category: 'general', visibleIndex: 1 },
        { name: 'description', displayName: 'Header Description', category: 'general', visibleIndex: 2 },
        { name: 'visible', displayName: 'Is this visible header?', default: true, category: 'general' },
      ], null, 'expression');
    },
    isDefaultRender: true,
  };
  Survey.CustomWidgetCollection.Instance.addCustomWidget(widget, 'header');
};

export default HeaderToolbox;
