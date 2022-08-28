let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
    const paragraphBtn = document.querySelector("#new-toy-btn");
    const toyFormContainerDiv = document.querySelector(".container");
    paragraphBtn.addEventListener("click", () => {
        // hide & seek with the form
        addToy = !addToy;
        if (addToy) {
            toyFormContainerDiv.style.display = "block";
        } else {
            toyFormContainerDiv.style.display = "none";
        }
    });
});

function gettingCard(toyData) {
    let card = document.createElement('div')
    card.className = `card`
    card.innerHTML = `
  <h2>${toyData.name}</h2>
  <img src="${toyData.image}" class="toy-avatar" />
  <p>${toyData.likes} likes</p>
  <button class="like-btn" id="[toy_id]">Like ❤️</button>
  `
    card.querySelector('.like-btn').addEventListener('click', () => {
        let totalLikes = toyData.likes += 1
        card.querySelector('p').textContent = totalLikes + ' likes'
        likes(toyData)
    })
    document.querySelector('#toy-collection').appendChild(card)
}

function likes(toyLikes) {
    fetch(`http://localhost:3000/toys/${toyLikes.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(toyLikes)
        })
        .then(res => res.json())
        .then(toy => console.log(toy))
}

function getAllToys() {
    fetch('http://localhost:3000/toys')
        .then(response => response.json())
        .then(toyData => toyData.forEach(toy => gettingCard(toy)))
}
getAllToys()

function addingToyPost(toyObj) {
    fetch('http://localhost:3000/toys', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: "application/json"
            },
            body: JSON.stringify(toyObj)
        })
        .then(res => res.json())
}
addingToyPost()