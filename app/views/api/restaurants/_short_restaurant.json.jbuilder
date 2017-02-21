json.extract! restaurant, :id, :name, :description, :price_range,
  :address, :city, :state, :zip_code, :latitude, :longitude,
  :num_dollar_signs, :owner_id, :category, :overall_rating

json.favorites do
  json.favorites_count restaurant.favorites.length
  json.current_user_favorite user && restaurant.favorites.map(&:user_id).include?(user.id)
end

json.image_url asset_path(restaurant.image.url)
