json.extract! restaurant, :id, :name, :description, :price_range, :hours,
  :address, :city, :state, :zip_code, :latitude, :longitude, :num_dollar_signs, :owner_id

json.owner_viewing logged_in? && current_user.id == restaurant.owner_id
