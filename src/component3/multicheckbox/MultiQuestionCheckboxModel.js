import * as Survey from 'survey-core';

class MultiQuestionCheckboxModel extends Survey.QuestionCheckboxModel {
  getType = () => 'multicheckbox';
}

export default MultiQuestionCheckboxModel;
