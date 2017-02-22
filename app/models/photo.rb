# == Schema Information
#
# Table name: photos
#
#  id                 :integer          not null, primary key
#  restaurant_id      :integer          not null
#  user_id            :integer          not null
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  image_file_name    :string
#  image_content_type :string
#  image_file_size    :integer
#  image_updated_at   :datetime
#

class Photo < ActiveRecord::Base
  validates :user, :restaurant, presence: true
  
  has_attached_file :image, styles: { medium: "140x140>" }, default_url: "restaurant.jpg"
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/

  belongs_to :user
  belongs_to :restaurant
end
