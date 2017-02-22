@result.each do |key, value|
  json.set! key do
    json.partial! 'restaurant_search', result: value
  end
end
