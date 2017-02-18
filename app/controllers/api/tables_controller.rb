class Api::TablesController < ApplicationController
  before_action :can_only_view_own_tables

  def index
    @tables = Table.where(restaurant_id: params[:restaurant_id])
    render :index
  end

  def create
    @restaurant = Restaurant.find(params[:restaurant_id])
    @table = @restaurant.tables.new(table_params)

    if @table.save
      render :show
    else
      render @table.errors.messages, status: 422
    end
  end

  def show
    @table = Table.find(params[:id])

    if @table
      render :show
    else
      render json: ["That table was not found :("], status: 404
    end
  end

  def update
    @table = Table.find(params[:id])

    if @table.update(table_params)
      render :show
    else
      render @table.errors.messages, status: 422
    end
  end

  def destroy
    @table = Table.find(params[:id])

    unless @table.destroy
      render json: @table.errors.messages, status: 422
    end
  end

  private

  def table_params
    params.require(:table).permit(:min_seats, :max_seats, :dining_time)
  end

  def can_only_view_own_tables
    @restaurant = Restaurant.find(params[:restaurant_id])

    unless logged_in? && @restaurant && @restaurant.owner == current_user
      render json: ["You cannot view the tables in someone else's restaurant!"], status: 403
    end
  end
end
