json.partial! 'short_restaurant', restaurant: @restaurant, user: current_user

json.extract! @restaurant, :hours, :formatted_hours, :strategy, :dining_time

user = current_user

json.reviews({})
json.reviews do
  @restaurant.reviews.each do |review|
    json.current_user_review nil

    json.set! review.id do
      json.partial! 'api/reviews/review', review: review
    end

    json.current_user_review review.id if user.id == review.user_id
  end
end

json.photos({})
json.photos do
  @restaurant.photos.each do |photo|

    json.set! photo.id do
      json.extract! photo, :id, :user_id, :restaurant_id
      json.image_url asset_path(photo.image.url)
    end
  end
end
