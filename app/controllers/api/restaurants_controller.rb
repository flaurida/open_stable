class Api::RestaurantsController < ApplicationController
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
end
