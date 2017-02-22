json.user_detail do
  json.extract! user, :id, :first_name, :last_name, :email, :zip_code
end

json.restaurants do
  restaurants.each do |restaurant|
    json.set! restaurant.id do
      json.partial! 'api/restaurants/short_restaurant', restaurant: restaurant, user: user
    end
  end
end
