class DropDateFromBookins < ActiveRecord::Migration[5.0]
  def change
    remove_column :bookings, :date
  end
end
