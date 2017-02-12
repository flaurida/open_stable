```
{
 currentUser: {
   id: 11,
   username: "flaurida"
 },
 errors: {
   signUp: ["username can't be blank"],
   signIn: [],
   createRestaurant: [],
   editRestaurant: [],
   createReview: [],
   editReview: []
 },
 restaurants: {
   1: {
     id: 1,
     name: "Laura's Diner",
     address: "160 E 23rd Street",
     city: "New York",
     state: "NY",
     reviews: {
       1: {
         id: 1,
         user_id: 11,
         content: "awesome!",
         rating: 5
       }
     },
     favorited_by_current_user: true
   }
 },
 restaurantDetail: {
   id: 1,
   name: "Laura's Diner",
   address: "160 E 23rd Street",
   city: "New York",
   state: "NY",
   hours: {
     Monday: [9:00 AM, 10:00 PM],
     Tuesday: [9:00 AM, 10:00 PM],
     Wednesday: [9:00 AM, 10:00 PM],
     Thursday: [9:00 AM, 10:00 PM],
     Friday: [9:00 AM, 11:00 PM],
     Saturday: [10:00 AM, 11:00 PM],
     Sunday: [12:00 PM, 5:00 PM]
   },
   description: "take your horde here for some good eats that both horses and humans will love"
   reviews: {
     1: {
       id: 1,
       user_id: 11,
       content: "awesome!",
       rating: 5
     }
   },
   favorited_by_current_user: true
 }
}
```
