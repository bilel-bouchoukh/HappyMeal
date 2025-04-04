<?php
$filename = isset($_GET['filename']) ? $_GET['filename'] : null;
?>

<!DOCTYPE html>
<html lang="fr">

<head>

    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>HAPPY MEAL</title>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">

    <link rel="stylesheet" href="./css/style.css">

</head>

<body class="">

    <?php include_once('./includes/navbar.php'); ?>

    <main>


        <?php
        if (file_exists("includes/$filename.php"))
            include("includes/$filename.php");
        else
            include("./includes/home.php");
        ?>

    </main>

    <?php include("includes/footer.php") ?>



    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.min.js"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <!-- <script src="./js/script.js"></script> -->

    <?php
    if (file_exists("./js/$filename.js"))
        echo "<script type='text/javascript' src='./js/$filename.js'></script>";
    ?>
    
</body>

</html>