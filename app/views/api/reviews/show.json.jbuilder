json.partial! 'review', review: @review, old_review: @old_review

if @restaurant
  json.updated_ratings do
    json.partial! 'api/restaurants/aggregate_ratings', restaurant: @restaurant
  end
end
