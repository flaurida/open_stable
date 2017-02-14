class Api::SessionsController < ApplicationController
  def create
    @user = User.find_by_credentials(
      params[:user][:email],
      params[:user][:password]
    )

    if @user
      login!(@user)
      render 'api/users/show'
    else
      errors = {}
      errors[:email] = ["can't be blank"] if params[:user][:email].blank?
      errors[:password] = ["can't be blank"] if params[:user][:password].blank?
      errors[:email_and_password] = ["don't match. Please try again."] if errors.empty?

      render json: errors, status: 422
    end
  end

  def destroy
    if logged_in?
      logout!
      render json: {}
    else
      render json: ["You are not even logged in!"], status: 404
    end
  end
end
