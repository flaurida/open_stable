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
    if current_user
      @user = User.includes(:restaurants).find(current_user.id)
    end

    if @user
      render :show
    else
      render json: ["That user was not found!"], status: 404
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
