import * as Survey from "survey-core"

class MultiQuestionCheckboxModel extends Survey.QuestionCheckboxModel {
    constructor(name) {
        super(name);
    }

    getType() {
        return "multicheckbox";
    }
}

export default MultiQuestionCheckboxModel;