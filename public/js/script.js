const links = document.querySelectorAll(".listLink");

for (let i = 0; i < links.length; i++) {
  links[i].addEventListener("click", (e) => {
    fetch(`/switch?id=${links[i].name}`).then((response) => {
      if (response.ok) {
        window.location.href = "/";
        return;
      }
      throw new Error("Request failed.");
    });
  });
}

const deleteListLinks = document.querySelectorAll(".deleteListLink");
for (let i = 0; i < deleteListLinks.length; i++) {
  deleteListLinks[i].addEventListener("click", (e) => {
    fetch(`/deletelist?id=${deleteListLinks[i].name}`).then((response) => {
      if (response.ok) {
        window.location.href = "/";
        return;
      }
      throw new Error("Request failed.");
    });
  });
}

const deleteTaskLinks = document.querySelectorAll(".deleteTaskLink");
for (let i = 0; i < deleteTaskLinks.length; i++) {
  deleteTaskLinks[i].addEventListener("click", (e) => {
    fetch(`/deletetask?id=${deleteTaskLinks[i].name}`).then((response) => {
      if (response.ok) {
        window.location.href = "/";
        return;
      }
      throw new Error("Request failed.");
    });
  });
}

const checkbox = document.querySelectorAll(".checkbox");
for (let i = 0; i < checkbox.length; i++) {
  checkbox[i].addEventListener("click", (e) => {
    fetch(`/check?id=${checkbox[i].name}`).then((response) => {
      if (response.ok) {
        window.location.href = "/";
        return;
      }
      throw new Error("Request failed.");
    });
  });
}