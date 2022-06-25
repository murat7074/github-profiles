class UI {
  constructor() {
    this.main = document.getElementById("main");
    this.searchedUsers = document.getElementById("last-users");
    this.reposEl = document.getElementById("repos");
  }

  showUser(user) {
    const cardHTML = `
   <div class="card">
        <div>
            <img class="avatar" src="${user.avatar_url}" alt="${user.name}" />
        </div>
        <div class="user-info">
            <h2>${user.name}</h2>
            <p>${user.bio}</p>

            <ul class="info">
                <li>${user.followers}<strong>Followers</strong></li>
                <li>${user.following}<strong>Following</strong></li>
                <li>${user.public_repos}<strong>Repos</strong></li>
            </ul>
         
           
        </div>
    </div>
`;

    this.main.innerHTML = cardHTML;
  }

  showRepo(repos) {
    this.reposEl.innerHTML = "";

    repos
      .sort((a, b) => b.stargazers_count - a.stargazers_count) // çok yıldız alandan az alana doğru sıraladık
      .slice(0, 10)
      .forEach((repo) => {
        const repoEl = document.createElement("a");

        repoEl.classList.add("repo");
        repoEl.href = repo.html_url;
        repoEl.target = "_blank";
        repoEl.innerText = repo.name;

        this.reposEl.appendChild(repoEl);
      });
  }

  addSearchedUserToUI(username) {
    let users = Storage.getSearchedUsersFromStorage();

    if (users.indexOf(username) === -1) {
      const li = document.createElement("li");
      li.classList = "list-group-item";
      li.textContent = username;
      this.searchedUsers.appendChild(li);
    }
  }

  clearAllSearchedFromUI() {
    while (this.searchedUsers.firstElementChild !== null) {
      this.searchedUsers.removeChild(this.searchedUsers.firstElementChild);
    }
  }
}
