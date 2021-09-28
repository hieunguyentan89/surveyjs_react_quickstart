import * as Survey from "survey-core"

class MultiQuestionCheckboxModel extends Survey.QuestionCheckboxModel {
    constructor(name) {
        super(name);
    }

    getType() {
        return "multicheckbox";
        // return "checkbox";
    }
    
    visible() {
        return this.isDesignMode || super.visible;
    }
}

export default MultiQuestionCheckboxModel;