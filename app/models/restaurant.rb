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
#  latitude    :float
#  longitude   :float
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  owner_id    :integer          not null
#  zip_code    :integer          not null
#  hours       :json             not null
#

class Restaurant < ActiveRecord::Base
  PRICE_RANGES = {
    "$15 and under" => 1,
    "$16 to $30" => 2,
    "$31 to $50" => 3,
    "$50 and over" => 4
  }

  US_STATES = %w(Alaska Alabama Arkansas Arizona California Colorado Connecticut District\ of\ Columbia Delaware Florida Georgia Guam Hawaii Iowa Idaho Illinois Indiana Kansas Kentucky Louisiana Massachusetts Maryland Maine Michigan Minnesota Missouri Mississippi Montana North\ Carolina North\ Dakota Nebraska New\ Hampshire New\ Jersey New\ Mexico Nevada New\ York Ohio Oklahoma Oregon Pennsylvania Puerto\ Rico Rhode\ Island South\ Carolina South\ Dakota Tennessee Texas Utah Virginia Virgin\ Islands Vermont Washington Wisconsin West\ Virginia Wyoming)

  TIMES = %w(12:00\ am 12:30\ am 1:00\ am 1:30\ am 2:00\ am 2:30\ am 3:00\ am 3:30\ am 4:00\ am
  4:30\ am 5:00\ am 5:30\ am 6:00\ am 6:30\ am 7:00\ am 7:30\ am 8:00\ am 8:30\ am 9:00\ am 9:30\ am
  10:00\ am 10:30\ am 11:00\ am 11:30\ am 12:00\ pm 12:30\ pm 1:00\ pm 1:30\ pm 2:00\ pm 2:30\ pm
  3:00\ pm 3:30\ pm 4:00\ pm 4:30\ pm 5:00\ pm 5:30\ pm 6:00\ pm 6:30\ pm 7:00\ pm 7:30\ pm
  8:00\ pm 8:30\ pm 9:00\ pm 9:30\ pm 10:00\ pm 10:30\ pm 11:00\ pm 11:30\ pm)

  DAYS = %w(monday tuesday wednesday thursday friday saturday sunday)

  store :hours, accessors: [
    :monday,
    :tuesday,
    :wednesday,
    :thursday,
    :friday,
    :saturday,
    :sunday
  ], coder: JSON

  validates :name, :owner, :address, :city, :description, :hours, presence: true
  validates_format_of :zip_code, with: /\d{5}/, message: "should be in the form 12345"
  validates :state, inclusion: { in: US_STATES }
  validates :price_range, inclusion: { in: PRICE_RANGES.keys }
  validate :closing_time_not_before_opening_time
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

  def closing_time_not_before_opening_time
    errors.add(:hours, Hash.new { |hash, key| hash[key] = [] })
    error_detected = false

    hours.each do |day, hours_array|
      i = 0

      while i < hours_array.length
        unless time_after(hours_array[i], hours_array[i + 1])
          errors[:hours][0][day] << "cannot close before opening"
          error_detected = true
        end

        i += 2
      end
    end

    errors[:hours].clear unless error_detected
  end

  def time_after(time1, time2)
    return Time.parse(time2) > Time.parse(time1)
  end
end