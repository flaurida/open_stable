class CreateRestaurantCategories < ActiveRecord::Migration[5.0]
  def change
    create_table :restaurant_categories do |t|
      t.integer :category_id, null: false
      t.integer :restaurant_id, null: false

      t.timestamps
    end

    add_index :restaurant_categories, [:category_id, :restaurant_id], unique: true
  end
end
