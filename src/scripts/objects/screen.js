const screen = {
  userProfile: document.querySelector(".profile-data"),
  renderUser(user) {
    this.userProfile.innerHTML = `<div class="info">
                        <img src="${
                          user.avatarUrl
                        }" alt="foto do perfil do usuário" />
                        <div class="data">
                            <h1>${
                              user.name ?? "Não possui nome cadastrado 😑"
                            }</h1>
                            <p>${user.bio ?? "Não possui bio cadastrada 😑"}</p>
                            <p>${
                              user.userName ??
                              "Não possui nome de usuário cadastrada 😑"
                            }</p>
                            <spam>${user.following} seguidor(es) ▪</spam>
                            <spam> seguindo ${user.followers}</spam>

                        </div>
                    </div>`;

    let repositoriesItems = "";
    user.repositories.forEach(
      (repo) =>
        (repositoriesItems += `
        <li>
        <a href="${repo.html_url}" target="_blank">
        <div class="repo-name">${repo.name}</div>
                            <div class="info-repo">
                                <div class="itens-info-repo">🍴 ${
                                  repo.forks_count
                                }</div>
                                <div class="itens-info-repo">⭐ ${
                                  repo.stargazers_count
                                }</div>
                                <div class="itens-info-repo">👀 ${
                                  repo.watchers_count
                                }</div>
                                <div class="itens-info-repo">💻 ${
                                  repo.language ?? "--"
                                }</div>
                            </div>
        </a>
        </li>
        
        `)
    );

    if (user.repositories.length > 0) {
      this.userProfile.innerHTML += `<div class="repositories section">
                                            <h2>Repositórios</h2>
                                            <ul>${repositoriesItems}</ul>
                                            </div>`;
    } else if (user.repositories.length === 0) {
      this.userProfile.innerHTML += `<div class="repositories section">
                                    <h2>Repositórios</h2>
                                    <p class="others-type">Usuário não possui repositórios 👎🏻</p>
                                    </div>`;
    }
  },
  renderNotFound() {
    this.userProfile.innerHTML = "<h3>Usuário não encontrado 🕵🏼‍♀️</h3>";
  },

  renderEvent(event) {
    let eventsItems = "";
    event.event.forEach((event) => {
      if (event.type === "PushEvent") {
        eventsItems += `
                <li>
                    <div class="event-box">
                      <p class="event-name">${event.repo.name} - </p>
                      <p class="event-msg"> ${event.payload.commits[0].message}</p>
                    </div>
                </li>`;
      } else if (event.type === "CreateEvent") {
        eventsItems += `
                <li>
                    <div class="event-box">
                      <p class="event-name">${event.repo.name} - </p>
                      <p class="event-msg"> ${event.payload.description}</p>
                    </div>
                </li>`;
      }
    });

    if (event.event.length > 0) {
      this.userProfile.innerHTML += `
        <div class="events-items">
            <h2>Eventos</h2>
            <ul class="list">${eventsItems}</ul>
        </div>`;
    } else if (event.event.length === 0) {
      this.userProfile.innerHTML += `
        <div class="events-items">
            <h2>Eventos</h2>
            <p class="others-type">Usuário não possui eventos 👎🏻</p>
        </div>`;
    } else if (
      event.event.type != "CreateEvent" &&
      event.event.type != "PushEvent" &&
      event.event.length < 0
    ) {
      this.userProfile.innerHTML += `
        <p class="others-type">Usuário não possui eventos 👎🏻</p>`;
    }
  },
};

export { screen };
