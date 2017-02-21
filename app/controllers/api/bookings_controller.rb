class Api::BookingsController < ApplicationController
  def create
    date_time_string = params[:date] + params[:start_time]
    @booking = current_user.bookings.new(table_id: params[:table_id],
    start_time: date_time_string)

    ## more logic
  end

  private

  def booking_params
    params.require(:booking).permit(:date, :start_time)
  end
end
