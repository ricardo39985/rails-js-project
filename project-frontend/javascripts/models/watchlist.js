class Watchlist {
	static all = [];
	constructor(data) {
		this.name = data.name;
		this.stocks = data.stocks;
		this.id = data.id;
		this.save();
	}
	save() {
		Watchlist.all.push(this);
	}
	renderdiv() {
		return `<div id="watchlist-item-${this.id}">
		<div class="card-panel">
        <button class = "waves-effect waves-light btn" id = "${this.id}"style="width: 15%;">
		<h5 id = "h5-${this.id}">${this.name}</h5>
        </button><br><button class = "delete-${this.id}">Delete</button><br>
    </div>
		</div><br>`;
	}
}
