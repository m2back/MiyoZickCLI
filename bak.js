const term = require('terminal-kit').terminal;

const initialMenu = [
    'Option 1',
    'Option 2',
    'Option 3'
];

const nestedMenuOptions = [
    'Nested Option 1',
    'Nested Option 2',
    'Nested Option 3'
];

function displayInitialMenu() {
    term.singleColumnMenu(initialMenu, { cancelable: true }, (error, response) => {
        if (response.selectedIndex !== undefined) {
            displayNestedMenu();
        } else {
            process.exit();
        }
    });
}

function displayNestedMenu() {
    term.singleColumnMenu(nestedMenuOptions, { cancelable: true }, (error, response) => {
            process.exit();
    });
}

// Start by displaying the initial menu
displayInitialMenu();
