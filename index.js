const cards_map = {
    //Aces
    1: { color:"Heart", name:"Ace", value:"11" },
    2: { color:"Diamond", name:"Ace", value:"11" },
    3: { color:"Spade", name:"Ace", value:"11" },
    4: { color:"Club", name:"Ace", value:"11" },
    //Kings
    5: { color:"Heart", name:"King", value:"10" },
    6: { color:"Diamond", name:"King", value:"10" },
    7: { color:"Spade", name:"King", value:"10" },
    8: { color:"Club", name:"King", value:"10" },
    //Queens
    9: { color:"Heart", name:"Queen", value:"10" },
    10: { color:"Diamond", name:"Queen", value:"10" },
    11: { color:"Spade", name:"Queen", value:"10" },
    12: { color:"Club", name:"Queen", value:"10" },
    //Jacks
    13: { color:"Heart", name:"Jack", value:"10" },
    14: { color:"Diamond", name:"Jack", value:"10" },
    15: { color:"Spade", name:"Jack", value:"10" },
    16: { color:"Club", name:"Jack", value:"10" },
    //Tens
    17: { color:"Heart", name:"Ten", value:"10" },
    18: { color:"Diamond", name:"Ten", value:"10" },
    19: { color:"Spade", name:"Ten", value:"10" },
    20: { color:"Club", name:"Ten", value:"10" },
    //Nines
    21: { color:"Heart", name:"Nine", value:"9" },
    22: { color:"Diamond", name:"Nine", value:"9" },
    23: { color:"Spade", name:"Nine", value:"9" },
    24: { color:"Club", name:"Nine", value:"9" },
    //Eights
    25: { color:"Heart", name:"Eight", value:"8" },
    26: { color:"Diamond", name:"Eight", value:"8" },
    27: { color:"Spade", name:"Eight", value:"8" },
    28: { color:"Club", name:"Eight", value:"8" },
    //Sevens
    29: { color:"Heart", name:"Seven", value:"7" },
    30: { color:"Diamond", name:"Seven", value:"7" },
    31: { color:"Spade", name:"Seven", value:"7" },
    32: { color:"Club", name:"Seven", value:"7" },
    //Sixes
    33: { color:"Heart", name:"Six", value:"6" },
    34: { color:"Diamond", name:"Six", value:"6" },
    35: { color:"Spade", name:"Six", value:"6" },
    36: { color:"Club", name:"Six", value:"6" },
    //Fives
    37: { color:"Heart", name:"Five", value:"5" },
    38: { color:"Diamond", name:"Five", value:"5" },
    39: { color:"Spade", name:"Five", value:"5" },
    40: { color:"Club", name:"Five", value:"5" },
    //Fours
    41: { color:"Heart", name:"Four", value:"4" },
    42: { color:"Diamond", name:"Four", value:"4" },
    43: { color:"Spade", name:"Four", value:"4" },
    44: { color:"Club", name:"Four", value:"4" },
    //Threes
    45: { color:"Heart", name:"Three", value:"3" },
    46: { color:"Diamond", name:"Three", value:"3" },
    47: { color:"Spade", name:"Three", value:"3" },
    48: { color:"Club", name:"Three", value:"3" },
    //Twos
    49: { color:"Heart", name:"Two", value:"2" },
    50: { color:"Diamond", name:"Two", value:"2" },
    51: { color:"Spade", name:"Two", value:"2" },
    52: { color:"Club", name:"Two", value:"2" },
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const dHit = document.getElementById("hit");
const dHand = document.getElementById("hand");
const svgDir = "http://127.0.0.1/img/cards/"
const paper = document.getElementById("paper");
const end = document.getElementById("end");
const dWin = document.getElementById("win");
const newGame = document.getElementById("newGame");

let usedCards = new Array();
let yourHand = 0;

const createCard = () => {
    let card = document.createElement("div");
    card.classList.add("card");
    let rCard = rando(1, 52);
    
    if (usedCards.indexOf(rCard) != -1) {
        createCard();
    } else {
        card.style.backgroundImage = `url(${svgDir}${cards_map[rCard].name}${cards_map[rCard].color}.svg)`
        usedCards.push(rCard);
        yourHand += parseInt(cards_map[rCard].value);
        paper.innerHTML = yourHand;
        return card;
    }

};

const fHit = () => {
    let newCard = createCard();
    if (newCard) {
        dHand.appendChild(newCard);
    } else {
        fHit();
    }
};

dHit.addEventListener("click", fHit);
end.addEventListener("click", () => {
    let win = "";
    dHit.removeEventListener("click", fHit);
    dHit.style.cursor = "unset";

    let dealerHand = rando(11, 24);
    if (dealerHand > yourHand && dealerHand <= 21) {
        win = `Dealer wins with ${dealerHand} in his hand!<br><br>Click to start new game!`;
    } else if (dealerHand == yourHand && dealerHand <= 21) {
        win = `You draw this game with ${yourHand} in your hand!<br>Dealer's hand: ${dealerHand}<br><br>Click to start new game!`;
    } else if (yourHand > 21) {
        win = `You lose with ${yourHand} in your hand!<br>Dealer's hand: ${dealerHand}<br><br>Click to start new game!`;
    } else {
        win = `You win with ${yourHand} in your hand!<br>Dealer's hand: ${dealerHand}<br><br>Click to start new game!`;
    }
    
    dWin.innerHTML = win;
    dWin.classList.remove("hidden");
    newGame.classList.remove("hidden");
});

dWin.addEventListener("click", () => {
    location.reload();
});

newGame.addEventListener("click", () => {
    location.reload();
});