json.extract! restaurant, :id, :name, :description, :price_range,
  :address, :city, :state, :zip_code, :latitude, :longitude,
  :num_dollar_signs, :owner_id

json.owner_viewing user && user.id == restaurant.owner_id
