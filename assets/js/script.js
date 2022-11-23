// Get the input field
var input = document.getElementById("myInput");

var deezer = document.getElementById("deezer");

var ul = document.createElement("ul");

deezer.appendChild(ul);

var shazaam = document.getElementById("shazaam");
var ulshazaam = document.createElement("ul");
shazaam.appendChild(ulshazaam);

// Execute a function when the user presses a key on the keyboard
input.addEventListener("keypress", function (event) {
  // If the user presses the "Enter" key on the keyboard
  var search = document.getElementById("myInput").value;
  if (event.key === "Enter") {
    console.log(search);
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "ee310b7c05mshc4b96b46b4c303ap188ee9jsn3ab3d55f6f28",
        "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
      },
    };

    fetch(
      "https://deezerdevs-deezer.p.rapidapi.com/search?q=" + search,
      options
    )
      .then((response) => response.json())
      .then(function (data) {
        console.log(data);

        for (let i = 0; i < 10; i++) {
          var li = document.createElement("li");
          var video = document.createElement("video");
          video.setAttribute("src", data.data[i].preview);
          video.setAttribute("controls", "controls");
          li.textContent = data.data[i].title;
          li.setAttribute("class", "video");
          li.appendChild(video);
          li.setAttribute("draggable", "true");
          ul.appendChild(li);
        }
      });
    event.preventDefault();
  }
});

// Execute a function when the user presses a key on the keyboard
input.addEventListener("keypress", function (event) {
  // If the user presses the "Enter" key on the keyboard
  var search = document.getElementById("myInput").value;
  if (event.key === "Enter") {
    console.log(search);
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "ee310b7c05mshc4b96b46b4c303ap188ee9jsn3ab3d55f6f28",
        "X-RapidAPI-Host": "shazam.p.rapidapi.com",
      },
    };

    fetch(
      "https://shazam.p.rapidapi.com/search?term=" +
        search +
        "&locale=en-US&offset=0&limit=5",
      options
    )
      .then((response) => response.json())
      .then(function (data) {
        console.log(data.tracks.hits[4].track.key);
        var key = data.tracks.hits[4].track.key;

        fetch(
          "https://shazam.p.rapidapi.com/songs/list-recommendations?key=" +
            key +
            "&locale=en-US",
          options
        )
          .then((response) => response.json())
          .then(function (data) {
            console.log(data);
            for (let i = 0; i < 10; i++) {
              var li = document.createElement("li");
              var video = document.createElement("video");
              video.setAttribute("src", data.tracks[i].hub.actions[1].uri);
              video.setAttribute("controls", "controls");
              li.textContent = data.tracks[i].title;
              li.setAttribute("class", "songs");
              li.appendChild(video);
              li.setAttribute("draggable", "true");
              ulshazaam.appendChild(li);
            }
          });
      });
  }
});

// drag and drop for Shazaam
let dragged = null;

const source = document.getElementById("shazaam");
source.addEventListener("dragstart", (event) => {
  // store a ref. on the dragged elem
  dragged = event.target;
});

const target = document.getElementById("playlist");
target.addEventListener("dragover", (event) => {
  // prevent default to allow drop
  event.preventDefault();
});

target.addEventListener("drop", (event) => {
  // prevent default action (open as link for some elements)
  event.preventDefault();
  // move dragged element to the selected drop target
  if (event.target.className === "is-one-third") {
    dragged.parentNode.removeChild(dragged);
    event.target.appendChild(dragged);
  }
});

//drag and drop for deezer

const deezersource = document.getElementById("deezer");
deezersource.addEventListener("dragstart", (event) => {
  // store a ref. on the dragged elem
  dragged = event.target;
});

const deezertarget = document.getElementById("playlist");
deezertarget.addEventListener("dragover", (event) => {
  // prevent default to allow drop
  event.preventDefault();
});

deezertarget.addEventListener("drop", (event) => {
  // prevent default action (open as link for some elements)
  event.preventDefault();
  // move dragged element to the selected drop target
  if (event.target.className === "is-one-third") {
    dragged.parentNode.removeChild(dragged);
    event.target.appendChild(dragged);
  }
});
