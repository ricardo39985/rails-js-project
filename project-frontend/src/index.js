console.log("testing...");
document.addEventListener("DOMContentLoaded", function () {
  renderLanding()
  
});
function renderLanding() {
	document.getElementById("main").innerHTML = ` <button id = "login">Login</button> 
  <button id ="signup">Signup</button>`;
  document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', (e)=> console.log(e.target.innerText))
  });
}
