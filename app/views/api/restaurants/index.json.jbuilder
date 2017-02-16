user = current_user

@restaurants.each do |restaurant|
  json.set! restaurant.id do
    json.partial! 'api/restaurants/short_restaurant', restaurant: restaurant, user: user
  end
end
