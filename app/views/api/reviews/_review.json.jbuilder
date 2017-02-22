json.extract! review, :id, :user_id, :restaurant_id, :body, :overall_rating, :food_rating,
:service_rating, :ambience_rating, :value_rating, :noise_rating, :recommended
json.reviewer_name review.user.full_name
