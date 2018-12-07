function oneclicked() {
    var xhr = new XMLHttpRequest();
    xhr.open("get", "/clicked", true);
    xhr.onreadystatechange = ()=>{
        if (xhr.status == 200) {
            location.reload();
        }
    }
    xhr.send();
}
butt.addEventListener('click', oneclicked);

