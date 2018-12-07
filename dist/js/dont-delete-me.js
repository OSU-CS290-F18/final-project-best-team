function oneclicked() {
    var xhr = new XMLHttpRequest();
    xhr.open("get", "/clicked", true);
    xhr.send();
}
butt.addEventListener('click', oneclicked);

