<?php
// authenticate.php
declare(strict_types=1);

// Configure session cookie params before session_start
$cookieParams = session_get_cookie_params();
session_set_cookie_params([
    'lifetime' => 0,
    'path' => $cookieParams['path'],
    'domain' => $cookieParams['domain'],
    'httponly' => true,
    'samesite' => 'Lax'
]);

session_start();

// Load users
$users = require __DIR__ . '/users.php';

// Get input
$username = trim($_POST['username'] ?? '');
$password = $_POST['password'] ?? '';

if (!$username || !$password) {
    header('Location: index.php?msg=' . urlencode('Missing username or password'));
    exit;
}

// Verify user
if (isset($users[$username]) && password_verify($password, $users[$username])) {
    session_regenerate_id(true); // prevent fixation
    $_SESSION['user'] = [
        'username' => $username,
        'login_time' => time()
    ];
    header('Location: dashboard.php');
    exit;
} else {
    header('Location: index.php?msg=' . urlencode('Invalid credentials'));
    exit;
}
?>