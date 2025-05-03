let account = document.querySelector(".account");
let h1 = document.querySelector(".account h1");
function getUserInfo(username) {
  if (username === "") {
    account.innerHTML = `<h1>You've given a blank space!</h1> `;
  } else {
    fetch(`https://api.github.com/users/${username}`)
      .then((raw) => raw.json())
      .then((data) => {
        if (data.status === "404") {
          document.querySelector(".account h1").innerHTML =
            "Id is not found or Give a valid ID";
        } else {
          account.innerHTML = `
            <div class="content">
              <div class="left">
                <div class="picture">
                  <img src="${data.avatar_url}" alt="">
                </div>
                <div class="infos">
                  <h3 class="name">${data.login}</h3>
                  <h4 class="repos"> Repos : <span>${data.public_repos}<span></span></h4>
                  <h4 class="followers">Followers : <span>${data.followers}</span></h4>
                  <h4 class="following">Following : <span>${data.following}</span></h4>
                </div>
                <button id="btn2" onclick="window.open('${data.html_url}', '_blank')">View On GitHub</button>
              </div>
              <div class="line"></div>
              <div class="right"></div>
            </div>
          `;
          getUserRepo(username);
        }
      });
  }
}

function getUserRepo(username) {
  fetch(`https://api.github.com/users/${username}/repos`)
    .then((raw) => raw.json())
    .then((data) => {
      // console.log(data);
      var sum = "";
      data.forEach((elem) => {
        sum += `<div class="repo">
                <h3 class="name">${elem.name}</h3>
                <div class="r-bottom">
                  <div class="left">
                    <div class="language">
                      <div class="dot"></div>
                      <h4>${elem.language}</h4>
                    </div>
                    <div class="star">
                      <i class="ri-star-line"></i>
                      <h4>${elem.stargazers_count}</h4>
                    </div>
                  </div>
                  <button class="linkBtn" onclick="window.open('${elem.html_url}', '_blank')">Link</button>
                </div>          
              </div>
      `;
        document.querySelector(".right").innerHTML = sum;
      });
    });
}

let form = document.querySelector("form");
let inp = document.querySelector("#inp");
form.addEventListener("submit", function (e) {
  e.preventDefault();
  getUserInfo(inp.value.trim());
});