class Api::FavoritesController < ApplicationController
  before_action :must_be_logged_in_to_favorite, only: [:destroy]

  def create
    @restaurant = Restaurant.find(params[:restaurant_id])

    favorite = current_user.favorites.new(restaurant: @restaurant)

    if favorite.save
      render json: { id: favorite.id, restaurant_id: favorite.restaurant_id, user_id: favorite.user_id }
    else
      render json: favorite.errors.messages, status: 422
    end
  end

  def destroy
    @favorite = Favorite.find_by(user_id: current_user.id, restaurant_id: params[:restaurant_id])

    if @favorite.destroy
      render json: { id: @favorite.id, restaurant_id: @favorite.restaurant_id, user_id: @favorite.user_id }
    else
      render json: @favorite.errors.messages, status: 422
    end
  end

  def must_be_logged_in_to_favorite
    unless logged_in?
      render json: ["Please log in to unfavorite restaurants"], status: 403
    end
  end
end
