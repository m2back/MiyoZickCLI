const term = require("terminal-kit").terminal;
const fileOptions = require("./fileoptions");

const mainMenu = (address, list) => {
    term.clear();
    const menu = [
        "Show Song List",
        "Show Favorite Songs",
        "Serach Songs",
        "Exit",
    ];
    term.singleColumnMenu(menu, { cancelable: true }, (error, response) => {
        if (response.selectedIndex === 0) {
            listSongsMenu(address, list);
        } else if (response.selectedIndex === 1) {
            listFavSongMenu(address, list);
        } else if (response.selectedIndex === 2) {
            searchMenu(address, list);
        } else if (response.selectedIndex === 3) {
            process.exit();
        } else {
            process.exit();
        }
    });
};

const listSongsMenu = (address, list) => {
    term.clear();
    term.singleColumnMenu(list, { cancelable: true }, (error, response) => {
        if (response.selectedIndex !== undefined) {
            selectedSongMenu(address, list[response.selectedIndex], list);
        } else {
            process.exit();
        }
    });
};

const listFavSongMenu = (address, list) => {
    var faveList = fileOptions.favRead(address, list);
    term.eraseDisplayAbove();
    term.singleColumnMenu(faveList, { cancelable: true }, (error, response) => {
        if (response.selectedIndex !== undefined) {
            selectedSongMenu(address, faveList[response.selectedIndex], list);
        } else {
            process.exit();
        }
    });
};

const searchMenu = (address, list) => {
    term.clear();
    term.green("Write your search term:");
    term.inputField({ cancelable: true }, (error, input) => {
        if (input !== undefined) {
            let searchResult = fileOptions.searchMusic(address, input);
            if (!searchResult) {
                term.clear();
                const failedSearch = [
                    "Search For another Song",
                    "Back to main Menu",
                ];
                term.red("Music not found!");
                term.singleColumnMenu(
                    failedSearch,
                    { cancelable: true },
                    (error, response) => {
                        if (response.selectedIndex === 0) {
                            searchMenu(address, list);
                        } else if (response.selectedIndex === 1) {
                            mainMenu(address, list);
                        } else {
                            process.exit();
                        }
                    }
                );
            } else {
                listSongsMenu(address, searchResult);
            }
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
            fileOptions.openFile(`${address}/${file}`);
            selectedSongMenu(address, file, list); // Pass individual arguments
        } else if (response.selectedIndex === 1) {
            fileOptions.favChange(address, file);
            selectedSongMenu(address, file, list); // Pass individual arguments
        } else if (response.selectedIndex === 2) {
            mainMenu(address, list);
        } else {
            process.exit();
        }
    });
};

module.exports = {
    mainMenu: mainMenu,
    listSongsMenu: listFavSongMenu,
    listFavSongMenu: listFavSongMenu,
    searchMenu: searchMenu,
    selectedSongMenu: selectedSongMenu,
};
