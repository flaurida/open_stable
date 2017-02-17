json.partial! 'short_restaurant', restaurant: @restaurant

json.extract! @restaurant, :hours, :formatted_hours
