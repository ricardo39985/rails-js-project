# frozen_string_literal: true

class WatchlistsController < ApplicationController
  before_action :set_watchlist, only: %i[show update destroy]

  # GET /watchlists
  def index
    @watchlists = Watchlist.all

    render json: @watchlists.as_json(only: %i[name id], include: { stocks: { only: %i[ticker company] } })
  end

  # GET /watchlists/1
  def show
    render json: @watchlist.as_json(only: %i[name id], include: { stocks: { only: %i[ticker company] } })
  end

  # POST /watchlists
  def create
    @watchlist = Watchlist.new(watchlist_params)
    5.times do
      @watchlist.stocks.build(ticker: Faker::Alphanumeric.alpha(number: 3),
                              company: Faker::Company.bs)
    end
    # byebug

    if @watchlist.save
      render json: @watchlists.as_json(only: %i[name id], include: { stocks: { only: %i[ticker company] } })
    else
      render json: @watchlist.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /watchlists/1
  def update
    if @watchlist.update(watchlist_params)
      render json: @watchlist
    else
      render json: @watchlist.errors, status: :unprocessable_entity
    end
  end

  # DELETE /watchlists/1
  def destroy
    # byebug
    # @watchlist.stocks.delete
    @watchlist&.destroy
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_watchlist
    @watchlist = Watchlist.find_by(id: params[:id])
  end

  # Only allow a trusted parameter "white list" through.
  def watchlist_params
    params.require(:watchlist).permit(:name)
  end
end
