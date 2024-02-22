

const nestedMenuOptions = [
  "Nested Option 1",
  "Nested Option 2",
  "Nested Option 3",
];

menu(sampleAddress, sampleInput);
// term.cyan( 'What do you want to do?\n' ) ;

let songs = ["Song 1", "Song 2", "Song 3"];

var menus = ["Show all Songs", "Show Favorite Songs", "Exit"];

const menu = (address, list) => {
  const menuItems = ["Show all Song List", "Show Favorite Songs", "Search","Exit"];
  const selectedMusicMenu = ["Play Song", "Add to Favorites", "Exit"];

  term.singleColumnMenu(menuItems, { cancelable: true }, (error, response) => {
    if (response.selectedIndex === 0) {
      console.log("Displaying Song List:");
      term.singleColumnMenu(list, { cancelable: true }, (error, response) => {
        if (response.selectedIndex !== undefined) {
          term.singleColumnMenu(selectedMusicMenu,{ cancelable: true },(error, response) => {
              if (response.selectedIndex == 0) {
                openFile(`${address}/${list[response.selectedIndex]}`);
                console.log(`Playing song: ${address}/${list[response.selectedIndex]}`);
              }if (response.selectedIndex == 1) {
                favChange(address,list[response.selectedIndex])
              }if (response.selectedIndex == 2) {
              process.exit();
              }
              process.exit();
            }
          );
        } else {
          process.exit();
        }
      });
    }if (response.selectedIndex === 1) {
      let faveList = favRead(address,list);
      term.singleColumnMenu(faveList,{cancelable:true},(error,result) => {
        //FAVSTART
        if (faveList.length === 0) {
          console.log("The song list is empty.");
          process.exit();
        }if (response.selectedIndex !== undefined) {
          term.singleColumnMenu(selectedMusicMenu,{ cancelable: true },(error, response) => {
              if (response.selectedIndex == 0) {
                openFile(`${address}/${faveList[response.selectedIndex]}`);
                console.log(`Playing song: ${address}/${faveList[response.selectedIndex]}`);
              }if (response.selectedIndex == 1) {
                favChange(address,faveList[response.selectedIndex])
              }if (response.selectedIndex == 2) {
              process.exit();
              }
              process.exit();
            }
          );
        } else {
          process.exit();
        }
        //FAVEND
      })
    }if (response.selectedIndex === 2) { 
      //Search
      process.exit();
    }else {
      process.exit();
    }
  });
};