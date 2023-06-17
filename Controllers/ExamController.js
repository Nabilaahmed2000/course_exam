const mongoose = require("mongoose");
require("../Models/CourseModel");
require("../Models/ChapterModel");
require("../Models/QuestionModel");
require("../Models/ExamModel");
const Course = mongoose.model("Course");
const Chapter = mongoose.model("Chapter");
const Question = mongoose.model("Question");
const Exam = mongoose.model("Exam");

// const generateExam = async (req, res) => {
//   const { numberOfQuestionsPerChapter, totalNumberOfQuestions, difficultyLevels, objectives } = req.body;

//   // Fetch all questions from the database
//   const allQuestions = await Question.find({}).lean();

//   // Define the fitness function
//   const fitness = (exam) => {
//     let score = 0;

//     // Calculate the fitness score based on the teacher's requirements
//     const chapterCounts = {};
//     const difficultyCounts = {};
//     const objectiveCounts = {};

//     exam.forEach((question) => {
//       chapterCounts[question.chapterID] = (chapterCounts[question.chapterID] || 0) + 1;
//       difficultyCounts[question.difficultyLevel] = (difficultyCounts[question.difficultyLevel] || 0) + 1;
//       objectiveCounts[question.objective] = (objectiveCounts[question.objective] || 0) + 1;
//     });

//     // Check if the exam meets the requirements for each chapter, difficulty level, and objective
//     for (const chapterID in numberOfQuestionsPerChapter) {
//       if (chapterCounts[chapterID] === numberOfQuestionsPerChapter[chapterID]) {
//         score++;
//       }
//     }

//     for (const difficultyLevel in difficultyLevels) {
//       if (difficultyCounts[difficultyLevel] === difficultyLevels[difficultyLevel]) {
//         score++;
//       }
//     }

//     for (const objective in objectives) {
//       if (objectiveCounts[objective] === objectives[objective]) {
//         score++;
//       }
//     }

//     return score;
//   };

//   // Create the initial population
//   const createInitialPopulation = (size) => {
//     const population = [];

//     for (let i = 0; i < size; i++) {
//       const exam = [];

//       for (let j = 0; j < totalNumberOfQuestions; j++) {
//         const randomQuestion = allQuestions[Math.floor(Math.random() * allQuestions.length)];
//         exam.push(randomQuestion);
//       }

//       population.push(exam);
//     }

//     return population;
//   };

//   // Perform selection
//   const selection = (population) => {
//     const sortedPopulation = population.sort((a, b) => fitness(b) - fitness(a));
//     return sortedPopulation.slice(0, Math.floor(sortedPopulation.length / 2));
//   };

//   // Perform crossover
//   const crossover = (parent1, parent2) => {
//     const crossoverPoint = Math.floor(parent1.length / 2);
//     const child1 = parent1.slice(0, crossoverPoint).concat(parent2.slice(crossoverPoint));
//     const child2 = parent2.slice(0, crossoverPoint).concat(parent1.slice(crossoverPoint));
//     return [child1, child2];
//   };

//   // Perform mutation
//   const mutation = (exam, mutationRate) => {
//     for (let i = 0; i < exam.length; i++) {
//       if (Math.random() < mutationRate) {
//         exam[i] = allQuestions[Math.floor(Math.random() * allQuestions.length)];
//       }
//     }
//   };

//   // Run the genetic algorithm
// const runGeneticAlgorithm = (populationSize, mutationRate, maxGenerations) => {
//     let population = createInitialPopulation(populationSize);

//     for (let generation = 0; generation < maxGenerations; generation++) {
//       const selectedPopulation = selection(population);

//       const newPopulation = [];

//       for (let i = 0; i < selectedPopulation.length; i += 2) {
//         if (selectedPopulation[i] && selectedPopulation[i + 1]) {
//           const [child1, child2] = crossover(selectedPopulation[i], selectedPopulation[i + 1]);
//           mutation(child1, mutationRate);
//           mutation(child2, mutationRate);
//           newPopulation.push(child1, child2);
//         }
//       }

//       population = newPopulation;
//     }

//     return population[0];
//   };

//   // Generate the optimal exam
//   const optimalExam = runGeneticAlgorithm(100, 0.1, 100);
//   // Return the optimal exam
//   res.json(optimalExam);
// };

// module.exports = {
//   generateExam,
// };


exports.generateExam = async (req, res) => {
  const { chapters, difficultyLevels, objectives, totalQuestions } = req.body;
//convert totalQuestions to int 
const totalQuestionsInt = 10 ;

  try {
    const questions = await Question.find({
      chapterID: { $in: chapters },
      difficultyLevel: { $in: difficultyLevels },
      objective: { $in: objectives },
    });

    // Check if enough questions are available
    if (questions.length < totalQuestionsInt) {
      console.log(totalQuestionsInt);
      // log totalQuestionsInt type
      console.log(typeof totalQuestionsInt);
      return res.status(400).json({ error: "Not enough questions available" });
    }

    // Shuffle the questions array
    const shuffledQuestions = questions.sort(() => 0.5 - Math.random());

    // Select the required number of questions from the shuffled array
    const selectedQuestions = shuffledQuestions.slice(0, totalQuestionsInt);

    // Create a new exam document
    const exam = new Exam({
      questions: selectedQuestions.map((question) => question._id),
    });

    // Save the exam to the database
    await exam.save();

    res.status(200).json({ message: "Exam generated successfully", exam });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

//find questions in specific Exam
exports.findQuestionsInExam = async (req, res) => {
  try {
    // Query the database to get the exam
    const exam = await Exam.findById(req.params.id).populate("questions");

    // Check if the exam exists
    if (!exam) {
      return res.status(404).json({ error: "Exam not found" });
    }

    res.status(200).json({ exam });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
