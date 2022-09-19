class QuestionInfo{
    setFromJSON(json){
        this.questionName = json["question_name"]
        this.indicatorName = json["indicator_name"]
        this.questionIN = json["question_in"]
        this.questionEN = json["question_en"]
    }
}

export default QuestionInfo