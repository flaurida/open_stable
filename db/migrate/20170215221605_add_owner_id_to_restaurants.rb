class AddOwnerIdToRestaurants < ActiveRecord::Migration[5.0]
  def change
    add_column :restaurants, :owner_id, :integer, null: false
    add_index :restaurants, :owner_id
  end
end
