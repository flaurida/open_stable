# == Schema Information
#
# Table name: bookings
#
#  id         :integer          not null, primary key
#  user_id    :integer          not null
#  table_id   :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  start_time :datetime
#  num_seats  :integer          not null
#

class Booking < ActiveRecord::Base
  validates :user, :table, :date, :start_time, :num_seats, null: false
  validates :num_seats, inclusion: { in: (1..20) }
  validate :start_time_not_in_past
  
  belongs_to :table
  belongs_to :user

  def start_time=(date_time_string)
    write_attribute(:start_time, DateTime.parse(date_time_string))
  end

  private

  def start_time_not_in_past
    if start_time < Time.now
      errors[:start_time] << "cannot be in the past"
    end
  end
end
