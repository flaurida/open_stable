# Schema Information

## users
| column name     | data type | details                   |
|-----------------|-----------|---------------------------|
| id              | integer   | not null, primary key     |
| first_name      | string    | not null                  |
| last_name       | string    | not null                  |
| username        | string    | not null, unique, indexed |
| zip_code        | integer   | not null                  |
| email           | string    | not null, unique, indexed |
| password_digest | string    | not null                  |
| session_token   | string    | not null, unique, indexed |

## restaurants
| column name | data type | details               |
|-------------|-----------|-----------------------|
| id          | integer   | not null, primary key |
| name        | string    | not null, indexed     |
| address     | string    | not null              |
| city        | string    | not null              |
| state       | string    | not null              |
| description | text      | not null              |
| latitude    | float     |                       |
| longitude   | float     |                       |
| hours       | json      |                       |

## reservations
| column name   | data type | details                        |
|---------------|-----------|--------------------------------|
| id            | integer   | not null, primary key          |
| restaurant_id | integer   | not null, foreign key, indexed |
| time          | datetime  | not null                       |
| status        | string    | not null, default "pending"    |
| user_id       | integer   | not null, foreign key, indexed |

## reviews
| column name     | data type | details                        |
|-----------------|-----------|--------------------------------|
| id              | integer   | not null, primary key          |
| restaurant_id   | integer   | not null, foreign key, indexed |
| user_id         | integer   | not null, foreign key, indexed |
| overall_rating  | integer   | not null, in range 1-5         |
| food_rating     | integer   | in range 1-5                   |
| service_rating  | integer   | in range 1-5                   |
| ambience_rating | integer   | in range 1-5                   |
| value_rating    | integer   | in range 1-5                   |
| would_recommend | boolean   | not null                       |
| body            | text      | not null                       |

## favorites
| column name   | data type | details                        |
|---------------|-----------|--------------------------------|
| id            | integer   | not null, primary key          |
| user_id       | integer   | not null, indexed, foreign key |
| restaurant_id | integer   | not null, indexed, foreign key |
