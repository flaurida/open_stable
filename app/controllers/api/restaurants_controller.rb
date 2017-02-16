class Api::RestaurantsController < ApplicationController
  before_action :only_owner_can_edit_or_delete, only: [:update, :destroy]

  def index
    @restaurants = Restaurant.all
    render :index
  end

  def create
    @restaurant = Restaurant.new(restaurant_params)

    if @restaurant.save
      render :show
    else
      render json: @restaurant.errors.full_messages, status: 422
    end
  end

  def show
    @restaurant = Restaurant.find(params[:id])

    if @restaurant
      render :show
    else
      render json: ["Can not find that restaurant!"], status: 404
    end
  end

  def update
    @restaurant = Restaurant.find(params[:id])

    if @restaurant.update(restaurant_params)
      render :show
    else
      render json: @restaurant.errors.full_messages, status: 422
    end
  end

  def destroy
    @restaurant = Restaurant.find(params[:id])

    unless @restaurant.destroy
      render json: @restaurant.errors.full_messages, status: 422
    end
  end

  private

  def restaurant_params
    params.require(:restaurant).permit(:name, :address, :city, :state,
      :price_range, :description, :hours)
  end

  def only_owner_can_edit_or_delete
    @restaurant = Restaurant.find(params[:id])

    unless @restaurant.owner == current_user
      render json: ["You cannot mess with someone else's restaurant!"], status: 403
    end
  end
end
