
SELECT movies.id, rentals.movie_id, rentals.customer_id, customers.*
FROM rentals
INNER JOIN movies
ON movies.id=rentals.movie_id
INNER JOIN customers
ON rentals.customer_id=customers.id
WHERE movies.title=$1;
