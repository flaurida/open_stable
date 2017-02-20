class Api::FavoritesController < ApplicationController
  before_action :must_be_logged_in_to_favorite, only: [:destroy]

  def index
    if logged_in?
      @favorites = Favorite.where(user_id: current_user.id)
      render :index
    else
      render json: {}
    end
  end

  def destroy
    @favorite = Favorite.find(params[:id])

    if @favorite.destroy
      render json: {}
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
