// Get the input field
var input = document.getElementById("myInput");

var video = document.createElement("video");

var deezer = document.getElementById("deezer");

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
        console.log(data.data[0].preview);
        var ul = document.createElement("ul");
        var li = document.createElement("li");
        video.setAttribute("src", data.data[0].preview);
        video.setAttribute("controls", "controls");
        li.textContent = data.data[0].title;
        li.appendChild(video);
        ul.appendChild(li);
        deezer.appendChild(ul);
      });
    event.preventDefault();
  }
});
