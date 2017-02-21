@restaurants.each do |restaurant|
  json.set! restaurant.id do
    json.partial! 'api/restaurants/short_restaurant', restaurant: restaurant, user: current_user
  end
end
