# == Schema Information
#
# Table name: tables
#
#  id            :integer          not null, primary key
#  name          :string           not null
#  restaurant_id :integer          not null
#  min_seats     :integer          not null
#  max_seats     :integer          not null
#  dining_time   :integer          not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#

class Table < ActiveRecord::Base
  validates :name, :restaurant_id, :min_seats, :max_seats, :dining_time, presence: true
  validates :name, uniqueness: { scope: :restaurant_id }

  belongs_to :restaurant
end
