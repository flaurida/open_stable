## Component Hierarchy

#### AuthFormContainer
* AuthForm

#### UserFormContainer
* UserForm

#### SearchFormContainer
* SearchForm

#### RestaurantFormContainer
* RestaurantForm

#### RestaurantIndexContainer
* RestaurantIndexItem
  * RestaurantFavoriteButton

#### HomeContainer
* SearchFormContainer
* RestaurantIndexContainer

#### ReviewIndexContainer
* ReviewIndexItem

#### RestaurantDetailContainer
* RestaurantDescription
* RestaurantMap
* ReviewIndexContainer

#### ReviewFormContainer
* ReviewForm

#### RestaurantShowContainer
* RestaurantDetail

#### UserProfileContainer
* RestaurantIndex Container

## Routes

| Path                           | Component                 |
|--------------------------------|---------------------------|
| /signup                        | UserFormContainer         |
| /signin                        | AuthFormContainer         |
| /home                          | HomeContainer             |
| /profile                       | UserProfileContainer      |
| /restaurants/new               | RestaurantFormContainer   |
| /restaurants/:restaurantId     | RestaurantDetailContainer |
| /restaurans/:restaurantId/edit | RestaurantFormContainer   |
| /profile/edit                  | UserFormContainer         |
