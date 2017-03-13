class ChangeRecommendedToInteger < ActiveRecord::Migration[5.0]
  def change
    remove_column :reviews, :recommended
    add_column :reviews, :recommended, :integer, default: 0
  end
end
