var artistsObj = {
    Nirvana: {
        song: "Lithium",
        track: "assets/music/Nirvana_Lithium.ogg",
        pic: "assets/images/nirvana.jpg"
    },
    Pearl_Jam: {
        song: "Given to Fly",
        track: "assets/music/Given_to_Fly_Pearl_Jam.ogg",
        pic: "assets/images/PearJam.jpg"
    },
    Red_Hot_Chili_Peppers: {
        song: "Give It Away",
        track: "assets/music/Red_Hot_Chili_Peppers_Give_It_Away.ogg",
        pic: "assets/images/RedHotChili.jpg"
    },
    Radiohead: {
        song: "Creep",
        track: "assets/music/Radiohead_Creep.ogg",
        pic: "assets/images/radiohead.jpg"
    },
    The_Smashing_Pumpkins: {
        song: "1979",
        track: "assets/music/1979_Smashing_Pumpkins.ogg",
        pic: "assets/images/SmashingPumpkins.jpg"
    },
    Green_Day: {
        song: "Basket Case",
        track: "assets/music/Green_Day_Basket_Case.ogg",
        pic: "assets/images/GreenDay.jpg"
    },
    Foo_fighters: {
        song: "Everlong",
        track: "assets/music/Foo_Fighters_Everlong.ogg",
        pic: "assets/images/fooFighters.jpg"
    },
    Alice_in_Chains: {
        song: "Man in the Box",
        track: "assets/music/Man_in_the_Box_Alice_in_Chains.ogg",
        pic: "assets/images/alice.jpg"
    },
    Soundgarden: {
        song: "Hands All Over",
        track: "assets/music/Hands_All_Over_Soundgarden.ogg",
        pic: "assets/images/soundgarden.jpg"
    },
    REM: {
        song: "Losing My Religion",
        track: "assets/music/R.E.M._Losing_My_Religion.ogg",
        pic: "assets/images/rem.jpg"
    },
    Oasis: {
        song: "D'You Know What I Mean",
        track: "assets/music/Oasis_D'You_Know_What_I_Mean.ogg",
        pic: "assets/images/oasis.jpg"
    },
    Stone_Temple_Pilots: {
        song: "Interstate Love Song",
        track: "assets/music/Stone_temple_pilots_interstate_love_song.ogg",
        pic: "assets/images/stoneTemple.jpg"
    },
    Metallica: {
        song: "Sad But True",
        track: "assets/music/Metallica_Sad_But_True.ogg",
        pic: "assets/images/metallica.jpg"
    }
};


function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomElement(min, max, ArrOfElements) {
    var ComputerChoose = ArrOfElements[getRandomIntInclusive(min, max)];
    return ComputerChoose;
}
//create DOM element with text in Id("p", "Guessfar" "hello world")
function createDOMelement(element, IdDiv, SomeText) {
    var newElement = document.createElement(element);
    newElement.innerHTML = SomeText;
    document.getElementById(IdDiv).appendChild(newElement);

}
//modify DOM element with Id("Wins", "1")
function modifyDOMelement(elementId, SomeText) {
    var theElement = document.getElementById(elementId);
    theElement.innerHTML = SomeText;
}
// get element by tag name ("tag", position, text)
function modifyTag(TagName, position, someText) {
    document.getElementsByTagName(TagName)[position].innerHTML = someText;
}
// main function send letter in Currentword and count hits ("char", letter, CurrentWord, index)
function sendLettersHit(tag, character, word, index) {
    modifyTag(tag, word.indexOf(character), word[word.indexOf(character)]);
    // repeats
    for (var i = index; i < word.length; i++) {
        if (character === word[i]) {
            modifyTag(tag, i, word[i]);
            hits++;
        }
    }
}

//initial state
const numberOfTries = 12;
createDOMelement("text", "GuessLeft", numberOfTries);
var guessleft = numberOfTries;
var win = 0;
var initialState = true;
var reset = false;
var hits = 0;
var CurrentWord = null;
var lockArray = [];
var indexOfLetter = null;
//gets keyboard keyup and retruns value
document.onkeyup = function keyWasPressed(evt) {

    var letter = String.fromCharCode(event.keyCode).toLowerCase();
    //if keyup in the lock array don't do anything
    if (lockArray.indexOf(letter) === -1) {

        //initial state
        if (initialState) {
            createDOMelement("text", "Wins", win);
            createDOMelement("text", "Current", CurrentWord);
            initialState = false;
            reset = true;
        }
        //reset
        if (reset) {
            set();
        }

        lockArray.push(letter);

        var indexOfLetter = CurrentWord.indexOf(letter);
        // if letter exists in CurrentWord then
        if (indexOfLetter != -1) {
            hits++;

            sendLettersHit("char", letter, CurrentWord, indexOfLetter + 1);

            console.log("hits " + hits);
            // Win!!!
            if (hits >= CurrentWord.length) {
                win++;
                modifyDOMelement("Wins", win);
                console.log("wins " + win);
                modifyDOMelement("Artist", CurrentWord);
                createDOMelement("text", "Artist", " " + artistsObj[Word]["song"]);
                console.log(artistsObj[Word]["song"]);
                // Gets Link for Theme Song
                var audioElement = document.createElement("audio");
                audioElement.setAttribute("src", artistsObj[Word]["track"]);
                audioElement.play();
                // image
                var bandImages = document.getElementById("bandImg");
                bandImages.src = artistsObj[Word]["pic"];
                set();
            }
        } else {
            // missed letters
            createDOMelement("text", "GuessFar", letter + " ");
            guessleft--;
            console.log("guess left " + guessleft);
            modifyDOMelement("GuessLeft", guessleft);
            if (guessleft === 0) {
                reset = true;
            }
        }

        console.log(CurrentWord);
    }

    function set() {
        guessleft = numberOfTries;
        hits = 0;
        lockArray = [];
        modifyDOMelement("Current", "");
        modifyDOMelement("GuessFar", "");
        modifyDOMelement("GuessLeft", guessleft);
        Word = getRandomElement(0, Object.keys(artistsObj).length - 1, Object.keys(artistsObj));
        CurrentWord = Word.toLowerCase();
        // generate blank phrase
        for (var i = 0; i < CurrentWord.length; i++) {
            createDOMelement("char", "Current", "_ ");
        }
        //handle spaces
        if (CurrentWord.indexOf("_") != -1) {
            hits++;
            sendLettersHit("char", "_", CurrentWord, CurrentWord.indexOf("_") + 1);
        }
        reset = false;
    }
}