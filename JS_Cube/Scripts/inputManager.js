var currentKey;

document.addEventListener('keydown', (event) => {

    var name = event.key;
    var code = event.code;

    currentKey = name;
}, false)

document.addEventListener('keyup', (event) => {
    var name = event.key;
    var code = event.code;

    currentKey = undefined;
})



