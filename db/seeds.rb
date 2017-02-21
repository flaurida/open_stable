# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
User.destroy_all
Restaurant.destroy_all
Review.destroy_all
Favorite.destroy_all
Booking.destroy_all

User.create(
  first_name: "Daenerys",
  last_name: "Targaryen",
  email: "iluvdrogo@dany.com",
  password: "dragon",
  zip_code: 10001
)

users = [
  ["Khal", "Bharbo"],
  ["Rider", "Qotho"],
  ["Rider", "Haggo"],
  ["Ko", "Mago"],
  ["Ko", "Jhaqo"],
  ["Khal", "Drogo"],
  ["Khal", "Moro"],
  ["Khal", "Forzo"],
  ["Rider", "Kovarro"],
  ["Arya", "Stark"],
  ["Sansa", "Stark"],
  ["Jon", "Snow"],
  ["Podrick", "Payne"],
  ["Brienne", "of Tarth"],
  ["Mance", "Rayder"],
  ["Khal", "Rhaego"],
  ["Rider", "Cohollo"],
  ["Khal", "Pono"],
  ["Rider", "Aggo"],
  ["Rider", "Rakharo"],
  ["Warrior", "Malakho"],
  ["Rider", "Qhono"],
  ["Warrier", "Akho"],
  ["Khal", "Rhalko"],
  ["Khal", "Savo"],
  ["Khaleesi", "Ornela"]
]

users.each do |user|
  User.create(
    first_name: user[0],
    last_name: user[1],
    email: "#{user.join("_").downcase}@got.com",
    password: "password",
    zip_code: 10010
  )
end

user_ids = User.all.ids

hours = [
  {
    monday: ["9:00 am", "5:00 pm"],
    tuesday: ["9:00 am", "5:00 pm"],
    wednesday: ["9:00 am", "5:00 pm"],
    thursday: ["9:00 am", "5:00 pm"],
    friday: ["9:00 am", "5:00 pm"],
    saturday: ["12:00 pm", "5:00 pm"],
    sunday: ["10:00 am", "7:00 pm"]
  },
  {
    monday: ["11:00 am", "7:00 pm"],
    tuesday: [],
    wednesday: ["9:00 am", "5:00 pm"],
    thursday: ["12:00 pm", "5:00 pm"],
    friday: ["9:00 am", "5:00 pm"],
    saturday: ["12:00 pm", "5:00 pm"],
    sunday: []
  },
  {
    monday: ["11:00 am", "7:00 pm"],
    tuesday: ["11:00 am", "7:00 pm"],
    wednesday: ["9:00 am", "5:00 pm"],
    thursday: ["12:00 pm", "10:00 pm"],
    friday: ["9:00 am", "1:00 pm", "6:00 pm", "11:30 pm"],
    saturday: ["2:00 pm", "11:00 pm"],
    sunday: []
  },
  {
    monday: ["11:00 am", "10:00 pm"],
    tuesday: ["11:00 am", "7:00 pm"],
    wednesday: [],
    thursday: ["12:00 pm", "8:00 pm"],
    friday: ["9:00 am", "1:00 pm", "6:00 pm", "11:30 pm"],
    saturday: ["2:00 pm", "5:00 pm", "7:00 pm", "11:00 pm"],
    sunday: ["11:00 am", "10:00 pm"]
  },
  {
    monday: ["11:00 am", "10:00 pm"],
    tuesday: ["8:00 am", "3:00 pm"],
    wednesday: [],
    thursday: ["12:00 pm", "8:00 pm"],
    friday: ["9:00 am", "1:00 pm", "6:00 pm", "11:30 pm"],
    saturday: [],
    sunday: ["7:00 am", "2:00 pm"]
  }
]

price_ranges = ["$15 and under", "$16 to $30", "$31 to $50", "$50 and over"]

Restaurant.create(
  name: "Khal Tommy's",
  address: "159 W 25th Street",
  city: "New York",
  state: "New York",
  zip_code: 10001,
  price_range: "$50 and over",
  description: "App Academy is an immersive web development and job placement program in San Francisco and New York City. You only pay us if you find a job as a developer after the program. 98% of our graduates have offers or are working in tech jobs. In 2014, SF graduates received an average salary of $105,000; in 2014, NY graduates received an average salary of $89,000.",
  hours: hours.sample,
  owner_id: User.first.id,
  strategy: Restaurant::STRATEGIES.sample,
  category: Restaurant::CATEGORIES.sample,
  dining_time: Restaurant::DINING_TIMES.sample
)

Table.create(
  name: "Table 1",
  restaurant_id: Restaurant.first.id,
  min_seats: 2,
  max_seats: 4
)

