class AddStrategyToRestaurants < ActiveRecord::Migration[5.0]
  def change
    add_column :restaurants, :strategy, :string, null: false, default: "normal"
  end
end
