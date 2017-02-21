class Add < ActiveRecord::Migration[5.0]
  def change
    add_column :bookings, :num_seats, :integer, null: false
  end
end
