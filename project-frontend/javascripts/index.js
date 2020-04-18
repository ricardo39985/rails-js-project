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
		insertNewWatchlist.call(item);
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
	let newWachlist = new Watchlist(wl);
	insertNewWatchlist(newWachlist);
}
// Insert watchlist returned by backend into the DOM
function insertNewWatchlist() {
	console.log(this);
	main.insertAdjacentHTML("afterend", ` <div id = "lists-in-watchlist"></div>`);

	document.getElementById("name").value = "";
	document
		.getElementById("list")
		.insertAdjacentHTML("afterbegin", this.renderdiv());
	attatchButtonListener(this.id);
	deleteListener(this.id);
	addClickForList.call(this)
}

// Delete call to backend to remove watchlist
function deleteListener(id) {
	document
		.querySelector(`.delete-${id}`)
		.addEventListener("click", async function () {
			let res = await fetch(`http://localhost:30001/watchlists/${id}`, {
				method: "DELETE",
				headers: {
					Accept: "Application/json",
					"Content-Type": "Application/json",
				},
			});
			document.getElementById(`watchlist-item-${id}`).remove();
		});
	colorDelete(id);
}

function colorDelete(id) {
	document.querySelector(`.delete-${id}`).addEventListener("mouseover", (e) => {
		document.querySelector(`.delete-${id}`).style.color = "red";
		document.querySelector(`.delete-${id}`).style.scale = 1.5;
	});
	document
		.querySelector(`.delete-${id}`)
		.addEventListener("mouseleave", (e) => {
			document.querySelector(`.delete-${id}`).style.color = "";
		});
}

function attatchButtonListener(id) {
	document.getElementById(`${id}`).addEventListener("click", async function () {
		let data = await fetch(`http://localhost:30001/watchlists/${id}`);
		let lists = await data.json();
		let list = document.createElement("div", { id: "watchlist-stocks" });
		if (list.stocks > 0) {
			lists.stocks.forEach((stock) => {
				list.innerHTML += `<div><h4 id="">${stock.ticker}</h4></div>`;
			});
		}
	});
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

function addClickForList() {
	console.log(`click`, this);
	document.getElementById(`h5-${this.id}`).addEventListener(`click`, () => {
		main.innerHTML = `<div>
		<div>${this.name}</div>
		<div>
		</div>
	</div>`;
	});
}