Table.create(
  name: "Table 2",
  restaurant_id: Restaurant.first.id,
  min_seats: 3,
  max_seats: 4
)

booking = Booking.create(
  user_id: User.first.id,
  table_id: Table.first.id,
  start_time: "#{Date.today} 6:30 pm",
  num_seats: 3
)

Booking.create(
  user_id: User.first.id,
  table_id: Table.last.id,
  start_time: "#{Date.today} 7:30 pm",
  num_seats: 3
)

Restaurant.create(
  name: "Mother of Dragons",
  address: "160 E 23rd Street",
  city: "New York",
  state: "New York",
  zip_code: 10010,
  price_range: "$15 and under",
  description: "When my dragons are grown, we will take back what was stolen from me and destroy those who wronged me! We will lay waste to armies and burn cities to the ground!",
  hours: hours.sample,
  owner_id: User.first.id,
  strategy: Restaurant::STRATEGIES.sample,
  category: Restaurant::CATEGORIES.sample,
  dining_time: Restaurant::DINING_TIMES.sample
)

new_york = [
  ["793 9th Ave", 10019],
  ["1123 Broadway", 10010],
  ["550 LaGuardia Pl", 10012],
  ["3 E 36th St", 10016],
  ["674 Manhattan Ave", 11222],
  ["561 Lorimer St", 11211],
  ["14 Bedford Ave", 11237],
  ["150 Manhattan Ave", 11206],
  ["One W 58th St", 10019],
  ["171 E Broadway", 10002],
  ["68B Forsyth St", 10002],
  ["142 Orchard St", 10002],
  ["171 1st Ave", 10003],
  ["80 Spring St", 10012],
  ["4 Penn Plz", 10121],
  ["131 Sullivan St", 10012],
  ["142 Mercer St", 10012],
  ["205 E Houston St", 10002],
  ["47 E Houston St", 10012],
  ["119 1st Ave", 10003],
  ["430 E 9th St", 10009],
  ["403 E 12th St", 10009],
  ["42 E 20th St", 10003],
  ["35 E 21st St", 10010],
  ["1170 Broadway", 10001],
  ["401 W 24th St", 10011],
  ["16 W 29th St", 10001],
  ["23 W 32nd St", 10001],
  ["709 9th Ave", 10019],
  ["152 W 49th St", 10019],
  ["10 Columbus Circle", 10019],
  ["123 W 56th St", 10019],
  ["1900 Broadway", 10023],
  ["1372 York Ave", 10021],
  ["103 W 77th St", 10024],
  ["2287 1st Ave", 10035],
  ["6413 39th Ave", 11377],
  ["1209 Jackson Ave", 11101],
  ["5-48 49th Ave", 11101],
  ["567 Union Ave", 11211],
  ["355 Metropolitan Ave", 11211],
  ["261 Moore St", 11206],
  ["178 Broadway", 11211],
  ["81 Broadway", 11249],
  ["465 Court St", 11231],
  ["659 Vanderbilt Ave", 11238],
  ["454 Van Brunt St", 11231],
  ["6409 8th Ave", 11220]
]

new_york.each do |data|
  Restaurant.create(
    name: GOTFaker::Character.random_name,
    address: data[0],
    city: "New York",
    state: "New York",
    zip_code: data[1],
    price_range: price_ranges.sample,
    description: GOTFaker::Quote.bad_ass,
    hours: hours.sample,
    owner_id: user_ids.sample,
    strategy: Restaurant::STRATEGIES.sample,
    category: Restaurant::CATEGORIES.sample,
    dining_time: Restaurant::DINING_TIMES.sample
  )
end

