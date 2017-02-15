# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  first_name      :string           not null
#  last_name       :string           not null
#  email           :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  zip_code        :integer          not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class User < ActiveRecord::Base
  has_secure_password

  validates :first_name, :last_name, :session_token, presence: true
  validates :email, presence: true, uniqueness: true
  validate :password_confirmation_not_blank
  validates_format_of :zip_code, with: /\d{5}/, message: "should be in the form 12345"
  validates :password, length: { minimum: 6, allow_nil: true }

  after_initialize :ensure_session_token

  attr_reader :password, :password_confirmation

  has_many :restaurants,
    class_name: "Restaurant",
    primary_key: :id,
    foreign_key: :owner_id

  def self.generate_random_token
    SecureRandom.urlsafe_base64(16)
  end

  def self.find_by_credentials(email, password)
    user = self.find_by(email: email)
    user && user.authenticate(password) ? user : nil
  end

  def reset_session_token!
    self.session_token = self.class.generate_random_token
    self.save!
    self.session_token
  end

  def password_confirmation=(password_confirmation)
    @password_confirmation = password_confirmation
  end

  private

  def ensure_session_token
    self.session_token ||= self.class.generate_random_token
  end

  def password_confirmation_not_blank
    if password_confirmation.blank? && !password_confirmation.nil?
      errors[:password_confirmation] = ["can't be blank"]
    end
  end
end
