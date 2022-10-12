function printHighscores() {
  // either get scores from localstorage or set to empty array
  var highScores = JSON.parse(window.localStorage.getItem('highScores')) || [];
console.log (highscores)
  // sort highscores by score property in descending order
  highScores.sort(function (a, b) {
    return b.score - a.score;
  });
  console.log(highScores)

  for (var i = 0; i < highScores.length; i += 1) {
    // create li tag for each high score
    var liTag = document.createElement('li');
    liTag.textContent = highScores[i].user+ ' - ' + highScores[i].score;

    // display on page
    var olEl = document.getElementById('highscores');
    olEl.appendChild(liTag);
  }
}

function clearHighscores() {
  window.localStorage.removeItem('highScores');
  window.location.reload();
}

document.getElementById('clear').onclick = clearHighscores;

// run function when page loads
printHighscores();