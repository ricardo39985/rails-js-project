# frozen_string_literal: true

Rails.application.routes.draw do
  resources :watchlists
  resources :stocks
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  get '/test', to: 'application#test'
  resources :sessions, only: %i[create destroy]
end
