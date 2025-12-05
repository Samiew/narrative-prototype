let story = {};

async function loadStory() {
  const response = await fetch("story.json");
  story = await response.json();
  displayScene(story.start);
}

function displayScene(scene) {
  document.getElementById("title").innerText = scene.title;
  document.getElementById("text").innerText = scene.text;

  const choicesBox = document.getElementById("choices");
  choicesBox.innerHTML = "";

  if (!scene.choices || scene.choices.length === 0) {
    const btn = document.createElement("button");
    btn.innerText = "Play Again";
    btn.onclick = () => displayScene(story.start);
    choicesBox.appendChild(btn);
    return;
  }

  scene.choices.forEach(choice => {
    const btn = document.createElement("button");
    btn.innerText = choice.text;
    btn.onclick = () => displayScene(story[choice.next]);
    choicesBox.appendChild(btn);
  });
}

loadStory();
