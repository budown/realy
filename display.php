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
        <div style="position: absolute; top: 10px; left: 10px;">
            <p>(学生：孔侦侦编辑)</p>
        </div>
        <div style="position: absolute; top: 10px; right: 10px">
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
                $sql = "SELECT count(*) FROM travel WHERE variety='都市游'";
                $result = $conn->query($sql);
                $row = $result->fetch_assoc();
                $count = $row["count"];
                echo "(发现 $count 相关项目)";
                $conn->close();
                ?>
            </div>
        </div>
        <label for="tour-type">都市游</label><br />
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
            $sql = "SELECT * FROM travel WHERE variety='都市游'";
            $result = $conn->query($sql);
            if ($result->num_rows > 0) {
                echo "<table border='1'>";
                echo "<tr><th>编号</th><th>项目</th><th>简介</th><th>价格</th><th>图片</th></tr>";
                while ($row = $result->fetch_assoc()) {
                    echo "<tr><td>"  . $row["id"] . "</td><td>"  . $row["project"] . "</td><td>"  . $row["introduction"] . "</td><td>"  . $row["price"] . "</td>td>"  . $row["picture"] . "</td></tr>";
                }
                echo "</table>";
            }
            $conn->close();
            ?>
        </div>
        <br />

    </div>

</body>

</html>