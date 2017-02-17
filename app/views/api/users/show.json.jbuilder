json.extract! @user, :first_name, :last_name, :email, :zip_code

json.restaurants do
  json.array! @user.restaurants.each do |restaurant|
    json.partial! 'api/restaurants/short_restaurant', restaurant: restaurant, user: @user
  end
end
