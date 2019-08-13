document.addEventListener("DOMContentLoaded", () => {
  const dogBar = document.getElementById("dog-bar")
  fetch("http://localhost:3000/pups")
  .then(res => res.json())
  .then(renderAllDogs)

  function renderAllDogs(dogData){
     dogData.forEach(renderDog)
  }

  function renderDog(dog) {
    const dogSpan = document.createElement("span")
    dogSpan.dataset.id = dog.id
    dogSpan.className = "doggo"
    dogSpan.innerText = dog.name
    dogBar.append(dogSpan)
  }

  dogBar.addEventListener("click", () => {
    if(event.target.classList.contains("doggo")){
      fetch(`http://localhost:3000/pups/${event.target.dataset.id}`)
      .then(res => res.json())
      .then(displayDog)
    }
  })
    function displayDog(dog) {
      const dogDiv = document.getElementById("dog-info")
      dogDiv.innerHTML = `
      <img src="${dog.image}">
      <h2>${dog.name}</h2>
      <button id="good-btn" data-id="${dog.id}">${isGood(dog.isGoodDog)}</button>
      `
      const goodBtn = document.getElementById("good-btn")
      goodBtn.addEventListener("click", () => {
        dog.isGoodDog = !dog.isGoodDog
        console.log(dog.isGoodDog)
        fetch(`http://localhost:3000/pups/${dog.id}`, {
          method: "PATCH",
          headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
          },
          body: JSON.stringify({
              isGoodDog: dog.isGoodDog
          })
        }).then(res => res.json())
          .then((dogData) => {
            goodBtn.innerText = isGood(dogData.isGoodDog)
          })
      })
  }
  function isGood(sts){
      return sts ? "Good Dog!" : "Bad Dog!" //ternary operator
  }
})
