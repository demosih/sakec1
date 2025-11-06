<?php
// index.php
session_start();

// If already logged in, send to dashboard
if (!empty($_SESSION['user'])) {
    header('Location: dashboard.php');
    exit;
}

// Show any message (e.g. after logout)
$msg = $_GET['msg'] ?? '';
?>
<!doctype html>
<html>
<head><meta charset="utf-8"><title>Login</title></head>
<body>
  <h2>Login</h2>
  <?php if ($msg): ?>
    <p style="color:green;"><?php echo htmlspecialchars($msg); ?></p>
  <?php endif; ?>

  <form method="post" action="authenticate.php">
    <label>Username:<br>
      <input name="username" required autofocus>
    </label><br><br>

    <label>Password:<br>
      <input name="password" type="password" required>
    </label><br><br>

    <button type="submit">Login</button>
  </form>
</body>
</html>