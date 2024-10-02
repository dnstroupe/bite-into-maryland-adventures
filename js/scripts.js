// Initialize the map and set its view to Maryland (centered around Baltimore)
var map = L.map('map').setView([39.2904, -76.6122], 9); // Latitude and longitude of Baltimore, zoom level 9

// Load and display a tile layer on the map (streets map style)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Add markers for each tour location
var fellsPoint = L.marker([39.2808, -76.5935]).addTo(map)
    .bindPopup('<b>Fells Point Flavor Frenzy</b><br>A bite-sized Baltimore bliss.')
    .openPopup();

var annapolis = L.marker([38.9784, -76.4922]).addTo(map)
    .bindPopup('<b>Annapolis Appetites</b><br>Explore Annapolis and its culinary wonders.')
    .openPopup();

var crabCreek = L.marker([38.9444, -76.5494]).addTo(map)
    .bindPopup('<b>Crab Creek Crawl</b><br>Discover the rich culinary history of Chesapeake Bay.')
    .openPopup();

// Scroll Animation for Timeline Items
document.addEventListener("DOMContentLoaded", function () {
  const timelineItems = document.querySelectorAll('.timeline-item');

  // Function to reveal elements when scrolled into view
  function revealOnScroll() {
    timelineItems.forEach(item => {
      const rect = item.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        item.classList.add('reveal');
      }
    });
  }

  // Run the function on scroll
  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); // Initial check
});

// Gamified Culinary Quiz
document.addEventListener("DOMContentLoaded", function () {
  const quizQuestions = [
    {
      question: "What is Maryland's most famous dish?",
      options: ["Crab Cakes", "Oysters Rockefeller", "Fried Chicken", "Tacos"],
      answer: "Crab Cakes"
    },
    {
      question: "Which city is known for its Old Bay seasoning?",
      options: ["Baltimore", "Annapolis", "Frederick", "Hagerstown"],
      answer: "Baltimore"
    },
    {
      question: "What is the main ingredient in Maryland crab soup?",
      options: ["Crab", "Chicken", "Lobster", "Beef"],
      answer: "Crab"
    }
  ];

  let currentQuestionIndex = 0;
  let score = 0;

  const quizContainer = document.getElementById('quiz-container');
  const quizQuestion = document.getElementById('quiz-question');
  const quizOptions = document.getElementById('quiz-options');
  const quizProgress = document.getElementById('quiz-progress');
  const quizResult = document.getElementById('quiz-result');
  const resultMessage = document.getElementById('result-message');
  const restartQuizButton = document.getElementById('restart-quiz');

  function loadQuestion() {
    const currentQuestion = quizQuestions[currentQuestionIndex];
    quizQuestion.textContent = currentQuestion.question;
    quizOptions.innerHTML = '';

    currentQuestion.options.forEach(option => {
      const button = document.createElement('button');
      button.textContent = option;
      button.addEventListener('click', () => checkAnswer(option));
      quizOptions.appendChild(button);
    });

    quizProgress.textContent = `Question ${currentQuestionIndex + 1} of ${quizQuestions.length}`;
  }

  function checkAnswer(selectedOption) {
    const currentQuestion = quizQuestions[currentQuestionIndex];
    if (selectedOption === currentQuestion.answer) {
      score++;
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) {
      loadQuestion();
    } else {
      showResult();
    }
  }

  function showResult() {
    quizContainer.classList.add('hidden');
    quizResult.classList.remove('hidden');

    let message = '';
    if (score === quizQuestions.length) {
      message = "You're a Maryland food expert!";
    } else if (score > 0) {
      message = "Nice try! You know your Maryland food.";
    } else {
      message = "Better luck next time!";
    }

    resultMessage.textContent = message;
  }

  restartQuizButton.addEventListener('click', () => {
    score = 0;
    currentQuestionIndex = 0;
    quizResult.classList.add('hidden');
    quizContainer.classList.remove('hidden');
    loadQuestion();
  });

  loadQuestion();
});

// Community Wall Photo Upload and Sharing
const photoUploadForm = document.getElementById('upload-form');
const sharedPhotos = document.getElementById('shared-photos');

photoUploadForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const photoFile = document.getElementById('photo-upload').files[0];
  const caption = document.getElementById('photo-caption').value;

  if (photoFile && caption) {
    const reader = new FileReader();
    reader.onload = function (event) {
      const newPhoto = document.createElement('div');
      newPhoto.classList.add('shared-photo');
      newPhoto.innerHTML = `
        <img src="${event.target.result}" alt="${caption}" class="w-full rounded-lg mb-4">
        <p>${caption}</p>
      `;
      sharedPhotos.appendChild(newPhoto);
    };
    reader.readAsDataURL(photoFile);
  }
});

// Food Journal Logging
const journalForm = document.getElementById('journal-form');
const journalEntries = document.getElementById('journal-entries');

journalForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const dishName = document.getElementById('journal-dish').value;
  const tastingNotes = document.getElementById('journal-notes').value;

  if (dishName && tastingNotes) {
    const journalEntry = document.createElement('div');
    journalEntry.classList.add('journal-entry');
    journalEntry.innerHTML = `
      <h4 class="text-2xl font-bold">${dishName}</h4>
      <p>${tastingNotes}</p>
    `;
    journalEntries.appendChild(journalEntry);
  }
});
