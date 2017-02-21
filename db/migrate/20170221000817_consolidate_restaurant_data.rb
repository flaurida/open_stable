class ConsolidateRestaurantData < ActiveRecord::Migration[5.0]
  def change
    drop_table :categories
    drop_table :restaurant_categories

    add_column :restaurants, :category, :string, null: false
    
  end
end
