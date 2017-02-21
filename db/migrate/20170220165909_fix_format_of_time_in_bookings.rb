class FixFormatOfTimeInBookings < ActiveRecord::Migration[5.0]
  def change
    remove_column :bookings, :start_time
    add_column :bookings, :start_time, :datetime
  end
end
