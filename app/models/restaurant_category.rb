# == Schema Information
#
# Table name: restaurant_categories
#
#  id            :integer          not null, primary key
#  category_id   :integer          not null
#  restaurant_id :integer          not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#

class RestaurantCategory < ActiveRecord::Base
  validates :restaurant, :category, presence: true
  validates :restaurant, uniqueness: { scope: :category }

  belongs_to :category
  belongs_to :restaurant
end
