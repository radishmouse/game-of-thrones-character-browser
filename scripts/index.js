// Our API endpoint as a constant (a.k.a. a variable that can't be reassigned)
// const URL = `https://anapioficeandfire.com/api/characters/`;
const URL = `http://my-little-cors-proxy.herokuapp.com/https://anapioficeandfire.com/api/characters/`;

// Global variable for the ID of the character we're getting data for.
var currentId = 1;

// jQuery-ified versions of our DOM elements
const $prevButton = $('[data-control-prev]');
const $nextButton = $('[data-control-next]');
const $charInfo   = $('[data-character-info]');

// Calculates the previous ID
function prevId() {
  // Don't decrement if currentId is 1
  if (currentId > 1) {
    currentId = currentId - 1;
  }
}

// Calculates the next ID
function nextId() {
  currentId = currentId + 1;
}

// Makes Ajax request for character, returns Promise
function getCharacter() {
  return $.get(`${URL}${currentId}`)
}

// Creates the container for a character's info
function createCard(characterData) {
  var $characterCard = $('<div>');
  var $charInfoList = createList(characterData);
  $characterCard.append($charInfoList);
  return $characterCard;
}

// Creates a list of specific character informationz
function createList(characterData) {
  var $charInfoList = $('<ul>');

  // var $charName = $('<li>', {
  //   text: characterData.name || characterData.aliases[0]
  // });

  // $charInfoList.append($charName);


  Object.keys(characterData).forEach(function (key) {
    var val = characterData[key];

    if (Array.isArray(val)) {
      if (val.length > 0 && val[0] !== '') {
        console.log(val);
        var arrayString = val.join(', ');
        var $charInfoItem = $('<li>', {
          text: `${key}: [${arrayString}]`
        });

        $charInfoList.append($charInfoItem);
      }
    } else if (val !== '') {
      var $charInfoItem = $('<li>', {
        text: `${key}: ${val}`
      });

      $charInfoList.append($charInfoItem);
    }

  });

  return $charInfoList;
}

// Draws character info to the page
function drawCharacter(characterData) {
  console.log(characterData);
  var $characterCard = createCard(characterData);


  // Empty out the current character info
  $charInfo.html('');

  // Put our new character card in the box
  $charInfo.append($characterCard);
}

// Combo function! Makes Ajax req, then draws char info to page
function getAndDrawCharacter() {
  getCharacter()
    .then(drawCharacter)
}

// Attaches event listeners to buttons.
// Makes initial Ajax request for first character
function main() {

  $prevButton.on('click', function (event) {
    event.preventDefault();
    prevId();
    getAndDrawCharacter();
  });

  $nextButton.on('click', function (event) {
    event.preventDefault();
    nextId();
    getAndDrawCharacter();
  });

  getAndDrawCharacter();
}

// Sets this thing off!
main();
