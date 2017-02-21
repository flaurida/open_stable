class ChangeTimeBackToTimeInBookings < ActiveRecord::Migration[5.0]
  def change
    remove_column :bookings, :start_time
    add_column :bookings, :start_time, :time
  end
end
