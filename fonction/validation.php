<?php
    $target_dir = "uploads/";
    $target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]);
    $uploadOk = 1;
    $imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));

    if ($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg")
    {
        echo "sorry, only JPG, JPEG & PNG are allowed.";
        $uploadOk = 0;
    }

    else
    {
        if (move_uploaded_file($_FILES["fileToUpload"] ["tmp_name"], $target_file))
        {
            echo "Le fichier ". basename( $_FILES["fileToUpload"]["name"]). " a été envoyé"
        }
        else 
        {
            echo "Désolé, une erreur est survenue durant l'envoi du fichier."
        }
    }
?>