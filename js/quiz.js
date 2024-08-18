// quiz.js

document.addEventListener('DOMContentLoaded', function() {
    const playerName = localStorage.getItem('playerName');
    console.log(`Player name ${playerName} registered`);

    const quizQuestions = [
        {
            question: 'Which of these pop stars was spotted in France enjoying the Games?',
            options: ['Ariana Grande', 'Olivia Rodrigo', 'Billie Eilish', 'Taylor Swift'],
            correct: 0
        },
        {
            question: 'Gymnast Simone Biles is one of the greatest Olympians of all time, but do you know how many medals she ACTUALLY won at the Paris Games?',
            options: ['Two', 'Four', 'Three', 'One'],
            correct: 1
        }
    ];

    let currentQuestion = 0;
    let score = 0;

    function startQuiz() {
        document.querySelector('.quiz').style.display = 'block';
        console.log('Quiz started');
        showQuestion();
    }

    function showQuestion() {
        const questionElement = document.querySelector('.question');
        const optionsElement = document.querySelector('.options');
        questionElement.textContent = quizQuestions[currentQuestion].question;
        optionsElement.innerHTML = '';

        quizQuestions[currentQuestion].options.forEach((option, index) => {
            const button = document.createElement('button');
            button.textContent = option;
            button.addEventListener('click', () => selectAnswer(index));
            optionsElement.appendChild(button);
        });
        document.querySelector('.next-question').style.display = 'none';
        console.log(`Displaying question: ${quizQuestions[currentQuestion].question}`);
    }

    function selectAnswer(selected) {
        console.log(`Selected answer: ${selected}`);
        if (selected === quizQuestions[currentQuestion].correct) {
            score++;
            console.log('Answer is correct');
        } else {
            console.log('Answer is incorrect');
        }

        // Show the "Next Question" button for the master user to proceed
        document.querySelector('.next-question').style.display = 'block';
    }

    document.querySelector('.next-question').addEventListener('click', () => {
        currentQuestion++;
        if (currentQuestion < quizQuestions.length) {
            showQuestion();
        } else {
            endQuiz();
        }
    });

    function endQuiz() {
        console.log(`Quiz ended with score: ${score}`);
        document.querySelector('.quiz').style.display = 'none';
        showLeaderboard();
    }

    function showLeaderboard() {
        const leaderboardList = document.querySelector('.leaderboard-list');

        // Fetch existing scores from local storage or initialize an empty array if none exist
        const scores = JSON.parse(localStorage.getItem('scores')) || [];
        // Add the current player's score to the scores array
        scores.push({ name: playerName, score: score });
        // Save the updated scores array back to local storage
        localStorage.setItem('scores', JSON.stringify(scores));
        console.log('Scores updated', scores);

        // Sort the scores array in descending order based on the score
        scores.sort((a, b) => b.score - a.score);
        // Clear the leaderboard list element
        leaderboardList.innerHTML = '';
        // Populate the leaderboard list element with sorted scores
        scores.forEach(score => {
            const li = document.createElement('li');
            li.textContent = `${score.name}: ${score.score}`;
            leaderboardList.appendChild(li);
        });

        // Display the leaderboard section
        document.querySelector('.leaderboard').style.display = 'block';
        console.log('Leaderboard displayed');
    }

    startQuiz();
});
