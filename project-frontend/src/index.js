console.log("testing...");
document.addEventListener("DOMContentLoaded", function () {
	let main = document.getElementById("main");
	renderLanding();
});
function renderLanding() {
	main.innerHTML = ` <button id = "login">Login</button> 
  <button id ="signup">Signup</button>`;
	document.querySelectorAll("button").forEach((button) => {
    let action = button.innerText
		button.addEventListener("click", (e) => {
      if (action === 'Signup' ) {
        
      } else {
        renderLogin()
      }
    });
	});
}

function renderLogin() {
	main.innerHTML = `   <form action="http://localhost:30001/sessions" method="post">
  <label for="email"></label>
  <input type="text" name="email" id="email">
  <label for="password"></label>
  <input type="text"name = "password" id = 'password'>
  <input type="submit" value="Login">
</form>`;
}
