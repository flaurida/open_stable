class Api::ReviewsController < ApplicationController
  before_action :must_log_in_to_create_review, only: [:create]
  before_action :can_only_edit_own_reviews, only: [:update, :destroy]


  def create
    @review = current_user.reviews.new(review_params)
    @review.restaurant_id = params[:restaurant_id]

    if @review.save
      @restaurant = Restaurant
        .aggregate_ratings
        .find(@review.restaurant_id)
      render :show
    else
      render json: @review.errors.messages, status: 422
    end
  end

  def update
    @review = Review.includes(:restaurant, :user).find(params[:id])
    if @review.update(review_params)
      @restaurant = Restaurant
        .aggregate_ratings
        .find(@review.restaurant_id)
      render :show
    else
      render json: @review.errors.messages, status: 422
    end
  end

  def destroy
    @review = Review.find(params[:id])

    if @review.destroy
      @restaurant = Restaurant
        .aggregate_ratings
        .find(@review.restaurant_id)
      render :show
    else
      render json: @review.errors.messages, status: 422
    end
  end

  private

  def must_log_in_to_create_review
    unless logged_in?
      render json: ["Please log in before leaving a review!"], status: 403
    end
  end

  def can_only_edit_own_reviews
    review = Review.find(params[:id])

    unless current_user && review.user_id == current_user.id
      render json: ["You cannot mess with someone else's reviews!"], status: 403
    end
  end

  def review_params
    params.require(:review).permit(:user_id, :restaurant_id, :overall_rating, :food_rating,
    :service_rating, :ambience_rating, :value_rating, :noise_rating, :recommended, :body)
  end
end
