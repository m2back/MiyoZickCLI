const exec = require("child_process").exec;
const term = require("terminal-kit").terminal;
const { clear } = require("console");
const fs = require("fs");
var player = require('play-sound')(opts = {})
const fileOptios = require('./modules/fileoptions');

fileOptios.openFile("audio.mp3");

const sampleAddress = process.argv[2];
const sampleInput = fs.readdirSync(process.argv[2]);

const configJSONFile = "config.json"; //Config File address
if (!fs.existsSync(configJSONFile)) fs.writeFileSync(configJSONFile, "{}");
var readFile = fs.readFileSync(configJSONFile, "utf8");
if (readFile === "") {
  fs.writeFileSync(configJSONFile, JSON.stringify({}));
  readFile = JSON.stringify({});
}
const configFile = JSON.parse(readFile);

function openFile(file) {
  player.play(file)
  // let platform = "xdg-open";
  // switch (process.platform) {
  //   case "darwin":
  //     platform = "open";
  //   case "win32":
  //     platform = "start";
  //   case "win64":
  //     platform = "start";
  //   default:
  //     platform = "xdg-open";
  // }
  // console.log(`"${platform} ${file}"`);
  // exec(`"${platform} ${file}"`);
}

/* -----------------------------------Functions-------------------------------------*/
const saveList = (address, input) => {
  list = configFile;
  if (list[address]) {
    input.forEach((element) => {
      if (!list[address][element]) {
        list[address][element] = { fav: false };
      }
    });
  } else {
    list[address] = {};
    input.forEach((element) => {
      list[address][element] = { fav: false };
    });
  }
  fs.writeFileSync(configJSONFile, JSON.stringify(list));
};

const favRead = (address, input) => {
  list = configFile;
  var favList = {};
  input.forEach((element) => {
    if (list[address][element].fav === true) {
      favList[element] = list[address][element];
    }
  });
  favList = Object.keys(favList);
  return favList;
};

const favChange = (address, input) => {
  list = configFile;
  if (!list[address][input]) return;
  if (list[address][input].fav === true) list[address][input].fav = false;
  else list[address][input].fav = true;
  fs.writeFileSync(configJSONFile, JSON.stringify(list));
};

const searchMusic = (address, input) => {
  list = configFile;
  const filtered = Object.keys(list[address]).filter((f) => f.includes(input));
  return filtered;
};

/* -------------------------------------Menus-------------------------------------*/
const mainMenu = (address, list) => {
  const menu = [
    "Show Song List",
    "Show Favorite Songs",
    "Serach Songs",
    "Exit",
  ];
  term.clear();
  term.singleColumnMenu(menu, { cancelable: true }, (error, response) => {
    if (response.selectedIndex === 0) listSongsMenu(address, list);
    else if (response.selectedIndex === 1) listFavSongMenu(address, list);
    else if (response.selectedIndex === 2) searchMenu(address); //Search
    else if (response.selectedIndex === 3) process.exit();
    else process.exit();
  });
};

const listSongsMenu = (address, list) => {
  term.clear();
  term.singleColumnMenu(list, { cancelable: true }, (error, response) => {
    if (response.selectedIndex !== undefined)
      selectedSongMenu(address, list[response.selectedIndex], list);
    else process.exit();
  });
};

const listFavSongMenu = (address, list) => {
  var faveList = favRead(address, list);
  term.eraseDisplayAbove();
  term.singleColumnMenu(faveList, { cancelable: true }, (error, response) => {
    if (response.selectedIndex !== undefined)
      selectedSongMenu(address, faveList[response.selectedIndex], list);
    else process.exit();
  });
};

const searchMenu = (address) => {
  term.eraseDisplayAbove();
  term.green("Write your search term:");
  term.inputField({ cancelable: true }, (error, input) => {
    if (input !== undefined) {
      const searchResult = searchMusic(address, input);
      console.log(searchResult);
      listSongsMenu(address, searchResult);
    } else {
      process.exit();
    }
  });
};

const selectedSongMenu = (address, file, list) => {
  term.eraseDisplayAbove();
  const songMenu = ["Play Song", "Add to favorites", "Back to Main Menu"];
  term.singleColumnMenu(songMenu, { cancelable: true }, (error, response) => {
    if (response.selectedIndex === 0) {
      openFile(`${address}/${file}`);
      selectedSongMenu((address, file, list));
    } else if (response.selectedIndex === 1) {
      favChange(address, file);
      selectedSongMenu((address, file, list));
    } else if (response.selectedIndex === 2) {
      mainMenu(address, list);
    } else {
      process.exit();
    }
  });
};


// mainMenu(sampleAddress, sampleInput);

//Tests:
// saveList(sampleAddress, sampleInput);
// favChange(sampleAddress, "Amy Macdonald - This Is The Life.mp3")
// console.log(favRead(sampleAddress,['Amy Macdonald - This Is The Life.mp3']))
// console.log(searchMusic(sampleAddress, "mp3"));
