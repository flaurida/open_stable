class Api::RestaurantsController < ApplicationController
  before_action :only_owner_can_edit_or_delete, only: [:update, :destroy]
  before_action :must_be_logged_in_to_favorite, only: [:create_favorite]

  def index
    @restaurants = Restaurant.includes(:favorites, :reviews).all

    render :index
  end

  def search
    # debugger
    # ## depending on params, defer to various model methods and then render what you need
    proposed_time = DateTime.parse("#{params[:date]} #{params[:time]}}") if params[:date] && params[:time]
    num_seats = params[:num_seats]

    if params[:restaurant_id]
      @result = Restaurant.find(params[:restaurant_id]).table_availability(proposed_time, num_seats)
      render json: @result
    end
  end

  def create_favorite
    @restaurant = Restaurant.find(params[:restaurant_id])

    favorite = current_user.favorites.new(restaurant: @restaurant)

    if favorite.save
      render json: { id: favorite.id, restaurant_id: favorite.restaurant_id, user_id: current_user.id }
    else
      render json: favorite.errors.messages, status: 422
    end
  end

  def create
    @restaurant = current_user.restaurants.new(restaurant_params)

    if @restaurant.save
      render :show
    else
      render json: @restaurant.errors.messages, status: 422
    end
  end

  def show
    @restaurant = Restaurant.includes(:favorites, reviews: [:user])
    .find(params[:id])

    if @restaurant
      render :show
    else
      render json: ["Cannot find that restaurant!"], status: 404
    end
  end

  def update
    @restaurant = Restaurant.find(params[:id])

    if @restaurant.update(restaurant_params)
      render :show
    else
      render json: @restaurant.errors.messages, status: 422
    end
  end

  def destroy
    @restaurant = Restaurant.find(params[:id])

    unless @restaurant.destroy
      render json: @restaurant.errors.messages, status: 422
    end
  end

  private

  def restaurant_params
    if params[:restaurant][:hours]
      params[:restaurant][:hours] = JSON.parse(params[:restaurant][:hours])
    end

    params.require(:restaurant).permit(:name, :address, :city, :state, :zip_code,
      :price_range, :description, :image, :hours, :date, :dining_time, :strategy, :category,
      hours: { monday: [], tuesday: [], wednesday: [], thursday: [], friday: [], saturday: [], sunday: [] })
  end

  def only_owner_can_edit_or_delete
    @restaurant = Restaurant.find(params[:id])

    unless @restaurant.owner == current_user
      render json: ["You cannot mess with someone else's restaurant!"], status: 403
    end
  end

  def must_be_logged_in_to_favorite
    unless logged_in?
      render json: ["Please log in to favorite restaurants"], status: 403
    end
  end
end
