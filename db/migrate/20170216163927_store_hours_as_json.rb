class StoreHoursAsJson < ActiveRecord::Migration[5.0]
  def change
    remove_column :restaurants, :hours
    add_column :restaurants, :hours, :json, null: false
  end
end
