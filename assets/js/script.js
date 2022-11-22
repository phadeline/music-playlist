// Get the input field
var input = document.getElementById("myInput");

var deezer = document.getElementById("deezer");

var ul = document.createElement("ul");

deezer.appendChild(ul);

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
          li.appendChild(video);
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
        "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
      },
    };

    fetch(
      "https://deezerdevs-deezer.p.rapidapi.com/search?q=" + search,
      options
    )
      .then((response) => response.json())
      .then((response) => console.log(response));

    // .then(function (data) {
    //     console.log(data);
    //   });

    // .catch(err => console.error(err));

    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    // document.getElementById("myBtn").click();
  }
});