san_francisco = [
  ["3132 Vicente St", 94116],
  ["4001 Judah St", 94122],
  ["3640 Sacramento St", 94118],
  ["941 Cole St", 94117],
  ["291 30th St", 94131],
  ["1192 Market St", 94102],
  ["1001 Guerrero St", 94110],
  ["2889 Mission St", 94110],
  ["1199 Valencia St", 94110],
  ["3115 22nd St", 94110],
  ["2534 Mission St", 94110],
  ["3416 19th St", 94110],
  ["499 Dolores St", 94103],
  ["1658 Market St", 94102],
  ["199 Gough St", 94102],
  ["517 Hayes St", 94102],
  ["609 Hayes St", 94102],
  ["1529 Fillmore Street", 94115],
  ["1911 Fillmore St", 94115],
  ["1517 Polk St", 94109],
  ["1906 Van Ness Ave", 94109],
  ["1896 Hyde St", 94109],
  ["871 Sutter St", 94109],
  ["855 Bush St", 94108],
  ["55 Cyril Magnin St", 94102],
  ["1570 Stockton St", 94133],
  ["601 Union St", 94133],
  ["490 Pacific Avenue", 94133],
  ["242 Columbus Ave", 94133],
  ["655 Jackson St", 94133],
  ["568 Sacramento St", 94111],
  ["431 Bush St", 94108],
  ["101 Spear St", 94105],
  ["140 New Montgomery St", 94105],
  ["22 Hawthorne St", 94105],
  ["178 Townsend St", 94107],
  ["564 4th St", 94107],
  ["1058 Folsom St", 94103],
  ["2293 Mission St", 94110],
  ["2704 24th St", 94110],
  ["525 Van Ness Ave", 94102],
  ["280 Valencia St", 94103],
  ["888 Brannan St", 94103],
  ["400 Eddy St", 94109],
  ["508 4th St", 94107],
  ["2136 Union St", 94123],
  ["100 Van Ness Ave", 94102],
  ["2030 Union St", 94123],
  ["2323 Polk St", 94109],
  ["28 Waverly Pl", 94108],
  ["983 Valencia St", 94110],
  ["330 Gough St", 94102],
  ["2223 Market St", 94114],
  ["2400 Harrison St", 94110],
  ["595 Alabama St", 94110],
  ["2501 Mariposa St", 94110],
  ["528 Laguna St", 94102],
  ["1000 Larkin St", 94109],
  ["1550 Church St", 94131]
]

san_francisco.each do |data|
  Restaurant.create(
    name: GOTFaker::Character.random_name,
    address: data[0],
    city: "San Francisco",
    state: "California",
    zip_code: data[1],
    price_range: price_ranges.sample,
    description: GOTFaker::Quote.bad_ass,
    hours: hours.sample,
    owner_id: user_ids.sample,
    strategy: Restaurant::STRATEGIES.sample,
    category: Restaurant::CATEGORIES.sample,
    dining_time: Restaurant::DINING_TIMES.sample
  )
end

seattle = [
  ["9702 NE 120th Pl", 98034],
  ["2408 NW 80th St", 98117],
  ["7302 15th Ave NW", 98117],
  ["1415 NW 70th St", 98117],
  ["2404 NE 65th St", 98115],
  ["305 Harrison St", 98109],
  ["425 NW Market St", 98107],
  ["5451 Leary Ave NW", 98107],
  ["4743 Ballard Ave NW", 98107],
  ["1711 N 45th St", 98103],
  ["403 N 36th St", 98103],
  ["1054 N 39th St", 98103],
  ["3621 Stone Way N", 98103],
  ["2501 N Northlake Way", 98103],
  ["2576 Aurora Ave N", 98109],
  ["14625 NE 24th St Ste 4B", 98007],
  ["133 Winslow Way E", 98110],
  ["617 Broadway E", 98102],
  ["403 15th Ave E", 98112],
  ["1802 Bellevue Ave", 98122],
  ["1211 Pine St", 98101],
  ["1521 Melrose Ave", 98122],
  ["300 E Pike St", 98122],
  ["1060 E Union St", 98122],
  ["952 E Seneca St", 98122],
  ["1933 1st Ave", 98101],
  ["86 Pine St Ste 1", 98101],
  ["94 Pike St", 98101],
  ["550 12th Ave", 98122],
  ["217 James St", 98104],
  ["106 Occidental Ave S", 98104],
  ["515 S Main St", 98104],
  ["1207 S Jackson St", 98144],
  ["1660 Harbor Ave SW", 98127],
  ["3057 Beacon Ave S", 98144],
  ["4725 California Avenue Southwest", 98116],
  ["5300 Rainier Ave S", 98118],
  ["700 NW Gilman Blvd", 98027],
  ["9811 15th Ave SW", 98106],
  ["1001 4th Ave", 98154],
  ["1514 Pike Place Ave", 98101],
  ["4225 Fremont Ave N", 98103],
  ["1301 5th Ave", 98101],
  ["407 Cedar St", 98121],
  ["2576 Aurora Ave N", 98109],
  ["2226 1st Ave", 98121],
  ["3621 Stone Way N", 98103],
  ["323 Occidental Ave S", 98104],
  ["6460 24th Ave NW", 98107],
  ["1103 1st Ave", 98101],
  ["2525 4th Ave", 98121],
  ["2366 Eastlake Ave E", 98102],
  ["410 Broadway E", 98102],
  ["217 James St", 98104]
]

