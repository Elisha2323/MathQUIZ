document.addEventListener('DOMContentLoaded', function() {
    let currentPlayer = 1; // Player 1 starts first as question turn
    let player1Score = 0;
    let player2Score = 0;
    let player1Name = localStorage.getItem('player1Name');
    let player2Name = localStorage.getItem('player2Name');

    // Display player names
    document.getElementById('player1_name').textContent = `Player 1: ${player1Name}`;
    document.getElementById('player2_name').textContent = `Player 2: ${player2Name}`;

    // Display initial scores if available
    updateScores();

    // Function to handle sending a math question
    function sendQuestion() {
        // Get input values
        let number1 = parseFloat(document.getElementById('number1').value); // Use parseFloat for division
        let number2 = parseFloat(document.getElementById('number2').value); // Use parseFloat for division
        let operator = document.getElementById('operator').value;

        // Validate input
        if (isNaN(number1) || isNaN(number2) || operator === ' ') {
            alert('Please enter valid numbers and select an operator.');
            return;
        }

        // Prepare question string
        let question = `${number1} ${operator} ${number2} = ?`;
        document.getElementById('player_question').textContent = `${player1Name} asks: ${question}`;

        // Display answer input box and check button
        let inputBox = `<br> Answer : <input type='text' id='input_check_box'>`;
        let checkButton = `<br><br><button class='btn btn-info' id='check_button'>Check</button>`;
        document.getElementById('output').innerHTML = inputBox + checkButton;

        // Save correct answer for checking later
        localStorage.setItem('correctAnswer', calculateAnswer(number1, number2, operator));

        // Clear input fields
        document.getElementById('number1').value = '';
        document.getElementById('number2').value = '';
        document.getElementById('operator').value = ' ';

        // Add event listener to check button
        document.getElementById('check_button').addEventListener('click', checkAnswer);
    }

    // Function to calculate the correct answer based on operator
    function calculateAnswer(num1, num2, op) {
        switch (op) {
            case '+':
                return num1 + num2;
            case '-':
                return num1 - num2;
            case '*':
                return num1 * num2;
            case '/':
                return num1 / num2; // Division returns a floating-point result
            default:
                return NaN; // Invalid operator case
        }
    }

    // Function to check the answer
    function checkAnswer() {
        // Get correct answer from localStorage
        let correctAnswer = parseFloat(localStorage.getItem('correctAnswer'));

        // Get player answer
        let playerAnswer = parseFloat(document.getElementById('input_check_box').value);

        // Determine current player's role
        if (currentPlayer === 1) {
            // Player 1 asked the question, Player 2 answers
            if (playerAnswer === correctAnswer) {
                player2Score++;
                alert(`${player2Name} answered correctly!`);
            } else {
                alert(`${player2Name} answered incorrectly.`);
            }
            document.getElementById('player_question').textContent = `${player2Name} asks: `;
            currentPlayer = 2; // Switch turn to Player 2 (answer turn)
        } else {
            // Player 2 asked the question, Player 1 answers
            if (playerAnswer === correctAnswer) {
                player1Score++;
                alert(`${player1Name} answered correctly!`);
            } else {
                alert(`${player1Name} answered incorrectly.`);
            }
            document.getElementById('player_question').textContent = `${player1Name} asks: `;
            currentPlayer = 1; // Switch turn back to Player 1 (question turn)
        }

        // Update scores
        updateScores();

        // Clear answer input box and check button
        document.getElementById('output').innerHTML = '';
    }

    // Function to update scores on the page
    function updateScores() {
        document.getElementById('player1_score').textContent = `Player 1 Score: ${player1Score}`;
        document.getElementById('player2_score').textContent = `Player 2 Score: ${player2Score}`;
    }

    // Button click event listener for sending the question
    document.getElementById('send_button').addEventListener('click', sendQuestion);
});
