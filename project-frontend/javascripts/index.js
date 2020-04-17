document.addEventListener("DOMContentLoaded", function () {
	let main = document.getElementById("main");
	// pullWatchlists();
	attatchForm();
	pullWatchlists();
});
// Call to database to get all stocks then add them to DOM
async function pullWatchlists() {
	let data = await fetch("http://localhost:30001/watchlists");
	let lists = await data.json();
	main.innerHTML += `  <ul id="list"></ul>`;
	lists.forEach((list) => {
		let item = new Watchlist(list);
		console.log(item, list)
	
		insertNewWatchlist(item, list.id);
	});
	document
		.getElementById("new-watchlist-form")
		.addEventListener("submit", makeWatchlist);
}

// Create new watchList then make a post request to Backend to persist
async function makeWatchlist(event) {
	event.preventDefault();
	let name = document.getElementById("name").value;
	let watchlistParams = {
		watchlist: {
			name,
		},
	};
	let res = await fetch("http://localhost:30001/watchlists", {
		method: "POST",
		headers: {
			Accept: "Application/json",
			"Content-Type": "Application/json",
		},
		body: JSON.stringify(watchlistParams),
	});
	let wl = await res.json();
	insertNewWatchlist(wl);
}

function insertNewWatchlist(val, id) {
	main.insertAdjacentHTML('afterend',` <div id = "lists-in-watchlist"></div>`)
	
	document.getElementById("name").value = "";
	document.getElementById("list").insertAdjacentHTML(
		"afterbegin",
		`<div id="watchlist-item-${id}">
        <button id = "${id}"style="width: 15%;">
		<h5>${val.name}</h5>
        </button><br><button class = "delete-${id}">delete</button>
		</div>`
		);
		attatchButtonListener(id)
		deleteListener(id)
}

// Delete call to backend to remove watchlist
function deleteListener(id) {
	document.querySelector(`.delete-${id}`).addEventListener('click', async function () {
		let res = await fetch(`http://localhost:30001/watchlists/${id}`, {
			method: "DELETE",
			headers: {
				Accept: "Application/json",
				"Content-Type": "Application/json",
			}
		});
		document.getElementById(`watchlist-item-${id}`).remove()
	})
}
function attatchButtonListener(id) {
	document.getElementById(`${id}`).addEventListener('click',async function () {
		let data = await fetch(`http://localhost:30001/watchlists/${id}`);
		let lists = await data.json();
		let list = document.createElement('div', { id : 'watchlist-stocks' })
		if (list.stocks > 0) {
			lists.stocks.forEach(stock => {
				list.innerHTML+= `<div><h4 id="">${stock.ticker}</h4></div>`
			})
			
		}
		
	})
}

function attatchForm() {
	main.innerHTML += `<form id="new-watchlist-form" action="" method="post">
	<div>
		<label for="name">Name</label><br>
		<input type="text" name = "name" id="name"><br>
		<input type="submit" value = "Create Watchlist" id="">
	</div>
</form>`;
}