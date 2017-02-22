class Api::PhotosController < ApplicationController
  before_action :must_be_logged_in_to_post_photo, only: [:create]

  def create
    @photo = current_user.photos.new(photo_params)
    @photo.restaurant_id = params[:restaurant_id]

    if @photo.save
      render :show
    else
      render json: @photo.errors.messages
    end
  end

  private

  def photo_params
    params.require(:photo).permit(:image)
  end

  def must_be_logged_in_to_post_photo
    unless logged_in?
      render json: ["Please log in to post a photo!"], status: 403
    end
  end
end
