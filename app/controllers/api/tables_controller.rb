class Api::TablesController < ApplicationController
  before_action :can_only_view_own_tables, only: [:index, :create, :show, :update]
  before_action :can_only_delete_own_tables, only: [:destroy]

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
      render json: @table.errors.messages, status: 422
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
      render json: @table.errors.messages, status: 422
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
    params.require(:table).permit(:name, :min_seats, :max_seats, :dining_time)
  end

  def can_only_view_own_tables
    @restaurant = Restaurant.find(params[:restaurant_id])

    unless logged_in? && @restaurant && @restaurant.owner_id == current_user.id
      render json: ["You cannot mess with the stalls in someone else's stable!"], status: 403
    end
  end

  def can_only_delete_own_tables
    @table = Table.includes(:restaurant).find(params[:id])

    unless logged_in? && @table.restaurant.owner_id == current_user.id
      render json: ["You cannot mess with the stalls in someone else's stable!"], status: 403
    end
  end
end
