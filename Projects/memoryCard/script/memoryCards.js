const cards = document.querySelectorAll(".card");

let matchedCards = 0;
let cardOne, cardTwo;
let disableDeck = false;

let flipCard = (e) => {
    let clickedCard = e.currentTarget;

    if (clickedCard === cardOne || disableDeck) return; 

    clickedCard.classList.add("flip");

    if (!cardOne) {
        cardOne = clickedCard;
    } else {
        cardTwo = clickedCard;
        disableDeck = true;

        let cardOneImg = cardOne.querySelector("img").src;
        let cardTwoImg = cardTwo.querySelector("img").src;
        matchCards(cardOneImg, cardTwoImg);
    }
};

let matchCards = (img1, img2) => {
    if (img1 === img2) {
        matchedCards++;
        if(matchedCards == 8){
            setTimeout(() =>{
                return shuffleCard();
            },1000);
        }

        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        resetCards();
    } else {
        setTimeout(() => {
            cardOne.classList.add("shake");
            cardTwo.classList.add("shake");
        }, 400);

        setTimeout(() => {
            cardOne.classList.remove("shake", "flip");
            cardTwo.classList.remove("shake", "flip");
            resetCards();
        }, 1200);
    }
};

let shuffleCard = () =>{
    matchedCards = 0;
    cardOne = cardTwo = "";
    let arr = ["cinna","hellokitty","keroppi","kuromi","mymelody","peppy","pochacco","pompumpurin","cinna","hellokitty","keroppi","kuromi","mymelody","peppy","pochacco","pompumpurin"]
    arr.sort(() => Math.random() > 0.5 ? 1 : -1)

    cards.forEach((card, index) => {
        card.classList.remove("flip");
        let imgTag = card.querySelector("img");
        imgTag.src = `photos/${arr[index]}.png`
    card.addEventListener("click", flipCard);
});
}

shuffleCard();

let resetCards = () => {
    [cardOne, cardTwo] = [null, null];
    disableDeck = false;
};

cards.forEach(card => {
    card.addEventListener("click", flipCard);
});
