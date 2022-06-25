const form = document.getElementById("form");
const search = document.getElementById("search");

const divAlert = document.getElementById("divAlert");

const clearLastUsers = document.getElementById("clear-last-users");
const searchedUsers = document.getElementById("last-users");

const git = new Github();
const ui = new UI();

defaultUser();

eventlisteners();

function eventlisteners() {
  document.addEventListener("DOMContentLoaded", getAllSearched);
  clearLastUsers.addEventListener("click", clearAllSearched);
}

async function defaultUser() {
  let username = "murat7074";
  let user = await git.getUser(username);
  let repos = await git.getRepos(username);
  ui.showUser(user);
  ui.showRepo(repos);
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  let username = search.value;

  let user = await git.getUser(username);
  let repos = await git.getRepos(username);

  if (user.message === "Not Found") {
    showError("Kullanıcı Bulunamadı");
    defaultUser();
  } else {
    ui.showUser(user);
    ui.showRepo(repos);

    ui.addSearchedUserToUI(username);
    Storage.addSearchedUsersToStorage(username);
  }

  search.value = "";
});

function getAllSearched() {
  let users = Storage.getSearchedUsersFromStorage();

  let result = "";

  users.forEach((user) => {
    result += `<li class="list-group-item">${user}</li>`;
  });

  searchedUsers.innerHTML = result;
}

function clearAllSearched() {
  if (confirm("Emin misiniz ?")) {
    Storage.clearAllSearchedUsersFromStorage();
    ui.clearAllSearchedFromUI();
  }
}

function showError(message) {
  const div = document.createElement("div");

  div.classList.add("alertdiv");

  div.innerText = message;

  divAlert.appendChild(div);

  setTimeout(function () {
    div.remove();
  }, 2000);
}
