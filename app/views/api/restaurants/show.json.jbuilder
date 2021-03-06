json.partial! 'short_restaurant', restaurant: @restaurant, user: current_user
json.partial! 'aggregate_ratings', restaurant: @restaurant

json.extract! @restaurant, :hours, :formatted_hours, :strategy, :dining_time, :formatted_dining_time

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
  json.thumb_url asset_path(photo.image.url(:thumb))
end
