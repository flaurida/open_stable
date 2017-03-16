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
  include ActionView::Helpers

  PRICE_RANGES = {
    "$15 and under" => 1,
    "$16 to $30" => 2,
    "$31 to $50" => 3,
    "$50 and over" => 4
  }

  NOISE_RATINGS = {
    1 => "quiet",
    2 => "modest",
    3 => "moderate",
    4 => "loud",
    5 => "bumpin"
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
    "Frequent Brawling",
    "Horses Eat Free",
    "Tents Provided",
    "Trading Center",
    "Great for Weddings",
    "Far from Water",
    "No Blood Magic",
    "Free Braiding",
    "Near Vaes Dothrak"
  ]

  CITIES = [
    "New York",
    "San Francisco",
    "Seattle",
    "Las Vegas",
    "Philadelphia",
    "Orlando"
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
  validates :state, inclusion: { in: US_STATES, message: "please select below" }
  validates :price_range, inclusion: { in: PRICE_RANGES.keys, message: "please select below" }
  validates :dining_time, inclusion: { in: DINING_TIMES_INT, message: "please select below" }
  validates :strategy, inclusion: { in: STRATEGIES, message: "please select below" }
  validates :category, inclusion: { in: CATEGORIES, message: "please select below" }

  validate :closing_time_not_before_opening_time_and_no_overlap
  geocoded_by :full_street_address
  after_validation :geocode

  has_attached_file :image, styles: { medium: "140x140>" }, default_url: "restaurant.jpg"
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/

  belongs_to :owner,
    class_name: "User",
    primary_key: :id,
    foreign_key: :owner_id

  has_many :tables, dependent: :destroy
  has_many :bookings, through: :tables
  has_many :reviews, dependent: :destroy
  has_many :favorites, dependent: :destroy
  has_many :photos, dependent: :destroy

  def num_dollar_signs
    PRICE_RANGES[price_range]
  end

  def self.get_with_reviews
    self.get_restaurants_with_reviews(self.all)
  end

  def self.get_restaurants_with_reviews(restaurants)
    restaurants
      .select(<<-SQL)
        restaurants.*,
        AVG(reviews.overall_rating) AS overall_rating,
        COUNT(reviews.id) AS num_reviews,
        (CAST(AVG(reviews.recommended * 100) AS INTEGER)) AS recommended_score
        SQL
      .left_joins(:reviews)
      .group("restaurants.id")
      .includes(:reviews, :favorites)
  end

  def self.get_favorites_with_reviews(user)
    self.get_restaurants_with_reviews(user.favorited_restaurants)
  end

  def self.show(id)
    self.aggregate_ratings
    .includes(:favorites, :photos, reviews: [:user])
    .find(id)
  end

  def self.aggregate_ratings
    self.select(<<-SQL)
      restaurants.*,
      ROUND(AVG(reviews.overall_rating), 1) AS overall_rating,
      ROUND(AVG(reviews.food_rating), 1) AS food_rating,
      ROUND(AVG(reviews.service_rating), 1) AS service_rating,
      ROUND(AVG(reviews.ambience_rating), 1) AS ambience_rating,
      ROUND(AVG(reviews.value_rating), 1) AS value_rating,
      ROUND(AVG(reviews.noise_rating), 1) AS noise_rating,
      COUNT(reviews.id) AS num_reviews,
      (CAST(AVG(reviews.recommended * 100) AS INTEGER)) AS recommended_score
    SQL
    .left_joins(:reviews)
    .group("restaurants.id")
  end

  def formatted_hours
    formatted_hours = []

    hours.each do |day, hours_array|
      formatted_hours << "#{day.capitalize}: #{formatted_daily_hours(hours_array)}"
    end

    formatted_hours
  end

  def formatted_noise_rating(rating)
    NOISE_RATINGS[rating.round()]
  end

  def image_url
    ActionController::Base.helpers.asset_path(self.image.url)
  end

  def self.restaurant_availability(proposed_time, num_seats, city)
    restaurants = Restaurant.where(city: city)

    result = {}

    restaurants.each do |restaurant|
      restaurant_result = restaurant.table_availability(proposed_time, num_seats)
      result[restaurant.id] = restaurant_result[restaurant.id]
    end

    result
  end

  def table_availability(proposed_time, num_seats)
    order = "tables.max_seats ASC"
    seating = "? BETWEEN tables.min_seats AND tables.max_seats"

    order = "tables.max_seats DESC" if strategy == "generous"
    seating = "tables.max_seats = ?" if strategy == "greedy"

    result = Restaurant.includes(tables: [:bookings])
    .where(id: id)
    .where(seating, num_seats)
    .order(order)

    analyze_individual_result(result, proposed_time, num_seats)
  end

  def analyze_individual_result(result, proposed_time, num_seats)
    return { id => {
            name: name,
            id: id,
            city: city,
            category: category,
            num_dollar_signs: num_dollar_signs,
            image_url: image_url,
            closed: true } } if closed?(proposed_time) && closed?(proposed_time - 60.minutes) && closed?(proposed_time + 60.minutes)
    return { id => {
            name: name,
            id: id,
            city: city,
            category: category,
            num_dollar_signs: num_dollar_signs,
            image_url: image_url,
            booked: true }} if result.empty? || (strategy == "hipster" && [true, false].sample)

    golden_count = 0
    parsed = {}

    result.first.tables.each do |table|
      bookings = table.bookings.select do |booking|
        booking.start_time.between?((proposed_time - dining_time.minutes + 1.minute), (proposed_time + dining_time.minutes - 1.minute))
      end

      next if bookings.count >= 2

      if bookings.empty?
        if closed?(proposed_time)
          lower_delta = best_lower_delta_when_closed(proposed_time)
          upper_delta = best_upper_delta_when_closed(proposed_time)

          fill_down_to_all(parsed, table, lower_delta) if lower_delta
          fill_up_to_all(parsed, table, upper_delta) if upper_delta
        else
          fill_in_all(parsed, table)
          golden_count = 5
        end
      else
        if bookings.first.start_time <= proposed_time - dining_time.minutes ||
            bookings.first.start_time >= proposed_time + dining_time.minutes
          parsed[0] = table.id
        else
          end_time = bookings.first.start_time + dining_time.minutes
          diff = (end_time.to_datetime - proposed_time) * 1.day / 60
          fill_up_to_all(parsed, table, diff.round())

          end_time = proposed_time + dining_time.minutes
          diff = (bookings.first.start_time.to_datetime - end_time) * 1.day / 60
          fill_down_to_all(parsed, table, diff.round())
        end
      end

      break if golden_count >= 5
    end

    parse_individual_result(parsed, proposed_time, num_seats)
  end

  def fill_up_to_all(parsed, table, limit)
    until limit > 60
      parsed[limit] = table.id
      limit += 15
    end
  end

  def fill_down_to_all(parsed, table, limit)
    until limit < -60
      parsed[limit] = table.id
      limit -= 15
    end
  end

  def fill_in_all(parsed, table)
    options = [-60, -45, -30, -15, 0, 15, 30, 45, 60]

    options.each do |option|
      parsed[option] ||= table.id
    end

    parsed
  end

  def parse_individual_result(parsed, proposed_time, num_seats)
    return { id => { booked: true } } if parsed.empty?

    delta = 0
    proposed_times = []

    until proposed_times.count >= 5 || delta > 60
      if delta == 0 && parsed[delta]
        proposed_times << {
          pretty_time: proposed_time.strftime("%-l:%M %P"),
          table_id: parsed[delta],
          num_seats: num_seats,
          start_time: proposed_time
        }
      else
        if parsed[delta]
          proposed_times << {
            pretty_time: (proposed_time + delta.minutes).strftime("%-l:%M %P"),
            table_id: parsed[delta],
            num_seats: num_seats,
            start_time: (proposed_time + delta.minutes)
          }
        end

        if parsed[-delta]
          proposed_times.unshift({
            pretty_time: (proposed_time - delta.minutes).strftime("%-l:%M %P"),
            table_id: parsed[-delta],
            num_seats: num_seats,
            start_time: (proposed_time - delta.minutes)
          }) unless in_past?(proposed_time + delta.minutes)
        end
      end

      delta += 15
    end

    proposed_times_with_blanks = []

    blank_time = {
      table_id: nil,
      pretty_time: "blank"
    }

    earliest_time = proposed_times.first
    proposed_times.each do |time|

      if time[:start_time] >= proposed_time &&
        proposed_times_with_blanks.count < 2
        (2 - proposed_times_with_blanks.count).times do
          proposed_times_with_blanks << blank_time
        end
      end

      proposed_times_with_blanks << time unless closed?(time[:start_time])
    end


    proposed_times_with_blanks << blank_time until proposed_times_with_blanks.count >= 5

    return { id => {
        name: name,
        id: id,
        city: city,
        category: category,
        num_dollar_signs: num_dollar_signs,
        image_url: image_url,
        proposed_times: proposed_times_with_blanks
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

  def best_lower_delta_when_closed(proposed_time)
    delta = -15

    while delta >= -60
      if !closed?(proposed_time - (dining_time - delta).minutes)
        return delta
      end

      delta -= 15
    end

    return false
  end

  def best_upper_delta_when_closed(proposed_time)
    delta = 15

    while delta <= 60
      if !closed?(proposed_time + delta.minutes)
        return delta
      end

      delta += 15
    end

    return false
  end

  def review_preview
    return nil if reviews.empty?
    last_review = reviews.last.body
    last_review.length > 150 ? "#{last_review[0...150]}..." : last_review
  end

  def formatted_dining_time
    if dining_time == 60
      "#{dining_time / 60} hour"
    else
      pretty_time = dining_time * 1.0 / 60
      pretty_time = pretty_time.to_i if pretty_time % 1 == 0
      "#{pretty_time} hours"
    end
  end

  def in_past?(proposed_time)
    return proposed_time < DateTime.now.change(offset: "+0000")
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
