
document.getElementById("name-button").addEventListener('click', function() {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/", true);
    xhr.onreadystatechange = () => {
        if (xhr.status == 200) {
            location.reload();
        }
        else alert("something wrong");
    }
    xhr.setRequestHeader("Content-Type", "application/json")
    xhr.send(JSON.stringify({uname: document.getElementById('name').value}));
});