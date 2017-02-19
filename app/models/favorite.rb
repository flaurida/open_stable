# == Schema Information
#
# Table name: favorites
#
#  id            :integer          not null, primary key
#  user_id       :integer          not null
#  restaurant_id :integer          not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#

class Favorite < ActiveRecord::Base
  validates :restaurant, :user, presence: true
  validates :user, uniqueness: { scope: :restaurant }
  
  belongs_to :user
  belongs_to :restaurant
end
