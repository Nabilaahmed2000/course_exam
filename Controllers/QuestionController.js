const mongoose = require("mongoose");
require("../Models/QuestionModel");
const questionsSchema = mongoose.model("Question");
const chapterSchema = mongoose.model("Chapter");


//get all questions
exports.getAllQuestions = async (request, response, next) => {
    const questions = await questionsSchema
        .find({})
        .then((data) => {
        response.status(200).json({ data });
        })
        .catch((error) => next(error));
    };

//get question using param
exports.getQuestion = (request, response, next) => {
    questionsSchema
        .findOne({ _id: request.params.id })
        .then((data) => {
        if (data) response.status(200).json({ data });
        else throw new Error("question not found");
        })
        .catch((error) => next(error));
    }


//   add question
exports.addQuestion = (request, response, next) => {
    questionsSchema
        .find({ chapterID: request.params.id })
        .then((data) => {
            if(data.length<12){
                new questionsSchema({
                    _id: request.body.id,
                    chapterID: request.body.chapterID,
                    difficultyLevel: request.body.difficultyLevel,
                    objective: request.body.objective,
                    questionText: request.body.questionText,
                    choice1: request.body.choice1,
                    choice2: request.body.choice2,
                    choice3: request.body.choice3,
                    correctAnswer: request.body.correctAnswer
                })
                    .save()
                    .then((data) => {
                        response.status(201).json({ data });
                    })
                    .catch((error) => next(error));
            }
            else{
                throw new Error("You can't add more than 12 questions");
            }
           
        }).catch((error) => next(error));
    }

//delete question using param
exports.deleteQuestion = (request, response, next) => {
    questionsSchema
        .findOneAndDelete({ _id: request.params.id })
        .then((data) => {
        if (data) response.status(200).json({ data });
        else throw new Error("question not found");
        })
        .catch((error) => next(error));
    };


//update question using param
exports.updateQuestion = (request, response, next) => {
    questionsSchema
        .findOneAndUpdate({ _id: request.params.id }, request.body, {
        new: true,
        })
        .then((data) => {
        if (data) response.status(200).json({ data });
        else throw new Error("question not found");
        })
        .catch((error) => next(error));
    };

//get question in specific chapter
exports.getQuestionInChapter = (request, response, next) => {
    questionsSchema
        .find({ chapterID: request.params.id })
        .then((data) => {
        if (data) response.status(200).json({ data });
        else throw new Error("Chapter not found");
        })
        .catch((error) => next(error));
    }
    exports.getQuestionNum = (request, response, next) => {
    questionsSchema
        .find({ chapterID: request.params.id })
        .then((data) => {
            const questionNum = data.length;
        if (data.length>0) response.status(200).json({ questionNum });
        else throw new Error("No questions found");
        })
        .catch((error) => next(error));
    }






