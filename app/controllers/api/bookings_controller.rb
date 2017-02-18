class Api::BookingsController < ApplicationController

  private

  def booking_params
    params.require(:booking).permit(:date, :time)
  end
end
