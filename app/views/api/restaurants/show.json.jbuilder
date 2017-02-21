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
