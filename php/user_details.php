<?php
/* User detail info part of the registration process, 
   inserts detailed user info into the database 

 */

include "db.php";
include "password.php";

//session_start();
// Set session variables to be used on index
$first_name = $_SESSION['firstname'];
$university = $mysqli->escape_string($_POST['university']);
$url = $mysqli->escape_string($_POST['url']);
$bio = $mysqli->escape_string($_POST['bio']);
$groups = $mysqli->escape_string($_POST['groups']);
//$selected_fields = $mysqli->escape_string($_POST['selected_fields']);
$selected_fields = implode(',', $_POST['selected_fields']);
// Escape all $_POST variables to protect against SQL injections

$email = $_SESSION['email'];
      
// Check if user with that email already exists
$result = $mysqli->query("SELECT * FROM users WHERE email='$email'") or die($mysqli->error());

// We know user email exists if the rows returned are more than 0

    $sql = "INSERT INTO users (university, url, bio, groups, selected_fields) " 
            . "VALUES ('$university','$url','$bio','$groups', '$selected_fields')";

    // Add user details to the database
    if ( $mysqli->query($sql) ){

        $_SESSION['logged_in'] = true; // So we know the user has logged in
                
        echo "account_updated";

        // Send Email 
        $to      = $email;
        $subject = 'Updated Account ( thebrane.com )';
        $message_body = '
        Hello '.$first_name.',

        You\'ve updated your user details for '.$email;  

        mail( $to, $subject, $message_body );

        //header("location: profile.php"); 

    }

    else {
        echo "error";

    }



?>