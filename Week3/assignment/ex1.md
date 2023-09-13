Exercise 1: 
1- member_address, food_code, and food_description (non-atomic or composite values) and dinner_date (inconsistent data type).
    
2-
Member:member_id, member_name, member_address

Dinner:dinner_id, dinner_date

Venue:venue_code, venue_description

Food:food_code, food_description
3-
Members
member_id (PK), member_name, member_address

Dinners
dinner_id (PK), dinner_date, venue_id (FK)

Venues
venue_id (PK), venue_code, venue_description

Foods
food_code (PK), food_description

MemberDinners 
member_id (FK), dinner_id (FK)

DinnerFoods 
dinner_id (FK), food_code (FK)