<?php
    if (isset($_POST['user-name']) && isset($_POST['user-mail']) && isset($_POST['user-message']) && isset($_POST['rgpd']))
    {
        if (empty($_POST['user-name']) || empty($_POST['user-mail']) || empty($_POST['user-message']))
        {
            echo json_encode('Les champs "Nom", "Mail" et "Message" sont obligatoires');
        }
        else
        {
            if (!preg_match( " /^[^\W][a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*\@[a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*\.[a-zA-Z]{2,4}$/ " , $_POST["user-mail"] ))
            {
                echo json_encode("Mail non valide");
            }
            else 
            {
                $headers  = 'MIME-Version: 1.0' . "\n";
                $headers .= 'Content-type: text/html; charset=utf-8' . "\n";
                $headers .= 'From: ' . $_POST['user-mail'] . "\n";

                $message = '<h1>Message envoyé depuis la page Contact de clement-heritier.fr</h1>
                <p><b>Nom : </b>' . $_POST['user-name'] . '<br>
                <b>Email : </b>' . $_POST['user-mail'] . '<br>
                <b>Téléphone : </b>' . $_POST['user-number'] . '<br>
                <b>Sujet : </b>' . $_POST['sujet'] . '<br>
                <b>Message : </b>' . $_POST['user-message'] . '</p>';

                $retour = mail('clement.exe@gmail.com', 'Envoi depuis page Contact', $message, $headers);

                if($retour) {
                    echo json_encode('Votre message a bien été envoyé.');
                }
                else
                {
                    echo json_encode("Le message n'a pas ete envoyé");
                }
            }
        }
    }
?>