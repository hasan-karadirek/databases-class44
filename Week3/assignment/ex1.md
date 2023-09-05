Exercise 1: 
1- 
    "member_address" column violates 1NF by the rule =>  Single valued columns 
    "dinner_date" column violates 1NF by the rule =>Column domain (for any column) should not change.
    There is no unique names for columns
    There are duplicate records and rows do not have a primary key.
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