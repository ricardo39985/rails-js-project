class Watchlist {
    static all = []
    constructor(data) {
        this.name = data.name
        this.stocks = data.stocks
        this.id = data.id
        this.save
    }
    save(){
        Watchlist.all.push(this)
    }
}