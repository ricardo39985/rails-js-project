# frozen_string_literal: true

class Watchlist < ApplicationRecord
  has_many :stock_watchlists, dependent: :delete_all
  has_many :stocks, through: :stock_watchlists
end
