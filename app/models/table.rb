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
  DINING_TIMES = %w(60 90 120 150 180)
  DINING_TIMES_INT = [60, 90, 120, 150, 180]

  validates :name, :restaurant_id, :min_seats, :max_seats, :dining_time, presence: true
  validates :name, uniqueness: { scope: :restaurant_id }
  validates :dining_time, inclusion: { in: DINING_TIMES_INT }
  validate :max_seats_greater_than_min_seats

  belongs_to :restaurant
  has_many :bookings, dependent: :destroy

  def max_booking_range(date, time)
    nearby_bookings = bookings
    ## CHANGE TIME TO STRING, MANY ISSUES WITH PARSING TIMES
    # [-30, 30]
    # on lower end: desired time - 1.5 hrs + (if booking after -(1.5 + dining_time) hours => booking start + dining_time)
    # on upper end: desired time + 1.5 hrs - (if booking before desired_time + 1.5 => booking start)

    # -90 -75 -60 -45 -30 -15 0 15 30 45 60 90
    # get all bookings that start between DT - 1.5 - dining time and DT + 1.5
    # find all gaps that are size of dining time or longer
    
  end

  private

  def max_seats_greater_than_min_seats
    return unless max_seats && min_seats

    unless max_seats >= min_seats
      errors[:max_seats] << ["must be greater than min seats"]
    end
  end
end
