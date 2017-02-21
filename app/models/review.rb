# == Schema Information
#
# Table name: reviews
#
#  id              :integer          not null, primary key
#  user_id         :integer          not null
#  restaurant_id   :integer          not null
#  overall_rating  :integer          not null
#  food_rating     :integer          not null
#  service_rating  :integer          not null
#  ambience_rating :integer          not null
#  value_rating    :integer          not null
#  noise_rating    :integer          not null
#  recommended     :boolean          not null
#  body            :text             not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class Review < ActiveRecord::Base
  RATINGS = (1..5).to_a

  validates :user, :restaurant, :overall_rating, :food_rating, :service_rating, :ambience_rating,
  :value_rating, :noise_rating, :body, presence: true

  validates :overall_rating, :food_rating, :service_rating, :ambience_rating,
  :value_rating, :noise_rating, inclusion: { in: RATINGS, message: "click stars to fill in" }

  validates :recommended, inclusion: { in: [true, false] }
  validates :user, uniqueness: { scope: :restaurant }

  belongs_to :user
  belongs_to :restaurant
end
