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
  # validate :cannot_book_busy_table
  
  belongs_to :table
  belongs_to :user

  # def start_time=(date_time_string)
  #   write_attribute(:start_time, DateTime.parse(date_time_string))
  # end

  def formatted_time
    start_time.strftime("%A, %b %-d at %-l:%M %P")
  end

  private

  def start_time_not_in_past
    if start_time < DateTime.now.change(offset: "+0000")
      errors[:start_time] << "cannot be in the past"
    end
  end

  def cannot_book_busy_table
    table = Table.includes(:restaurant, :bookings)
      .where(("bookings.start_time BETWEEN '#{start_time}' - restaurants.dining_time + #{1.minute} AND '#{start_time}' + restaurants.dining_time - #{1.minute}"))
      .where(id: table_id)

    unless table.empty?
      errors[:start_time] << "that table is already booked!"
    end
  end
end
