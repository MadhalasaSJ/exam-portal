const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Question = require("./models/Question");

dotenv.config();

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    // Clear old data
    await Question.deleteMany({});

    // Sample MCQs
    const questions = [
      {
        question: "What does HTML stand for?",
        options: [
          "Hyper Text Markup Language",
          "Home Tool Markup Language",
          "Hyperlinks and Text Markup Language",
          "Hyper Tool Multi Language"
        ],
        answer: 0
      },
      {
        question: "Which company developed JavaScript?",
        options: ["Netscape", "Microsoft", "Sun Microsystems", "Oracle"],
        answer: 0
      },
      {
        question: "What does CSS stand for?",
        options: [
          "Creative Style Sheets",
          "Cascading Style Sheets",
          "Computer Style Sheets",
          "Colorful Style Sheets"
        ],
        answer: 1
      },
      {
        question: "Which of these is a NoSQL database?",
        options: ["MySQL", "MongoDB", "PostgreSQL", "Oracle"],
        answer: 1
      },
      {
        question: "Which keyword is used to declare a constant in JavaScript?",
        options: ["let", "var", "const", "static"],
        answer: 2
      }
    ];

    await Question.insertMany(questions);
    console.log("✅ Questions inserted successfully!");
    process.exit();
  } catch (err) {
    console.error("❌ Error seeding DB:", err);
    process.exit(1);
  }
}

seed();
