const exec = require("child_process").exec;
const term = require("terminal-kit").terminal;
const { clear } = require("console");
const fs = require("fs");

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
  let platform = "xdg-open";
  switch (process.platform) {
    case "darwin":
      platform = "open";
    case "win32":
      platform = "start";
    case "win64":
      platform = "start";
    default:
      platform = "xdg-open";
  }
  exec("xdg-open " + file);
}

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
    favList[element] = list[address][element];
  });
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

const nestedMenuOptions = [
  "Nested Option 1",
  "Nested Option 2",
  "Nested Option 3",
];

const menu = (address, list) => {
  const menuItems = ["Show all Song List", "Show Favorite Songs", "Exit"];
  const selectedMusicMenu = ["Play Song", "Add to Favorites", "Exit"];
  term.singleColumnMenu(menuItems, { cancelable: true }, (error, response) => {
    if (response.selectedIndex === 0) {
      console.log("success");
      term.singleColumnMenu(list, { cancelable: true }, (error, response) => {
        if (response.selectedIndex !== undefined) {
          term.singleColumnMenu(
            selectedMusicMenu,
            { cancelable: true },
            (error, response) => {
              if (response.selectedIndex === 0) {
                openFile(`${address}/${list[response.selectedIndex]}`);
                process.exit();
              }
            }
          );
        }
        process.exit();
      });
    }
    process.exit();
  });
};

menu2("/home/m2back/tmp/forfar/music_selector/music", [
  "Aaron May - Cream.mp3",
  ["sdsadsad.mp3"],
]);
// term.cyan( 'What do you want to do?\n' ) ;

let songs = ["Song 1", "Song 2", "Song 3"];

var menus = ["Show all Songs", "Show Favorite Songs", "Exit"];

//Tests:
// saveList(sampleAddress, sampleInput);
// favChange(sampleAddress, "Amy Macdonald - This Is The Life.mp3")
// console.log(favRead(sampleAddress,['Amy Macdonald - This Is The Life.mp3']))
// console.log(searchMusic(sampleAddress, "mp3"));
