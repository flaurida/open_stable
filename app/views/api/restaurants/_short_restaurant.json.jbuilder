json.extract! restaurant, :id, :name, :description, :price_range,
  :address, :city, :state, :zip_code, :latitude, :longitude,
  :num_dollar_signs, :owner_id

json.favorites_count restaurant.favorites.length

json.image_url asset_path(restaurant.image.url)
