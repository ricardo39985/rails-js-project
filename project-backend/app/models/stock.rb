# frozen_string_literal: true

class Stock < ApplicationRecord
  has_many :stock_watchlists
  has_many :watchlists, through: :stock_watchlists
end
