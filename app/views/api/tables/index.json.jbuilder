json.array! @tables.each do |table|
  json.extract! table, :id, :name, :max_seats, :min_seats, :dining_time
end
