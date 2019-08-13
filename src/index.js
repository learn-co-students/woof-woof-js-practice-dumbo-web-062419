document.addEventListener("DOMContentLoaded", function(){
 fetch("http://localhost:3000/pups")
 .then(response => response.json())
 .then(data => renderDogs(data))
})
// ____________________________________________________
function renderDogs(data){
 const dogBar = document.getElementById("dog-bar")
 data.forEach(function(dog){
 dogBar.innerHTML +=
 `
 <span data-id="${dog.id}" class="dog-span">
   ${dog.name}
 </span>
 `
 })
 dogBar.addEventListener("click", dogDetail)
}
// ____________________________________________________
function dogDetail(event) {
 const dogInfo = document.getElementById("dog-info")
 const dogID = event.target.dataset.id
 if (event.target.classList.contains("dog-span")){
   fetch(`http://localhost:3000/pups/${dogID}`)
   .then(resp => resp.json())
   .then(data => individualDogInfo(data))
 }
}
function individualDogInfo (data) {
 const dogInfo = document.getElementById("dog-info")
 console.log(data.id);
 dogInfo.innerHTML =
`
<div>
 <img src="${data.image}"/>
 <h2>${data.name}</h2>
 <button data-id="${data.id}"id="boy"class="good-bad-dog" value=${data.isGoodDog}> Is a good boy ${data.isGoodDog}</button>
</div>
`
 dogInfo.addEventListener("click", goodBadDogCheck)
}
function goodBadDogCheck(event) {
// const button = event.target.classList.contains("good-bad-dog")
const button = document.getElementById('boy')
const doggoId = event.target.dataset.id
console.log(button.value);
// console.log(typeof button.value);
fetch(http://localhost:3000/pups/${doggoId}, {
 method: "PATCH",
 headers: {
   "Accept": "application/json",
   "Content-Type": "application/json"
 },
 body: JSON.stringify({
   isGoodDog: button.value === "true"
 })
})
.then(resp => resp.json())
// .then(individualDogInfo)
 if (event.target.classList.contains("good-bad-dog")) {
   // console.log(button.value)
   if (button.value == "false"
   ){
   button.value === "true"
 }
 else {button.value = "false"}
 }
}
