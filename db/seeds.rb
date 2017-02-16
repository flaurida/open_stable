# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
User.destroy_all
Restaurant.destroy_all
Category.destroy_all

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
  ["Jon", "Snow"]
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

hours = [
  {
    monday: [Time.parse("9:00 am"), Time.parse("5:00 pm")],
    tuesday: [Time.parse("10:00 am"), Time.parse("6:00 pm")],
    wednesday: [Time.parse("9:00 am"), Time.parse("7:00 pm")],
    thursday: [],
    friday: [Time.parse("9:00 am"), Time.parse("6:00 pm")],
    saturday: [Time.parse("12:00 pm"), Time.parse("10:00 pm")],
    sunday: [Time.parse("12:00 am"), Time.parse("5:00 pm")]
  }
]

Restaurant.create(
  name: "Khal Tommy's",
  address: "159 W 25th Street",
  city: "New York",
  state: "New York",
  zip_code: 10001,
  price_range: "$50 and over",
  description: "App Academy is an immersive web development and job placement program in San Francisco and New York City. You only pay us if you find a job as a developer after the program. 98% of our graduates have offers or are working in tech jobs. In 2014, SF graduates received an average salary of $105,000; in 2014, NY graduates received an average salary of $89,000.",
  hours: hours.sample,
  owner_id: User.first.id
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
  owner_id: User.first.id
)

categories = [
  "Frequent brawling",
  "Horses eat free",
  "Tents provided",
  "Trading center",
  "Great for weddings",
  "Far from water",
  "No blood magic",
  "Free braiding",
  "Good for ceremonies",
  "Near Vaes Dothrak"
]

categories.each { |category| Category.create(name: category) }
