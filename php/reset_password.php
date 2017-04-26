<?php
/* Password reset process, updates database with new user password */
require 'db.php';
include "password.php";

session_start();

// Make sure the form is being submitted with method="post"
if ($_SERVER['REQUEST_METHOD'] == 'POST') { 

    // Make sure the two passwords match
    if ( $_POST['new_password'] == $_POST['confirm_new_password'] ) { 

        $new_password = $mysqli->escape_string(password_hash($_POST['new_password'], PASSWORD_BCRYPT));
        //$password = $mysqli->escape_string(password_hash($_POST['password'], PASSWORD_BCRYPT));

        // We get $_POST['email'] and $_POST['hash'] from the hidden input field of reset.php form
        $email = $mysqli->escape_string($_POST['email']);
        $hash = $mysqli->escape_string($_POST['hash']);
        
        $sql = "UPDATE users SET password='$new_password', hash='$hash' WHERE email='$email'";

        if ( $mysqli->query($sql) ) {   
            echo "reset_success";
        }

    }
    else {
        $_SESSION['message'] = "Two passwords you entered don't match, try again!";
        header("location: error.php");    
    }

}
?>