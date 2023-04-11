import { getUser } from "./services/user.js";
import { getRepositories } from "./services/repositories.js";
import { getEvents } from "./services/events.js";

import { user } from "./objects/user.js";
import { screen } from "./objects/screen.js";
import { event } from "./objects/event.js";

document.getElementById("btn-search").addEventListener("click", () => {
  const userName = document.getElementById("input-search").value;
  if (validateEmptyInput(userName)) return;
  getUserData(userName);
});

document.getElementById("input-search").addEventListener("keyup", (event) => {
  const userName = event.target.value;
  const key = event.which || event.keyCode;
  const isEnterIsPress = key === 13;

  if (isEnterIsPress) {
    if (validateEmptyInput(userName)) return;
    getUserData(userName);
  }
});

function validateEmptyInput(userName) {
  if (userName.length === 0) {
    alert("Preencha o campo com nome do usuário no GitHub🚫");
    return true;
  }
}

async function getUserData(userName) {
  const userResponse = await getUser(userName);

  if (userResponse.message === "Not Found") {
    screen.renderNotFound();
    return;
  }

  const repositoriesResponse = await getRepositories(userName);
  const eventsResponse = await getEvents(userName);

  user.setInfo(userResponse);
  user.setRepositories(repositoriesResponse);

  event.setEvents(eventsResponse);

  screen.renderUser(user);
  screen.renderEvent(event);
}
