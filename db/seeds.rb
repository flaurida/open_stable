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

Restaurant.create(
  name: "Khal Tommy's",
  address: "159 W 25th Street",
  city: "New York",
  state: "New York",
  zip_code: 10001,
  price_range: "$50 and over",
  description: "App Academy is an immersive web development and job placement program in San Francisco and New York City. You only pay us if you find a job as a developer after the program. 98% of our graduates have offers or are working in tech jobs. In 2014, SF graduates received an average salary of $105,000; in 2014, NY graduates received an average salary of $89,000.",
  hours: {
    monday: [9, 5],
    tuesday: [10, 4],
    wednesday: [11, 6],
    thursday: [],
    friday: [9, 5],
    saturday: [12, 12],
    sunday: [10, 7]
  },
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
  hours: {
    monday: [9, 5],
    tuesday: [10, 4],
    wednesday: [11, 6],
    thursday: [],
    friday: [9, 5],
    saturday: [12, 12],
    sunday: [10, 7]
  },
  owner_id: User.first.id
)
