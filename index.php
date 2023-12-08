<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>玩转上海</title>
</head>

<body>
  <div style="text-align: center">
    <div>
      <h1>玩转上海</h1>
    </div>
    <div style="position: absolute; top: 10px; right: 10px">
      <p><strong>(学生：孔侦侦编辑)</strong></p>
    </div>
    <div style="width: 100%; border: 1px solid #d0d0d0"></div>
    <label for="tour-type">旅游景点</label><br />
    <div>
      <?php
      $servername = "127.0.0.1";
      $username = "root";
      $password = "root";
      $dbname = "demo";

      $conn = new mysqli($servername, $username, $password, $dbname);

      // 检查连接是否成功
      if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
      }
      $sql = "select distinct variety from travel where category='旅游景点';";
      $result = $conn->query($sql);
      if ($result->num_rows > 0) {
        echo "<label>";
        while ($row = $result->fetch_assoc()) {
          echo "<input type='radio' />"  . $row["variety"];
        }
        echo "</label>";
      }

      $conn->close();
      ?>
    </div>
    <br />

    <label for="accommodation-type">住宿</label><br />
    <div>
      <?php
      $servername = "127.0.0.1";
      $username = "root";
      $password = "root";
      $dbname = "demo";

      $conn = new mysqli($servername, $username, $password, $dbname);
      if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
      }
      $sql = "select distinct variety from travel where category='住宿';";
      $result = $conn->query($sql);
      if ($result->num_rows > 0) {
        echo "<label>";
        while ($row = $result->fetch_assoc()) {
          echo "<input type='radio' />"  . $row["category"];
        }
        echo "</label>";
      }

      $conn->close();
      ?>
    </div>
    <br />

    <input type="submit" value="选择种类" />
    <div style="width: 100%; border: 1px solid #d0d0d0"></div>
  </div>

</body>

</html>