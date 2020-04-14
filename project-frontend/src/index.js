console.log("testing...");
document.addEventListener("DOMContentLoaded", function () {
  let main = document.getElementById("main");
  const baseUrl = `https://localhost:30001`
	renderLanding();
	landingListeners();
});

function renderLanding() {
	main.innerHTML = ` <button id = "login-button">Login</button> 
  <button id ="signup">Signup</button>`;
}

function landingListeners() {
	document.querySelectorAll("button").forEach((button) => {
		let action = button.innerText;
		button.addEventListener("click", (e) => {
			renderform(action);
			submitForm(action);
		});
	});
}


function renderform(label) {
	main.innerHTML = `<form id ='${label}' action="" method="post">
    <label for="email">Email</label>
    <input type="text" name="email" id="email">
    <label for="password">Password</label>
    <input type="text"name = "password" id = 'password'>
    <input  type="submit" value="${label}">
  </form>`;
}

async function submitForm(label) {
	document.getElementById(`${label}`).addEventListener("submit", (e) => {
		e.preventDefault();
		let email = e.srcElement.querySelectorAll("input")[0].value;
		let pw = e.srcElement.querySelectorAll("input")[1].value;
		
	});
}

