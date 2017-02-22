class Api::RestaurantsController < ApplicationController
  before_action :only_owner_can_edit_or_delete, only: [:update, :destroy]
  before_action :search_start_time_not_in_past, only: [:search]

  def index
    @restaurants = Restaurant.includes(:favorites, :reviews)

    if params[:city]
      @restaurants = @restaurants.where(city: params[:city])
    end

    render :index
  end

  def search
    proposed_time = DateTime.parse("#{params[:date]} #{params[:time]}}") if params[:date] && params[:time]
    num_seats = params[:num_seats]

    if params[:restaurant_id]
      @result = Restaurant.find(params[:restaurant_id]).table_availability(proposed_time, num_seats)
      render json: @result
    else
      render json: {}
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
    @restaurant = Restaurant
    .includes(:favorites, :photos, reviews: [:user])
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

  def search_start_time_not_in_past
    return unless params[:date] && params[:time]

    if DateTime.parse("#{params[:date]} #{params[:time]}}") < DateTime.now.change(offset: "+0000")
      render json: ["The time you requested is in the past!"], status: 422
    end
  end
end
