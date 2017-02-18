@tables.each do |table|
  json.set! table.id do
    json.extract! table, :id, :name, :max_seats, :min_seats, :dining_time, :restaurant_id
  end
end
