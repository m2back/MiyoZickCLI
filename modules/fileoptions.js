const fs = require("fs");
var player = require('play-sound')(opts = {})
function openFile(file) {
    player.play(file);
}

const configJSONFile = "config.json";
if (!fs.existsSync(configJSONFile)) fs.writeFileSync(configJSONFile, "{}");
var readFile = fs.readFileSync(configJSONFile, "utf8");
if (readFile === "") {
  fs.writeFileSync(configJSONFile, JSON.stringify({}));
  readFile = JSON.stringify({});
}

const configFile = JSON.parse(readFile);

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
    const filtered = Object.keys(list[address]).filter((f) =>
        f.includes(input)
    );
    return filtered;
};

module.exports = {
    openFile: openFile,
    saveList: saveList,
    favRead: favRead,
    favChange: favChange,
    searchMusic: searchMusic
};