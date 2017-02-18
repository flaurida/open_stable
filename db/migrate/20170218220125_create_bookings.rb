class CreateBookings < ActiveRecord::Migration[5.0]
  def change
    create_table :bookings do |t|
      t.integer :user_id, null: false
      t.integer :table_id, null: false
      t.date :date, null: false
      t.time :start_time, null: false

      t.timestamps
    end

    add_index :bookings, :user_id
    add_index :bookings, :table_id
  end
end
