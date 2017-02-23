class Api::UsersController < ApplicationController
  before_action :log_in_to_see_profile, only: [:show]

  def create
    @user = User.new(user_params)

    if @user.save
      login!(@user)
      render "api/users/current_user"
    else
      render json: @user.errors.messages, status: 422
    end
  end

  def show
    if params[:restaurants]
      if params[:restaurants] == "mine"
        @user = User.includes(restaurants: [:favorites]).find(current_user.id)
        render :restaurants if @user
      else
        @user = User.includes(:favorited_restaurants).find(current_user.id)
        render :favorites if @user
      end
    elsif params[:reviews]
      @user = User.includes(reviews: [:restaurant]).find(current_user.id)
      render :reviews
    elsif params[:bookings]
      if params[:bookings] == "past"
        @bookings = Booking.includes(table: [:restaurant])
        .where(user_id: current_user.id)
        .where("bookings.start_time < ?", DateTime.now)
        @user = current_user
        @upcoming = false

        render :bookings
      else
        @bookings = Booking.includes(table: [:restaurant])
        .where(user_id: current_user.id)
        .where("bookings.start_time > ?", DateTime.now)
        @user = current_user
        @upcoming = true
        
        render :bookings
      end
    else
      render json: ["That route was not found!"], status: 404
    end
  end

  private

  def user_params
    params.require(:user).permit(:first_name, :last_name, :email, :password,
    :password_confirmation, :zip_code)
  end

  def log_in_to_see_profile
    unless logged_in?
      render json: ["You must log in first!"], status: 403
    end
  end
end
