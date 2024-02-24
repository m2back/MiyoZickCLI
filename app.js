const fs = require("fs");
const term = require("terminal-kit").terminal;
const fileOptions = require("./modules/fileoptions");
const menus = require("./modules/menus");

const sampleAddress = process.argv[2];
const sampleInput = fs.readdirSync(process.argv[2]);

menus.mainMenu(sampleAddress, sampleInput);
fileOptions.saveList(sampleAddress, sampleInput);
