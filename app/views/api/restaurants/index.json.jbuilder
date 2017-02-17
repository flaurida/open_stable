@restaurants.each do |restaurant|
  json.set! restaurant.id do
    json.partial! 'api/restaurants/short_restaurant', restaurant: restaurant
  end
end
