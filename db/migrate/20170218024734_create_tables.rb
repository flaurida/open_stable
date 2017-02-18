class CreateTables < ActiveRecord::Migration[5.0]
  def change
    create_table :tables do |t|
      t.string :name, null: false
      t.integer :restaurant_id, null: false
      t.integer :min_seats, null: false
      t.integer :max_seats, null: false
      t.integer :dining_time, null: false

      t.timestamps
    end

    add_index :tables, :restaurant_id
    add_index :tables, [:restaurant_id, :name], unique: true
  end
end
