# == Schema Information
#
# Table name: categories
#
#  id         :integer          not null, primary key
#  name       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Category < ActiveRecord::Base
  validates :name, presence: true, uniqueness: true

  has_many :restaurant_categories, dependent: :destroy
  has_many :restaurants, through: :restaurant_categories
end
