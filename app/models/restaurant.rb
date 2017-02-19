# == Schema Information
#
# Table name: restaurants
#
#  id                 :integer          not null, primary key
#  name               :string           not null
#  address            :string           not null
#  city               :string           not null
#  state              :string           not null
#  price_range        :string           not null
#  description        :text             not null
#  latitude           :float
#  longitude          :float
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  owner_id           :integer          not null
#  zip_code           :integer          not null
#  hours              :json             not null
#  image_file_name    :string
#  image_content_type :string
#  image_file_size    :integer
#  image_updated_at   :datetime
#  strategy           :string           default("normal"), not null
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
  validate :closing_time_not_before_opening_time_and_no_overlap
  geocoded_by :full_street_address
  after_validation :geocode

  has_attached_file :image, styles: { medium: "140x140>" }, default_url: "restaurant.jpg"
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/

  belongs_to :owner,
    class_name: "User",
    primary_key: :id,
    foreign_key: :owner_id

  has_many :restaurant_categories, dependent: :destroy
  has_many :categories, through: :restaurant_categories
  has_many :tables, dependent: :destroy
  has_many :bookings, through: :tables

  def num_dollar_signs
    PRICE_RANGES[price_range]
  end

  def formatted_hours
    formatted_hours = []

    hours.each do |day, hours_array|
      formatted_hours << "#{day.capitalize}: #{formatted_daily_hours(hours_array)}"
    end

    formatted_hours
  end

  def self.single_restaurant_availability(id, date, time, num_seats)
    ## BE CAREFUL ABOUT CLOSING TIMES
    ## Table.includes(:bookings).where(restaurant_id: id)
    restaurant = Restaurant.includes(tables: [:bookings]).order("tables.max_seats asc").find(2)

    prospective_times = []
    return prospective_times if restaurant.closed?(date)

    possible_slots = restaurant.possible_slots(date, Time.parse(time))
    if restaurant.strategy == "normal"

      debugger
      restaurant.tables.each do |table|
        next if table.max_seats < num_seats


      end
    end
  end

  def possible_slots(date, time)
    delta = 0
    debugger
    while delta <= 75
      unless closed_during_time(date, time + delta.minutes)
        possible_slots[delta] = false
      end

      next if delta == 0

      unless closed_during_time(date, time - delta.minutes)
        possible_slots[-delta] = false
      end

      delta += 15
    end

    possible_slots
  end

  def closed?(date)
    hours[Date.parse(date).strftime("%A").downcase].empty?
  end

  def closed_during_time(date, time)
    daily_hours = hours[Date.parse(date).strftime("%A").downcase]

    daily_hours.each_index do |idx|
      next if i % 2 != 0
      return false if (Time.parse(daily_hours[i])..(Time.parse(daily_hours[i + 1]) - 1.hour)).include?(time)
    end

    true
  end

  private

  def full_street_address
    [address, city, state].join(", ")
  end

  def formatted_daily_hours(hours_array)
    return "Closed" if hours_array.empty?

    formatted_daily_hours = ""
    hours_array.each_with_index do |hour, i|
      pretty_hour = hour[0...-2]

      if hour[-2] == "a"
        pretty_hour += "a.m."
      else
        pretty_hour += "p.m."
      end
      pretty_hour += " - " if i % 2 == 0
      pretty_hour += ", " if i % 2 != 0 && i < hours_array.length - 1

      formatted_daily_hours << pretty_hour
    end

    formatted_daily_hours
  end

  def closing_time_not_before_opening_time_and_no_overlap
    errors.add(:hours, Hash.new { |hash, key| hash[key] = [] })
    error_detected = false

    hours.each do |day, hours_array|
      i = 0

      while i < hours_array.length
        unless time_after(hours_array[i], hours_array[i + 1])
          errors[:hours][0][day] << "closing error"
          error_detected = true
        end

        i += 2
      end
    end

    hours.each do |day, hours_array|
      i = 0

      while i < hours_array.length
        j = i + 2

        while j < hours_array.length
          if overlap?([hours_array[i], hours_array[i + 1]], [hours_array[j], hours_array[j + 1]])
            errors[:hours][0][day] << "overlap error"
            error_detected = true
          end

          j += 2
        end

        i += 2
      end
    end

    errors[:hours].clear unless error_detected
  end

  def time_after(time1, time2)
    return Time.parse(time2) > Time.parse(time1)
  end

  def overlap?(time_range1, time_range2)
    return (Time.parse(time_range1[0])..Time.parse(time_range1[1])).overlaps?((Time.parse(time_range2[0])..Time.parse(time_range2[1])))
  end
end
