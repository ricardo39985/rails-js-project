class CreateStockWatchlists < ActiveRecord::Migration[6.0]
  def change
    create_table :stock_watchlists do |t|
      t.belongs_to :stock, null: false, foreign_key: true
      t.belongs_to :watchlist, null: false, foreign_key: true

      t.timestamps
    end
  end
end
