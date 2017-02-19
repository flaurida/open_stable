# == Schema Information
#
# Table name: bookings
#
#  id         :integer          not null, primary key
#  user_id    :integer          not null
#  table_id   :integer          not null
#  date       :date             not null
#  start_time :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Booking < ActiveRecord::Base
  validates :user_id, :table_id, :date, :start_time, null: false

  belongs_to :table
end
