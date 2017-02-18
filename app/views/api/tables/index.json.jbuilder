@tables.each do |table|
  json.set! table.id do
    json.partial! 'api/tables/short_table', table: table
  end
end
