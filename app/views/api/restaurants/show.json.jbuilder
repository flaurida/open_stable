json.partial! 'short_restaurant', restaurant: @restaurant

json.extract! @restaurant, :hours, :formatted_hours

json.reviews do
  @restaurant.reviews.each do |review|
    json.set! review.user_id do
      json.partial! 'api/reviews/review', review: review
    end
  end
end