seattle.each do |data|
  Restaurant.create(
    name: GOTFaker::Character.random_name,
    address: data[0],
    city: "Seattle",
    state: "Washington",
    zip_code: data[1],
    price_range: price_ranges.sample,
    description: GOTFaker::Quote.bad_ass,
    hours: hours.sample,
    owner_id: user_ids.sample,
    strategy: Restaurant::STRATEGIES.sample,
    category: Restaurant::CATEGORIES.sample,
    dining_time: Restaurant::DINING_TIMES.sample
  )
end

las_vegas = [
  ["5030 Spring Mountain Road", 89146],
  ["4321 W Flamingo Rd", 89103],
  ["Encore Hotel and Casino", 89109],
  ["3730 Las Vegas Blvd S", 89158],
  ["3667 Las Vegas Blvd S", 89109],
  ["2535 Las Vegas Blvd S", 89109],
  ["3708 Las Vegas Blvd S", 89109],
  ["3355 South Las Vegas Boulevard", 89109],
  ["3225 Las Vegas Blvd S", 89109],
  ["3400 South Jones Boulevard", 89146],
  ["3950 Schiff Dr", 89103],
  ["3131 Las Vegas Blvd S", 89109],
  ["3325 Las Vegas Blvd. S", 89109],
  ["3400 S Jones Blvd Ste B", 89146],
  ["3429 S Jones Blvd", 89146],
  ["3600 Las Vegas Boulevard South", 89109],
  ["11011 W Charleston Blvd", 89135],
  ["5808 Spring Mountain Rd", 89146],
  ["3708 Las Vegas Blvd S", 89109],
  ["3799 Las Vegas Blvd S", 89109],
  ["3799 Las Vegas Blvd S", 89109],
  ["3600 Las Vegas Blvd S", 89109],
  ["953 E Sahara Ave", 89104],
  ["3131 South Las Vegas Boulevard", 89109],
  ["3240 Arville St", 89102],
  ["3655 S Durango Dr Ste 6", 89147],
  ["3600 South Las Vegas Boulevard", 89109],
  ["201 N 3rd St", 89101],
  ["3570 Las Vegas Blvd S", 89109],
  ["3730 Las Vegas Blvd S", 89158],
  ["140 S Green Valley Pkwy", 89012],
  ["3500 Las Vegas Blvd", 89109],
  ["3131 Las Vegas Blvd S", 89109],
  ["3752 Las Vegas Blvd S", 89158],
  ["4983 W Flamingo Rd", 89103],
  ["3460 Arville St", 89102],
  ["6115 S Fort Apache Rd", 89148],
  ["9925 S Eastern Ave", 89183],
  ["7591 W Washington Ave", 89128],
  ["7865 W Sahara Ave", 89117],
  ["3641 Las Vegas Blvd S", 89109],
  ["3780 S Las Vegas Blvd", 89158],
  ["3465 Las Vegas Blvd S", 89109],
  ["3545 Las Vegas Blvd S", 89109],
  ["3889 Spring Mountain Rd", 89102],
  ["3708 Las Vegas Blvd S", 89109],
  ["3799 S Las Vegas Blvd", 89109],
  ["6870 Spring Mountain Rd", 89146],
  ["11261 S Eastern Ave", 89052],
  ["6640 N Durango Dr", 89149],
  ["7790 S Jones Blvd", 89139],
  ["3708 S Las Vegas Blvd", 89109]
]

las_vegas.each do |data|
  Restaurant.create(
    name: GOTFaker::Character.random_name,
    address: data[0],
    city: "Las Vegas",
    state: "Nevada",
    zip_code: data[1],
    price_range: price_ranges.sample,
    description: GOTFaker::Quote.bad_ass,
    hours: hours.sample,
    owner_id: user_ids.sample,
    strategy: Restaurant::STRATEGIES.sample,
    category: Restaurant::CATEGORIES.sample,
    dining_time: Restaurant::DINING_TIMES.sample
  )
end


restaurant_ids = Restaurant.all.ids


150.times do
  min_seats = (1..20).to_a.sample
  max_seats = min_seats + (0..4).to_a.sample


  Table.create(min_seats: min_seats, max_seats: max_seats,
  name: GOTFaker::Character.random_name,
  restaurant_id: restaurant_ids.sample)
end

scores = (1..5).to_a
recommend = [true, false]

150.times do
  Review.create(user_id: user_ids.sample, restaurant_id: restaurant_ids.sample,
  overall_rating: scores.sample, food_rating: scores.sample, ambience_rating: scores.sample,
  value_rating: scores.sample, service_rating: scores.sample, noise_rating: scores.sample, recommended: recommend.sample,
  body: GOTFaker::Quote.bad_ass)
end

150.times do
  Favorite.create(user_id: user_ids.sample, restaurant_id: restaurant_ids.sample)
end
