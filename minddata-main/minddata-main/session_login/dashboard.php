<?php
// dashboard.php
session_start();

if (empty($_SESSION['user'])) {
    header('Location: index.php?msg=' . urlencode('Please login first'));
    exit;
}

$user = $_SESSION['user'];
?>
<!doctype html>
<html>
<head><meta charset="utf-8"><title>Dashboard</title></head>
<body>
  <h2>Welcome, <?php echo htmlspecialchars($user['username']); ?></h2>
  <p>Logged in at: <?php echo date('Y-m-d H:i:s', $user['login_time']); ?></p>

  <form method="post" action="logout.php">
    <button type="submit">Logout</button>
  </form>
</body>
</html>