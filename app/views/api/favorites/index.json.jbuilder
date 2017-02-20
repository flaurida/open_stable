@favorites.each do |favorite|
  json.set! favorite.restaurant_id do
    json.extract! favorite, :id, :restaurant_id, :user_id
  end
end
