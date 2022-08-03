window.addEventListener("DOMContentLoaded", () => {
  const body = document.querySelector("body");
  let textNodes = [];

  function recurcy(element) {
    element.childNodes.forEach((node) => {
      if (node.nodeName.match(/^H\d/)) {
        const obj = {
          header: node.nodeName,
          content: node.textContent,
        };
        textNodes.push(obj);
      } else {
        recurcy(node);
      }
    });
  }
  recurcy(body);

  fetch("http://localhost:3000/nodes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(textNodes),
  }).then(() => console.log("Succeeded"));
});
