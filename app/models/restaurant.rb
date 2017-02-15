# == Schema Information
#
# Table name: restaurants
#
#  id          :integer          not null, primary key
#  name        :string           not null
#  address     :string           not null
#  city        :string           not null
#  state       :string           not null
#  price_range :string           not null
#  description :text             not null
#  hours       :text             not null
#  latitude    :float
#  longitude   :float
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  owner_id    :integer          not null
#  zip_code    :integer          not null
#

class Restaurant < ActiveRecord::Base
  PRICE_RANGES = {
    "$15 and under" => 1,
    "$16 to $30" => 2,
    "$31 to $50" => 3,
    "$50 and over" => 4
  }

  store :hours, accessors: [
    :monday,
    :tuesday,
    :wednesday,
    :thursday,
    :friday,
    :saturday,
    :sunday
  ]

  validates :name, :owner, :address, :city, :state, :zip_code, :description, :hours, presence: true
  validates :price_range, inclusion: { in: PRICE_RANGES.keys }
  geocoded_by :full_street_address
  after_validation :geocode

  belongs_to :owner,
    class_name: "User",
    primary_key: :id,
    foreign_key: :owner_id

  has_many :restaurant_categories, dependent: :destroy
  has_many :categories, through: :restaurant_categories

  def num_dollar_signs
    PRICE_RANGES[price_range]
  end

  private

  def full_street_address
    [address, city, state].join(", ")
  end
end
