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

  private

  def max_seats_greater_than_min_seats
    return unless max_seats && min_seats

    unless max_seats >= min_seats
      errors[:max_seats] << ["must be greater than min seats"]
    end
  end
end
