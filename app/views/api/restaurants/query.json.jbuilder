json.restaurants do
  json.array! @restaurants do |restaurant|
    json.extract! restaurant, :id, :name, :city
    json.type "restaurant"
  end
end

json.cities do
  json.array! @cities do |city|
    json.name city
    json.type "city"
  end
end
