class AddZipCodeToRestaurants < ActiveRecord::Migration[5.0]
  def change
    add_column :restaurants, :zip_code, :integer, null: false
  end
end
