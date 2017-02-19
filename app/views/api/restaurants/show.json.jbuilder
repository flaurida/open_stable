json.partial! 'short_restaurant', restaurant: @restaurant

json.extract! @restaurant, :hours, :formatted_hours

json.reviews do
  @restaurant.reviews.each do |review|
    json.set! review.id do
      json.extract! review, :user_id, :body, :overall_rating, :food_rating,
      :service_rating, :ambience_rating, :value_rating, :noise_rating, :recommended
      json.reviewer_name review.user.full_name
    end
  end
end
