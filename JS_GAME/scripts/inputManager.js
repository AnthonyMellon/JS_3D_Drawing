var currentKeys = [];

document.addEventListener('keypress', (event) => {
    var name = event.key;

    if(currentKeys.indexOf(name) === -1) { //ensure the current key isnt already in the currentkeys array, then push it to the array
        currentKeys.push(name);
    }
    
});

document.addEventListener('keyup', (event) => {
    var name = event.key;

    const index = currentKeys.indexOf(name);
    if(index > -1) {
        currentKeys.splice(index, 1);
    };
});