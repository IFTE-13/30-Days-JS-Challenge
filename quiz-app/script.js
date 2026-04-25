const questions = [
  { question: "What is the capital of France?", options: ["Berlin", "Madrid", "Paris", "Rome"], answer: "Paris" },
  { question: "Which planet is known as the Red Planet?", options: ["Earth", "Mars", "Jupiter", "Saturn"], answer: "Mars" },
  { question: "What is the largest mammal?", options: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"], answer: "Blue Whale" },
  { question: "Who wrote 'To Kill a Mockingbird'?", options: ["Harper Lee", "Mark Twain", "Jane Austen", "Charles Dickens"], answer: "Harper Lee" },
  { question: "What is the capital of Bangladesh?", options: ["Dhaka", "Chittagong", "Khulna", "Sylhet"], answer: "Dhaka" }
];

let current = 0;
let score = 0;
let answered = false;

const BASE_BTN    = "w-full py-2.5 px-4 text-left text-sm border border-gray-300 rounded-lg bg-white text-gray-900 cursor-pointer hover:bg-gray-50";
const CORRECT_BTN = "w-full py-2.5 px-4 text-left text-sm border border-green-300 rounded-lg bg-green-50 text-green-800 cursor-default";
const WRONG_BTN   = "w-full py-2.5 px-4 text-left text-sm border border-red-300 rounded-lg bg-red-50 text-red-800 cursor-default";

function loadQuestion() {
  answered = false;
  const q = questions[current];

  document.getElementById('question-text').textContent = q.question;
  document.getElementById('progress-label').textContent = `Question ${current + 1} of ${questions.length}`;
  document.getElementById('score-label').textContent = `Score: ${score}`;
  document.getElementById('progress-bar').style.width = `${((current + 1) / questions.length) * 100}%`;

  const feedback = document.getElementById('feedback');
  feedback.textContent = '';
  feedback.className = 'text-sm mt-4 min-h-5';

  document.getElementById('next-btn').classList.add('hidden');

  const container = document.getElementById('options-container');
  container.innerHTML = '';
  q.options.forEach(opt => {
    const btn = document.createElement('button');
    btn.textContent = opt;
    btn.className = BASE_BTN;
    btn.onclick = () => checkAnswer(opt, btn);
    container.appendChild(btn);
  });
}

function checkAnswer(selected, btn) {
  if (answered) return;
  answered = true;

  const correct = questions[current].answer;
  const feedback = document.getElementById('feedback');
  const nextBtn = document.getElementById('next-btn');

  document.querySelectorAll('#options-container button').forEach(b => {
    b.onclick = null;
    if (b.textContent === correct) b.className = CORRECT_BTN;
  });

  if (selected === correct) {
    score++;
    feedback.textContent = 'Correct!';
    feedback.className = 'text-sm mt-4 min-h-5 text-green-700';
  } else {
    btn.className = WRONG_BTN;
    feedback.textContent = `Wrong. The answer is ${correct}.`;
    feedback.className = 'text-sm mt-4 min-h-5 text-red-700';
  }

  document.getElementById('score-label').textContent = `Score: ${score}`;
  nextBtn.classList.remove('hidden');
  nextBtn.textContent = current === questions.length - 1 ? 'See results' : 'Next question';
}

function nextQuestion() {
  current++;
  if (current >= questions.length) showResult();
  else loadQuestion();
}

function showResult() {
  document.getElementById('quiz-screen').classList.add('hidden');
  document.getElementById('result-screen').classList.remove('hidden');
  document.getElementById('final-score').textContent = `${score} / ${questions.length}`;
  const pct = score / questions.length;
  document.getElementById('result-msg').textContent =
    pct === 1 ? 'Perfect score!' : pct >= 0.6 ? 'Good job!' : 'Better luck next time.';
}

function restartQuiz() {
  current = 0;
  score = 0;
  document.getElementById('quiz-screen').classList.remove('hidden');
  document.getElementById('result-screen').classList.add('hidden');
  loadQuestion();
}

loadQuestion();