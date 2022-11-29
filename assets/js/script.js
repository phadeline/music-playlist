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
    ul.textContent = " ";
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
          var songname = document.createElement("p");
          var video = document.createElement("video");
          songname.textContent = data.data[i].title;
          video.setAttribute("src", data.data[i].preview);
          video.setAttribute("controls", "controls");
          li.setAttribute("class", "video");
          let image = data.data[i].album.cover_medium;
          li.style.cssText =
            "background-image: url(' " + image + " '); list-style-type: none;";
          songname.style.cssText =
            "background-color: pink; color: black; font-size: 30px";
          li.appendChild(songname);
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
    ulshazaam.textContent = " ";
    console.log(search);

    fetch("https://itunes.apple.com/search?term=" + search + "&media=music")
      .then((response) => response.json())
      .then(function (data) {
        console.log(data);
        for (let i = 0; i < 10; i++) {
          var li = document.createElement("li");
          var ptitle = document.createElement("p");
          var video = document.createElement("video");
          let image = data.results[i].artworkUrl100;
          ptitle.textContent = data.results[i].trackName;
          ptitle.style.cssText =
            "background-color: pink; color: black; font-size: 30px";
          video.setAttribute("src", data.results[i].previewUrl);
          video.setAttribute("controls", "controls");
          li.style.cssText =
            "background-image: url(' " + image + " '); list-style-type: none;";
          li.setAttribute("class", "songs");
          li.appendChild(ptitle);
          li.appendChild(video);
          li.setAttribute("draggable", "true");
          ulshazaam.appendChild(li);
        }
      });
  }
});

// drag and drop for Itunes
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
    // for (let i = 0; i < )
    event.target.appendChild(dragged);
    let title = $(dragged).children("p").text();
    let videourl = $(dragged).children("video").attr("src");
    let backgroundimage = $(dragged).css("background-image");
    let playlists = JSON.parse(localStorage.getItem("playlistsongs")) || [];
    playlists.push({
      thetitle: title,
      thevideo: videourl,
      theimage: backgroundimage,
    });
    localStorage.setItem("playlistsongs", JSON.stringify(playlists));
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
    event.target.appendChild(dragged);
    var button = document.createElement("button");

    button.textContent = "Remove";
    dragged.appendChild(button);

    button.addEventListener("click", function () {
      button.parentNode.remove();
    });
  }
});

$(document).ready(function () {
  let value = JSON.parse(localStorage.getItem("playlistsongs")) || [];
  let playlistdata = $("#playlist");

  for (let i = 0; i < value.length; i++) {
    var li = $("<li>");
    $(li).css({ "list-style-type": "none" });
    $(li).css({ "background-image": value[i].theimage });
    var p = $("<p>");
    p.text(value[i].thetitle);
    $(p).css({ "background-color": "pink", color: "black" });
    $(li).append(p);

    var videos = $("<video>");
    videos.attr("src", value[i].thevideo);
    videos.attr("controls", "controls");
    $(li).append(videos);

    var p2 = $("<p>");
    var button2 = $("<button>");
    button2.text("Remove");
    $(p2).append(button2);
    $(li).append(p2);
    $(playlistdata).append(li);
  }
});
