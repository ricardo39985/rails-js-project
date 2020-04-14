# frozen_string_literal: true

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# Watchlist has:
# NAme
require 'faker'
20.times do
  Watchlist.create(
    name: Faker::Games::Pokemon.name
  )
end
Watchlist.all.each do |watchlist|
  20.times do
    watchlist.stocks << Stock.create(
      ticker: Faker::Alphanumeric.alpha(number: 3),
      company: Faker::Company.bs
    )
    watchlist.save
  end
end
