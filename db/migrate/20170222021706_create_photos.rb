class CreatePhotos < ActiveRecord::Migration[5.0]
  def change
    create_table :photos do |t|
      t.integer :restaurant_id, null: false
      t.integer :user_id, null: false

      t.timestamps
    end

    add_index :photos, :restaurant_id
    add_index :photos, :user_id
  end
end
