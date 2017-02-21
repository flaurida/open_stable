class Api::BookingsController < ApplicationController
  before_action :must_log_in_to_book, only: [:create]
  before_action :can_only_delete_own_booking, only: [:destroy]

  def create
    @booking = current_user.bookings.new(booking_params)

    if @booking.save
      render :show
    else
      render json: @booking.errors.messages, status: 422
    end
  end

  def destroy
    @booking = Booking.find(params[:id])

    if @booking.destroy
      render :show
    else
      render json: @booking.errors.messages
    end
  end

  private

  def must_log_in_to_book
    unless logged_in?
      render json: ["Please log in to book a stable!"], status: 403
    end
  end

  def can_only_delete_own_booking
    booking = Booking.find(params[:id])

    unless current_user && current_user == booking.user
      render json: ["You cannot mess with someone else's reservations!"], status: 403
    end
  end

  def booking_params
    params.require(:booking).permit(:start_time, :table_id, :num_seats)
  end
end
