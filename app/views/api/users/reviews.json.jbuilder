json.user_detail do
  json.extract! @user, :id, :first_name, :last_name, :email, :zip_code
end

json.reviews({})
json.reviews do
  @user.reviews.each do |review|
    json.current_user_review "all"

    json.set! review.id do
      json.partial! 'api/reviews/review', review: review
      json.restaurant_name review.restaurant.name
    end
  end
end
