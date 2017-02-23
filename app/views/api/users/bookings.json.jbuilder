json.user_detail do
  json.extract! @user, :id, :first_name, :last_name, :email, :zip_code
end


json.bookings({})

json.bookings do
  @bookings.each do |booking|
    json.set! booking.id do
      json.upcoming @upcoming
      json.extract! booking, :id, :table_id, :num_seats, :user_id, :formatted_time
      json.restaurant_name booking.table.restaurant.name
      json.restaurant_id booking.table.restaurant.id
      json.restaurant_image_url asset_path(booking.table.restaurant.image.url)
    end
  end
end
