json.extract! restaurant, :overall_rating, :food_rating,
:service_rating, :value_rating, :ambience_rating

json.noise_rating restaurant.formatted_noise_rating(restaurant.noise_rating)
