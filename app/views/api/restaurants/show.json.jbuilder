json.partial! 'short_restaurant', restaurant: @restaurant, user: current_user

json.extract! @restaurant, :hours, :formatted_hours, :strategy, :dining_time, :food_rating, :noise_rating,
:service_rating, :value_rating, :ambience_rating

user = current_user

json.reviews({})
json.reviews do
  @restaurant.reviews.each do |review|
    json.current_user_review nil

    json.set! review.id do
      json.partial! 'api/reviews/review', review: review
    end

    json.current_user_review review.id if user && user.id == review.user_id
  end
end

json.photos([])

json.photos @restaurant.photos do |photo|
  json.extract! photo, :id, :user_id, :restaurant_id
  json.image_url asset_path(photo.image.url)
end
