result.each do |key, value|
  json.set! key, value
end

json.image_url asset_path(result[:image_url])
