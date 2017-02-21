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
#  dining_time        :integer          default("60"), not null
#  category           :string           not null
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
  DINING_TIMES_INT = [60, 90, 120, 150, 180]
  DINING_TIMES = %w(60 90 120 150 180)
  STRATEGIES = %w(normal generous hipster greedy)

  CATEGORIES = [
    "Frequent brawling",
    "Horses eat free",
    "Tents provided",
    "Trading center",
    "Great for weddings",
    "Far from water",
    "No blood magic",
    "Free braiding",
    "Good for ceremonies",
    "Near Vaes Dothrak"
  ]

  store :hours, accessors: [
    :monday,
    :tuesday,
    :wednesday,
    :thursday,
    :friday,
    :saturday,
    :sunday
  ], coder: JSON

  validates :name, :owner, :address, :city, :description, :hours, :dining_time, :category, :strategy, presence: true
  validates_format_of :zip_code, with: /\d{5}/, message: "should be in the form 12345"
  validates :state, inclusion: { in: US_STATES }
  validates :price_range, inclusion: { in: PRICE_RANGES.keys }
  validates :dining_time, inclusion: { in: DINING_TIMES_INT }
  validates :strategy, inclusion: { in: STRATEGIES }
  validates :category, inclusion: { in: CATEGORIES }

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
  has_many :reviews, dependent: :destroy
  has_many :favorites, dependent: :destroy

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

  ## FIX THIS! JUST NEED TO DO SOMETHING LIKE restuarants.dining_time.minutes and then you're golden
  def self.restaurant_availability(date, time, num_seats)
    order = "tables.max_seats ASC"

    result = Restaurant.includes(tables: [:bookings])
    .where("tables.max_seats >= ? AND tables.min_seats <= ?", num_seats, num_seats)
    .where(id: id)
    .where.not(bookings: { start_time: ((proposed_time - dining_time.minutes)..(proposed_time + dining_time.minutes))})
    .order(order)

    parse_individual_result(result, proposed_time)
  end

  def table_availability(proposed_time, num_seats)
    order = "tables.max_seats ASC"
    seating = "? BETWEEN tables.min_seats AND tables.max_seats"

    order = "tables.max_seats DESC" if strategy == "generous"
    seating = "tables.max_seats = ?" if strategy == "greedy"

    result = Restaurant.includes(tables: [:bookings])
    .where(seating, num_seats)
    .where(id: id)
    .where.not(bookings: { start_time: ((proposed_time - dining_time.minutes)..(proposed_time + dining_time.minutes))})
    .order(order)
    debugger
    parse_individual_result(result, proposed_time)
  end
  # {
  #   restaurant_id => {
  #     name: restaurant.name,
  #     proposed_times: [
  #       [table_id, start_time],
  #       [table_id, start_time]
  #     ]
  #   }
  # }
  def self.parse_result(result, proposed_time)
    search_result = {}
    result.each do |restaurant|
      search_result[restaurant.id] = restaurant.parse_individual_result(proposed_time)
    end
  end

  def parse_individual_result(result, proposed_time)
    return { id => {} } if strategy == "hipster" && [true, false].sample

    return { id => {} } if closed?(proposed_time) || tables.empty?

    table = result.first.tables.first

    return { id => {
        name: name,
        id: id,
        review_count: reviews.length,
        num_dollar_signs: num_dollar_signs,
        city: city,
        proposed_times: [
          [(proposed_time - 30.minutes).strftime("%l:%M %P"), table.id],
          [(proposed_time - 15.minutes).strftime("%l:%M %P"), table.id],
          [proposed_time.strftime("%l:%M %P"), table.id],
          [(proposed_time  + 15.minutes).strftime("%l:%M %P"), table.id],
          [(proposed_time  + 30.minutes).strftime("%l:%M %P"), table.id]
        ]
      }
    }
  end

  def closed?(proposed_time)
    daily_hours = hours[proposed_time.strftime("%A").downcase]
    return true if daily_hours.empty?

    daily_hours.each_index do |i|
      next if i % 2 != 0

      opening = DateTime.parse("#{proposed_time.strftime('%Y-%m-%d')} #{daily_hours[i]}")
      closing = DateTime.parse("#{proposed_time.strftime('%Y-%m-%d')} #{daily_hours[i + 1]}")

      return false if (opening..(closing - dining_time.minutes)).cover?(proposed_time)
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

# return {} if closed?(proposed_time)
# debugger
# restaurant = Restaurant.find_by_sql(<<-SQL)
#   SELECT restaurants.*, tables.*, bookings.*
#   FROM restaurants
#   INNER JOIN tables ON tables.restaurant_id = restaurants.id
#   LEFT OUTER JOIN bookings ON bookings.table_id = tables.id
#
# SQL
# debugger

#
# tables = Table.includes(:bookings).where(restaurant_id: restaurant_id)
# .joins("LEFT OUTER JOIN bookings ON bookings.table_id = tables.id")
# .where(bookings: { start_time: ((proposed_time - 4.hours)..(proposed_time + 1.hour))})
# .order(order)

# tables = Table.where(restaurant_id: restaurant_id)
# .select("tables.*, COUNT(bookings.id) as num_bookings")
# .joins("LEFT OUTER JOIN bookings ON bookings.table_id = tables.id")
# .where(bookings: { start_time: ((proposed_time - 4.hours)..(proposed_time + 1.hour))}).group(:id).first

# x = Restaurant.select("restaurants.*, tables.id AS table_id, bookings.id AS booking_id")
#   .joins(:tables)
#   .joins("LEFT OUTER JOIN bookings ON bookings.table_id = tables.id")
#   .where("bookings.start_time BETWEEN ? AND ?", proposed_time - 75.minutes, proposed_time + 75.minutes)
#   .where(id: id)
#
# maurice = Table.where(restaurant_id: restaurant_id)
# .select("tables.*, COUNT(bookings.id) as num_bookings")
# .joins(:bookings)
# .where(bookings: { start_time: (DateTime.parse("2017-02-20 6:00 pm")..DateTime.parse("2017-02-20 7:30 pm"))}).group(:id).first

# restaurants = Restaurant.includes(tables: [:bookings])
# .where(bookings: {start_time: (DateTime.parse("2017-02-20 6:00 pm")..DateTime.parse("2017-02-20 7:30 pm"))})
