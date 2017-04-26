<?php
/* The password reset form, the link to this page is included
   from the forgot.php email message
*/

// Make sure email and hash variables aren't empty
if( isset($_GET['email']) && !empty($_GET['email']) AND isset($_GET['hash']) && !empty($_GET['hash']) )
{
    $reset_email = $mysqli->escape_string($_GET['email']); 
    $reset_hash = $mysqli->escape_string($_GET['hash']); 

    // Make sure user email with matching hash exist
    $result = $mysqli->query("SELECT * FROM users WHERE email='$reset_email' AND hash='$reset_hash'");
    
    if ( $result->num_rows == 0 )
    { 
        echo "!valid_url";
        die;
        //header("location: error.php");  
    }

?>
<script>  
    $(document).ready(function(){
        Reset.init();
        $("#reset-modal").modal('show'); 
    })
  </script>
<?php
}
else {
    $_SESSION['message'] = "Sorry, verification failed, try again!";
    header("location: error.php");  
}
?>