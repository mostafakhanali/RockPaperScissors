
const CHOICE = ['rock', 'paper', 'scissors'];
let humanScore = 0;
let computerScore = 0;

const getComputerChoice = function () {
    const computerChoice = CHOICE[Math.trunc(Math.random() * 3)]
    return computerChoice
}

const getHumanChoice = function () {
    let selection;
    while (!(selection && typeof selection === 'number' && selection > 0 && selection < 4)) {
        selection = +prompt(`Select:
            1: Rock
            2: paper
            3: Scissors`);
    }
    const HumanChoice = CHOICE[selection - 1]
    return HumanChoice
}

const playRound = function (humanChoice, computerChoice) {
    if (CHOICE.includes(humanChoice) && CHOICE.includes(computerChoice)) {
        if (humanChoice == computerChoice) {
            return `Draw! ${humanChoice} Vs. ${computerChoice}`
        }
        else if
            (
            (humanChoice == 'rock' && computerChoice == 'scissors') ||
            (humanChoice == 'scissors' && computerChoice == 'paper') ||
            (humanChoice == 'paper' && computerChoice == 'rock')
        ) {
            humanScore++;
            return `You win! ${humanChoice} Beats ${computerChoice}`
        }
        else {
            computerScore++;
            return `You lose! ${computerChoice} Beats ${humanChoice}`
        }
    }
}

const playGame = function () {
    for (let i = 0; i < 5; i++) {
        const humanSelection = getHumanChoice();
        const computerSelection = getComputerChoice();
        let result = playRound(humanSelection, computerSelection);
        console.log(result);
    }
    if (humanScore > computerScore) {
        console.log(`you win 🏆\nyour score: ${humanScore}\ncomputer score: ${computerScore}`);
    }
    else {
        console.log(`you lose 🔴\nyour score: ${humanScore}\ncomputer score: ${computerScore}`);
    }
}

playGame()
