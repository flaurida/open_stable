class CreateRestaurants < ActiveRecord::Migration[5.0]
  def change
    create_table :restaurants do |t|
      t.string :name, null: false
      t.string :address, null: false
      t.string :city, null: false
      t.string :state, null: false
      t.string :price_range, null: false
      t.text :description, null: false
      t.text :hours, null: false
      t.float :latitude
      t.float :longitude

      t.timestamps
    end

    add_index :restaurants, :name
  end
end
