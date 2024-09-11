const CHOICE = ['✊🏼', '✋🏼', '✌🏼'];
const choice = document.querySelector('.choice');
const player = document.querySelector('.user--player');
const computer = document.querySelector('.user--com');
const winModal = document.querySelector('dialog');
const winnerText = document.querySelector('dialog div');
const playAgain = document.querySelector('dialog button');
const state = document.querySelector('.state');

let humanScore = 0;
let computerScore = 0;
let round = 0;
let wait2sec;
let currentChoice;

const resetCards = function () {
    currentChoice?.classList.remove('selected');
    player.querySelector('.choose').textContent = '?';
    computer.querySelector('.choose').textContent = '?';
    player.querySelector('.choose').classList.remove('active', 'win');
    computer.querySelector('.choose').classList.remove('active', 'win');
};
const reset = function () {
    humanScore = 0;
    computerScore = 0;
    round = 0;
    updateScore(player.querySelector('.score'), humanScore);
    updateScore(computer.querySelector('.score'), computerScore);
    resetCards();
    winModal.close();
};

const getComputerChoice = function () {
    const computerChoice = CHOICE[Math.trunc(Math.random() * 3)];
    return computerChoice;
};

choice.addEventListener('click', function (e) {
    currentChoice?.classList.remove('selected');
    currentChoice = e.target;
    const weapon = e.target.textContent;
    if (round < 5 && round >= 0) {
        clearTimeout(wait2sec);
        round++;
        currentChoice.classList.add('selected');
        player.querySelector('.choose').classList.remove('win');
        computer.querySelector('.choose').classList.remove('win');
        const comWeapon = getComputerChoice();
        player.querySelector('.choose').textContent = weapon;
        computer.querySelector('.choose').textContent = comWeapon;
        player.querySelector('.choose').classList.add('active');
        computer.querySelector('.choose').classList.add('active');
        playRound(weapon, comWeapon);

        wait2sec = setTimeout(resetCards, 2000);
        if (round === 5) {
            setTimeout(function () {
                if (humanScore > computerScore) {
                    winnerText.innerHTML = ` <p>🔥🔥🔥🔥</p>
                                                <p>
                                                You Win 🏆
                                                </p>
                                                <p>${humanScore}  - ${computerScore}<\p>
                                                <p>🔥🔥🔥🔥</p>`;
                    winModal.style.backgroundColor = 'var(--color-lime-5)';
                } else if (computerScore > humanScore) {
                    winnerText.innerHTML = `<p>You lose 😞</p>
                                            <p>${humanScore} - ${computerScore}<\p>`;
                    winModal.style.backgroundColor = 'var(--color-red-6)';
                } else {
                    winnerText.innerHTML = `<p>Draw 😐</p>
                    <p>${humanScore} - ${computerScore}<\p>`;
                    winModal.style.backgroundColor = 'var(--color-teal-3)';
                }
                winModal.showModal();
            }, 1500);
        }
    }
});

const playRound = function (humanChoice, computerChoice) {
    if (CHOICE.includes(humanChoice) && CHOICE.includes(computerChoice)) {
        if (humanChoice == computerChoice) {
            state.textContent = 'Draw';
            return `Draw! ${humanChoice} Vs. ${computerChoice}`;
        } else if (
            (humanChoice == '✊🏼' && computerChoice == '✌🏼') ||
            (humanChoice == '✌🏼' && computerChoice == '✋🏼') ||
            (humanChoice == '✋🏼' && computerChoice == '✊🏼')
        ) {
            humanScore++;
            player.querySelector('.choose').classList.add('win');
            state.textContent = 'You win';
            updateScore(player.querySelector('.score'), humanScore);
        } else {
            computerScore++;
            computer.querySelector('.choose').classList.add('win');
            state.textContent = 'You lose';
            updateScore(computer.querySelector('.score'), computerScore);
        }
    }
};

const updateScore = function (user, score) {
    user.textContent = `Score: ${score}/5`;
};

playAgain.addEventListener('click', reset);
