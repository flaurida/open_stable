class RemoveDiningTimeFromTables < ActiveRecord::Migration[5.0]
  def change
    remove_column :tables, :dining_time
    add_column :restaurants, :dining_time, :integer, null: false, default: 60
  end
end
