<?php
// users.php
// Demo user store. In real apps use a database.
return [
    // username => password_hash('password123', PASSWORD_DEFAULT)
    'alice' => '$2y$10$9aP5w1y1qXbQZ0s9Gf0vEu5l7wN9UoJvH2zQ0q9Hnqg5KQZ7H3bW6',
    'bob'   => password_hash('secret', PASSWORD_DEFAULT), // generate at runtime
];
?>