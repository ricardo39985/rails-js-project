# frozen_string_literal: true

class StocksController < ApplicationController
  before_action :set_stock, only: %i[show update destroy]

  # GET /stocks
  def index
    @stocks = Stock.all
    # birds, only: [:id, :name, :species]
    render json: @stocks.to_json(include: { watchlists: { only: %i[name] } },
                                 only: %i[ticker company])
  end

  def show
    render json: @stock.to_json(include: { watchlists: { only: %i[name] } },
                                only: %i[ticker company])
  end

  # POST /stocks
  def create
    @stock = Stock.new(stock_params)
    # byebug
    @stock.watchlists << Watchlist.find_by(id: watchlist_params_for_stock[:watchlist_id])

    if @stock.save
      render json: @stock.as_json(only: %i[ticker company id], include: { watchlists: { only: %i[name] } }), status: :created, location: @stock
    else
      render json: @stock.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /stocks/1
  def update
    if @stock.update(stock_params)
      render json: @stock
    else
      render json: @stock.errors, status: :unprocessable_entity
    end
  end

  # DELETE /stocks/1
  def destroy
    @stock&.destroy
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_stock
    @stock = Stock.find(params[:id])
  end

  # Only allow a trusted parameter "white list" through.
  def stock_params
    params.require(:stock).permit(:ticker, :company, :price)
  end

  def watchlist_params_for_stock
    params.require(:stock).permit(:watchlist_id)
  end
end
