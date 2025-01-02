let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let leaders= document.getElementById("lb");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let scoreCount = 0;
let count = 21;
let countdown;
const button=document.getElementById('start-button');
button.disabled=true;
let playerName;

function validation() {
    const playerNameInput = document.getElementById('playerName');
    playerName = playerNameInput.value.trim();
     
    if (playerName === "") {
                output.textContent = "Enter a name.";
                output.style.color = "red";
                return false;
            } else if (!/^[a-zA-Z]+$/.test(playerName)) {
                output.textContent = "Player name must consist of only letters.";
                output.style.color = "red";
                return false;
            } else {
                output.textContent = `Welcome ${playerName}! Your name is added to the leaderboard. You can start the quiz now.`;
                output.style.color = "green";
                button.disabled = false;
            }  
}


let leaderboard = [];
function showLeaderboard() {
    if (playerName !== "" && scoreCount > -1) {
        leaderboard.push({ name: playerName, score: scoreCount });
        leaderboard.sort((a, b) => b.score - a.score);
        alert("Leaderboard:\n\n" + formatLeaderboard());
    } else {
       alert("Please complete the quiz to view the leaderboard.");
    }
}
function formatLeaderboard() {
    let formattedLeaderboard = "";
    leaderboard.forEach((user, index) => {
        formattedLeaderboard += `${index + 1}. ${user.name}: ${user.score} points\n`;
    });
    return formattedLeaderboard;
}

//Questions and Options array

const quizArray = [
    {
        id: "0",
        question: "Which of the following is generally used for performing tasks like creating the structure of the relations, deleting relation?",
        options: ["DML(Data Manipulation Language)", "DDL(Data Definition Language)", "Query", "Relational Schema"],
        correct: "DDL(Data Definition Language)",
    },
    {
        id: "1",
        question: "Which of the following provides the ability to query information from the database and insert tuples into, delete tuples from, and modify tuples in the database?",
        options: ["DML(Data Manipulation Language)", "DDL(Data Definition Language)", "Query", "Relational Schema"],
        correct: "DML(Data Manipulation Language)",
    },
    {
        id: "2",
        question: "Which one of the following given statements possibly contains the error?",
        options: ["select * from emp where empid = 10003;", "select empid from emp where empid = 10006;", "select empid from emp;", "select empid where empid = 1009 and Lastname = 'GELLER';"],
        correct: "select empid where empid = 1009 and Lastname = 'GELLER';",
    },
  {
        id: "3",
        question: "Data science is the process of diverse set of data through ?",
        options: ["organizing data", "processing data", "analysing data", "all options given are correct"],
        correct: "all options given are correct",
    },
    {
        id: "4",
        question: "Which of the following language is used in Data science?",
        options: ["C", "C++", "R", "Ruby"],
        correct: "R",
    },
    {
        id: "5",
        question: "What is the work of Data Architect?",
        options: ["utilize large data sets to gather information that meets their company's needs", "work with businesses to determine the best usage of the information yielded from data", "build data solutions that are optimized for performance and design applications", "all are correct"],
        correct: "build data solutions that are optimized for performance and design applications",
    },
 {
        id: "6",
        question: "Which of the following language was developed as the first purely object programming language?",
        options: ["SmallTalk", "C++", "Java", "Kotlin"],
        correct: "SmallTalk",
    },
    {
        id: "7",
        question: "Which of the following is not an OOPS concept?",
        options: ["Encapsulation", "Polymorphism", "Exception", "Abstraction"],
        correct: "Exception",
    },
    {
        id: "8",
        question: "Which feature of OOPS described the reusability of code?",
        options: ["Abstraction", "Encapsulation", "Polymorphism", "Inheritance"],
        correct: "Inheritance",
    },
    {
        id: "9",
        question: "How can you catch a computer virus?",
        options: ["shopping online", "using laptop during winter", "sending email messages", "opening email attachments"],
        correct: "opening email attachments",
    }
];

//Restart Quiz
restart.addEventListener("click", () => {
    startScreen.classList.remove("hide");
    displayContainer.classList.add("hide");
    //initial();
    //displayContainer.classList.remove("hide");
    scoreContainer.classList.add("hide");
    button.disabled=true;
});

//Next Button
nextBtn.addEventListener(
    "click",
    (displayNext = () => {
        //increment questionCount
        questionCount += 1;
        //if last question
        if (questionCount == quizArray.length) {
            //hide question container and display score
            displayContainer.classList.add("hide");
            scoreContainer.classList.remove("hide");
            //user score
            userScore.innerHTML =
                "Your score is " + scoreCount + " out of " + questionCount;
        } else {
            //display questionCount
            countOfQuestion.innerHTML =
                questionCount + 1 + " of " + quizArray.length + " Question";
            //display quiz
            quizDisplay(questionCount);
            count = 21;
            clearInterval(countdown);
            timerDisplay();
        }
    })
);

//Timer
const timerDisplay = () => {
    countdown = setInterval(() => {
        count--;
        timeLeft.innerHTML = `${count}s`;
        if (count == 0) {
            clearInterval(countdown);
            displayNext();
        }
    }, 1000);
};

//Display quiz
const quizDisplay = (questionCount) => {
    let quizCards = document.querySelectorAll(".container-mid");
    //Hide other cards
    quizCards.forEach((card) => {
        card.classList.add("hide");
    });
    //display current question card
    quizCards[questionCount].classList.remove("hide");
};

//Quiz Creation
function quizCreator() {
    //randomly sort questions
    quizArray.sort(() => Math.random() - 0.5);
    //generate quiz
    for (let i of quizArray) {
        //randomly sort options
        i.options.sort(() => Math.random() - 0.5);
        //quiz card creation
        let div = document.createElement("div");
        div.classList.add("container-mid", "hide");
        //question number
        countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";
        //question
        let question_DIV = document.createElement("p");
        question_DIV.classList.add("question");
        question_DIV.innerHTML = i.question;
        div.appendChild(question_DIV);
        //options
        div.innerHTML += `
    <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
     <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
      <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
       <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
    `;
        quizContainer.appendChild(div);
    }
}

//Checker Function to check if option is correct or not
function checker(userOption) {
    let userSolution = userOption.innerText;
    let question =
        document.getElementsByClassName("container-mid")[questionCount];
    let options = question.querySelectorAll(".option-div");

    //if user clicked answer == correct option stored in object
    if (userSolution === quizArray[questionCount].correct) {
        userOption.classList.add("correct");
        scoreCount++;
    } else {
        userOption.classList.add("incorrect");
        //For marking the correct option
        options.forEach((element) => {
            if (element.innerText == quizArray[questionCount].correct) {
                element.classList.add("correct");
            }
        });
    }
    //clear interval(stop timer)
    clearInterval(countdown);
    //disable all options
    options.forEach((element) => {
        element.disabled = true;
    });
}

//initial setup
function initial() {
    quizContainer.innerHTML = "";
    questionCount = 0;
    scoreCount = 0;
    count = 21;
    clearInterval(countdown);
    timerDisplay();
    quizCreator();
    quizDisplay(questionCount);
}

//when user click on start button
startButton.addEventListener("click", () => {
    startScreen.classList.add("hide");
    displayContainer.classList.remove("hide");
    initial();
});

//hide quiz and display start screen
window.onload = () => {
    startScreen.classList.remove("hide");
    displayContainer.classList.add("hide");
};

