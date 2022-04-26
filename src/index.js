
let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  

});

function addItem(toPost){
  let url = "http://localhost:3000/toys/"

  return fetch(url, toPost)
  .then(res => res.json())
  .then(data => console.log(data))
}


let myForm = document.querySelector('form')
  

myForm.addEventListener('submit', (e)=> {
  e.preventDefault()
  let names = document.getElementById('name')
  let images = document.getElementById('image')
  let thename = names.value
  let theImage = images.value
  console.log(`${theImage}, ${thename}`)
  let toPost = {
    method : "POST",
    headers : {
      "Content-Type" : "application/json",
      Accept : "application/json",
    },
    body : JSON.stringify(
      {
        name : thename,
        image : theImage,
        likes : 0
      }
    )
  }
  addItem(toPost)
})

// display Elements

let toyColl = document.getElementById('toy-collection')

fetch(' http://localhost:3000/toys/')
.then( res => res.json())
.then(displayItem)

function displayItem(dataset){
  dataset.forEach(data => {
    let card = document.createElement('div')
    card.className = "card"
    let h1 = document.createElement('h2')
    h1.innerHTML = data.name
    let img = document.createElement('img')
    img.src = data.image
    img.className = "toy-avatar"
    let p = document.createElement('p')
    p.innerHTML = `${data.likes} Likes`
    let btn = document.createElement('button')
    btn.id = data.id
    btn.className = 'like-btn';
    btn.innerText= "like"
    toyColl.appendChild(card)
    card.appendChild(h1)
    card.appendChild(img)
    card.appendChild(p)
    card.appendChild(btn)
    btn.addEventListener('click', ()=> {
      data.likes += 1;
      updateLike(data)
    })
  });
  


}

function updateLike(data){
  fetch(`http://localhost:3000/toys/${data.id}`, {
    method : "PATCH",
    headers : {
      "Content-Type" : "application/json"
    },
    body : JSON.stringify(data)
  })
  .then()
}