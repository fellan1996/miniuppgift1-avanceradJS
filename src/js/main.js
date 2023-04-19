import { sortTheLeaderboard, updateLeaderboard } from './databaseFunctions.js'

const headline = document.getElementById('main-headline');
const nameBtn = document.getElementById('player-name-btn');
const playersWeaponArsenal = document.getElementById('player-container');
const pName = document.getElementById('p-name');
const pComputer = document.getElementById('p-computer');
let playerName = 'player';
let playerScore = 0;

sortTheLeaderboard();

nameBtn.addEventListener('click', event => {
    event.preventDefault();
    const name = document.getElementById('player-name-text');
    pName.innerText = `${name.value}: 0 points`;
    playerName = name.value;
    name.value = '';
    name.setAttribute('disabled', 'disabled');
    nameBtn.setAttribute('disabled', 'disabled');
});

playersWeaponArsenal.addEventListener('click', rockPaperOrScissors);

function showItWasATie() {
    pName.style.background = 'yellow';
    pComputer.style.background = 'yellow';
    setTimeout(() => {
        pName.style.background = 'white';
        pComputer.style.background = 'white';

    }, 500);

}
function playerGetsPoint() {
    pName.style.background = 'lightgreen';
    setTimeout(() => pName.style.background = 'white', 1000);
    playerScore++;
    const pNameArray = pName.innerText.split("");
    pNameArray[pNameArray.length - 8] = playerScore;
    let newpNameText = pNameArray.join("");
    pName.innerText = newpNameText;
}

function gameOver() {
    playersWeaponArsenal.removeEventListener('click', rockPaperOrScissors);
    pComputer.style.background = 'red';
    headline.style.background = 'red';
    headline.innerText = 'GAME OVER!';
    setTimeout(() => {
        updateLeaderboard(playerName, playerScore);
        pComputer.style.background = 'white';
        headline.innerText = 'Lets play rock paper scissors!';
        headline.style.background = 'white';
        playerScore = 0;
        //The next four lines is to reset the players score to 0 without changing the name
        const pNameArray = pName.innerText.split("");
        pNameArray[pNameArray.length - 8] = playerScore;
        let newpNameText = pNameArray.join("");
        pName.innerText = newpNameText;

        const imgUrl = new URL('../images/blank.jpg', import.meta.url);
        document.getElementById('computers-choice').src = imgUrl.href;
        document.getElementById('players-choice').src = imgUrl.href;
        playersWeaponArsenal.addEventListener('click', rockPaperOrScissors);
    }, 1000);
}

function rockPaperOrScissors(event) {
    const weaponId = event.target.id;
    let randomNumber = Math.ceil(Math.random() * 3);
    
    //shows what the player chose
    let playerimgUrl = new URL('../images/weapon-1.jpg', import.meta.url);
    switch (weaponId) {
        case 'weapon-1':
            console.log('weapon-1, switch');
            break;
        case 'weapon-2':
            console.log('weapon-2, switch');
            playerimgUrl = new URL('../images/weapon-2.jpg', import.meta.url);
            break;
        case 'weapon-3':
            console.log('weapon-3, switch');
            playerimgUrl = new URL('../images/weapon-3.jpg', import.meta.url);
            break;
    }
    //shows what the computer chose
    let computerimgUrl = new URL('../images/weapon-1.jpg', import.meta.url);
    switch (randomNumber) {
        case 1:
            break;
        case 2:
            computerimgUrl = new URL('../images/weapon-2.jpg', import.meta.url);
            break;
        case 3:
            computerimgUrl = new URL('../images/weapon-3.jpg', import.meta.url);
            break;
    }
    const playersChoice = document.getElementById('players-choice');
    playersChoice.src = playerimgUrl.href;
    const computersChoice = document.getElementById('computers-choice');
    computersChoice.src = computerimgUrl.href;

    if (weaponId === `weapon-${randomNumber}`) {
        showItWasATie();
    } else {
        switch (randomNumber) {
            case 1:
                weaponId === 'weapon-2' ? playerGetsPoint() : gameOver();
                break;
            case 2:
                weaponId === 'weapon-3' ? playerGetsPoint() : gameOver();
                break;
            case 3:
                weaponId === 'weapon-1' ? playerGetsPoint() : gameOver();
                break;
        }
    }
}