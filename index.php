<?php
  include "php/db.php";
  session_start();
 /* 

    session_unset();
  session_destroy(); 


*/ 
  if ( $_SESSION['logged_in'] === true ) {

    $first_name = $_SESSION['first_name'];
    $last_name = $_SESSION['last_name'];
    $email = $_SESSION['email'];
  }
?>

<!DOCTYPE html>
<html>

<head>

  <!-- Website Title & Description for Search Engine purposes -->

  <title>The Brane</title>

  <meta name="description" content="">

  <meta charset="UTF-8">


  <!-- Mobile viewport optimized -->

  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">



  <!-- Bootstrap CSS 

  <link href="bootstrap/css/bootstrap.min.css" rel="stylesheet">

  <link href="bootstrap/css/bootstrap-theme.min.css" rel="stylesheet">

  <link href="bootstrap/css/bootstrap-glyphicons.css" rel="Sstylesheet">
-->
  <!-- Custom CSS -->

  <!--<link href="css/component.css" rel="stylesheet">
  <link href="css/select2.css" rel="stylesheet">

  <link href="css/tagmanager.css" rel="stylesheet">

  <link href="css/styles.css" rel="stylesheet">

  <link href="css/material-design-iconic-font.css" rel="stylesheet">
 -->
  <link rel="shortcut icon" type="image/x-icon" href="favicon.ico">
 
  <!--

  <link href="css/styles-old.css" rel="stylesheet">
  -->
  <link href='http://fonts.googleapis.com/css?family=Roboto+Mono:100,300,400' rel='stylesheet' type='text/css'>

    <link href="css/dist/main.css" rel="stylesheet">

  <!-- Include Modernizr in the head, before any other Javascript 

  <script src="js/modernizr-2.6.2.min.js"></script>

  <script src="js/jquery-1.11.1.min.js"></script>

  <script src="bootstrap/js/bootstrap.min.js"></script>

  <script src="js/formValidation.js"></script>

  <script src="js/tagmanager.js"></script>

  <script src="js/select2.min.js"></script>

  <script src="js/typeahead.jquery.js"></script>

  <script src="js/bloodhound.js"></script>

  <script src="bootstrap/js/npm.js"></script>

  <script src="js/jqBootstrapValidation.js"></script>

  <script src="js/scripts.js"></script>

  <script src="js/pubsub.js"></script>
  -->

  <script src="js/dist/main.js"></script>

  <script>
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

    ga('create', 'UA-89980852-1', 'auto');
    ga('send', 'pageview');

  </script>

  <?php
  if (isset($_GET['activated'])) {
  ?>

  <script>
  $(document).ready(function(){
    console.log("head init");
    
    //test;
    registration.init(2);
    registration.activate();
    $("#register-modal").modal('show'); 
  })
  
  </script>

  <?php    
  } else {
    ?>
  <script>  
    $(document).ready(function(){
      console.log("head init");
      
      //test;
      registration.init(0);
    })
  </script>
  <?php
  
  }

  if (isset($_GET['reset'])) {
    require 'php/reset.php';    

  }

  ?>
  <!--
  <script type="text/javascript">
  window.smartlook||(function(d) {
  var o=smartlook=function(){ o.api.push(arguments)},h=d.getElementsByTagName('head')[0];
  var c=d.createElement('script');o.api=new Array();c.async=true;c.type='text/javascript';
  c.charset='utf-8';c.src='//rec.smartlook.com/recorder.js';h.appendChild(c);
  })(document);
  smartlook('init', 'd22bf15cb04f7931167d7b3d81d0df73ca38662f');
  </script>
  -->

</head>

<body style="overflow-x:hidden">

  <header id="top">

    <div class="navbar-wrapper">

      <div class="container-fluid">

        <nav class="navbar navbar-fixed-top">

          <div class="container">

            <div class="navbar-header">

              <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">

                  <span class="sr-only">Toggle navigation</span>

                  <span class="icon-bar"></span>

                  <span class="icon-bar"></span>

                  <span class="icon-bar"></span>

                </button>
              <a class="navbar-brand" href="#top"><img src="images/logo-trans.png" style="width:140px" /></a>

            </div>

            <div id="navbar" class="navbar-collapse collapse">

              <ul class="nav navbar-nav">

                <li class="active"><a href="#find">The Platform</a></li>
                <li class="active"><a href="#mission">Our Mission</a></li>
                <li class="active"><a href="#join-title">Take Action</a></li>

                <?php  if ( $_SESSION['logged_in'] === true ) { ?>
                  
                <li class="active logout"><a href="php/logout.php">Logout</a></li>

              <?php } else { ?> 

                <li class="active"><a data-toggle="modal" data-target="#login-modal">Login</a></li>
                <li class="active">
                  <a data-toggle="modal" data-target="#register-modal">
                    <button class="btn btn-primary">Join</button>
                  </a>
                </li>
  
              <?php } ?>

              </ul>

            </div>

          </div>

        </nav>

      </div>

    </div>

    <div class="container-fluid" id="intro">
      <div id="intro-text">
        <div class="col-md-12 text-center" style="z-index: 2;">
          <h1>Science.<br class="mobile" /> Solved simply<span class="dot">.</span></h1>

          <h3>Enter a universe of science and technology<br class="desktop" /> at your fingertips<span class="dot">.</span></h3>
          <!--
          <a data-toggle="modal" data-target="#register-modal"><button class="btn-lg btn-primary m-t-40">Register</button></a>
          <a class="login">Login</a>
          -->
        </div>

        <div class="col-md-12" id="circle0">
          <div class="linkedCircleHeader">
            <div class="linkedCircle"></div>
          </div>
          <svg width="100%" height="100%" viewBox="0 0 1440 218" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <title>Desktop HD</title>
            <desc>Created with Sketch.</desc>
            <defs></defs>
            <g id="" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <g id="Desktop-HD" stroke="#ffffff">
                <circle id="Oval" cx="720" cy="-1179" r="1387"></circle>
              </g>
            </g>
          </svg>
        </div>
      </div>

    </div>



    <div class="bottom-grad">


    </div>








  </header>

  <section id="find" class="banner-size">

    <div class="top-grad">

    </div>

    <div class="bottom-grad">
    </div>

    <div class="container m-t-80">

      <div class="row">
        <div class="col-xs-12 col-sm-5 col-md-4">
          <div class=" circle text-center" id="circle1">
            <div class="circleContent">
              <img src="images/telescope.png" />
              <h2 class="title">Find</h2>
              <p>
                Science and technology knowledge<br/> more easily and accurately<br/> than ever before.
              </p>
            </div>
            <img class="linkedCircle circleResizer" src="images/border_resizer.png">
          </div>
        </div>
        <!--
        <div class="circleExp circleExpRight col-xs-12 col-sm-5 linkedCircle">
        -->
        <!--
        <div id="para-1" class="paras col-xs-12 col-md-6 col-md-offset-1 col-sm-6 col-sm-offset-1">
          <p>
            With a flexible semantic database dedicated to organising and interconnecting all scientific and technological knowledge, The Brane restores context and structure to search results, allowing you to connect the dots between disparate subjects and find
            exactly what you need, simply, while avoiding exhausting trial and error searches.
          </p>
        </div>
        -->
      </div>

    </div>
    <!-- container -->

  </section>


  <section id="explore" class="banner-size">

    <div class="top-grad">

    </div>

    <div class="bottom-grad">
    </div>


    <div class="container">


      <div class="row">

        <div class="col-md-4 col-md-push-8 col-sm-5 col-sm-push-7 col-xs-12">
          <div class="circle text-center" id="circle2">
            <div class="circleContent">
              <img src="images/rocket.png" />
              <h2 class="title">Explore</h2>
              <p>
                The largest network of interrelated<br/> topics of scientific<br/> and technological inquiry.
              </p>
            </div>
            <img class="linkedCircle circleResizer" src="images/border_resizer.png">
          </div>
        </div>
        <!--
        <div class="circleExp circleExpLeft col-xs-12 col-sm-5 linkedCircle">
        -->
        <!--
        <div id="para-2" class="paras col-xs-12 col-sm-6 col-sm-pull-5 col-md-6 col-md-pull-4">
          <p>
            Feed your scientific curiosity by navigating the distant frontiers of science, mapping your path through vast constellations of open knowledge, discovering new and powerful technologies that stand to shape the world of tomorrow, and sharing your discoveries
            with your peers.
          </p>
        </div>
        -->
      </div>
      <!-- row -->

    </div>
    <!-- container -->

  </section>


  <section id="learn" class="banner-size">

    <div class="top-grad">

    </div>

    <div class="bottom-grad">
    </div>


    <div class="container">

      <div class="row">
        <div class="col-xs-12 col-sm-5 col-md-4">
          <div class="circle text-center" id="circle3">
            <div class="circleContent">
              <img src="images/astronaut.png" />
              <h2 class="title">Learn</h2>
              <p>
                More about science and technology<br/> in ways never before<br/> thought possible.
              </p>
            </div>
            <img class="linkedCircle circleResizer" src="images/border_resizer.png">
          </div>
        </div>
        <!--
        <div class="circleExp circleExpRight col-xs-12 col-sm-5 linkedCircle">
        -->
        <!--
        <div id="para-3" class="paras col-xs-12 col-md-6 col-md-offset-1 col-sm-6 col-sm-offset-1">
          <p>
            For the first time, graphs of interconnected topics searches allow you to understand the global blueprint of innovation, see the relationships between the concepts you know, and those that you have yet to discover, to engage with science experts on relevant
            topics, and to find the answers you need to move your research forward and push the boundaries of knowledge.
          </p>
        </div>
        -->
      </div>
      <!-- row -->

    </div>
    <!-- container -->

  </section>


  <section id="contribute" class="banner-size">
    <div class="top-grad">

    </div>

    <div class="bottom-grad">
    </div>


    <div class="container">

      <div class="row">

        <div class="col-md-4 col-md-push-8 col-sm-5 col-sm-push-7 col-xs-12">
          <div class="circle text-center" id="circle4">
            <div class="circleContent">
              <img src="images/hands.png" />
              <h2 class="title">Contribute</h2>
              <p>
                To a vast, iteratively self-improving<br/> open science network, and be<br/> recognised for your contributions.
              </p>
            </div>
            <img class="linkedCircle circleResizer" src="images/border_resizer.png">
          </div>
        </div>
        <!--
        <div class="circleExp circleExpLeft col-xs-12 col-sm-5 linkedCircle">
        -->
        <!--
        <div id="para-4" class="paras col-xs-12 col-sm-6 col-sm-pull-5 col-md-6 col-md-pull-4">
          <p>
            Join a community of empowered passionate enthusiasts and experts, both content creators and validators, contribute nodes, relationships, discussions and comments to the network, peer-review all content, earn points for high quality contributions, and
            validate your real-world expertise online.
          </p>
        </div>
        -->
      </div>
      <!-- row -->

    </div>
    <!-- container -->

  </section>


  <section id="about">

    <div class="container-fluid" id="circle5">
      <div class="row">
        <div class="col-12">
          <div class="linkedCircleFooter">
            <div class="linkedCircle"></div>
          </div>
          <svg width="100%" height="100%" viewBox="0 0 1366 271" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <!-- Generator: Sketch 40 (33762) - http://www.bohemiancoding.com/sketch -->
            <title>Section Border</title>
            <desc>Created with Sketch.</desc>
            <defs></defs> 
            <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" opacity="1.0">
              <g id="iPad-Pro-Landscape" stroke="#FFFFFF">
                <circle id="Section-Border" transform="translate(683.000000, 1000.000000) rotate(-360.000000) translate(-683.000000, -1000.000000) " cx="683" cy="1000" r="1000"></circle>
              </g>
            </g>
          </svg>
        </div>
      </div>
    </div>

    <div class="container-fluid" style="position:relative;" id="mission-banner">
      <div class="bottom-grad" style="z-index: 2"></div>
      <div class="row">

        <div class="col-md-12 text-center">

          <h1 class="m-t-40 white" style="color: white;" id="mission">The Future is Exciting</h1>
          <h2>Our aim</h2>
          <h2 class="m-b-40 m-t-0" style="line-height: 0.2em;">-</h2>
          <p class="about-content">
            To promote the application of the Scientific Method for the sustained improvement of Humankind.<br />
            To empower science and tech experts in their tireless investigation of the frontiers of knowledge.<br />
            To disrupt the way science and tech are browsed on the web.<br />
            To accelerate the global pace of innovation.
          </p>
          
        </div>
      </div>
      <div class="row">

        <div class="col-md-12 text-center m-t-40 m-b-40">
          <img id="jelly" src="images/about-banner2.jpg" />
        </div>
      </div>    
    </div>
    <div class="container" id="take-action">
      <div class="row m-t-200" id="join-brane">
        <div class="col-md-12 text-center">
          <h1 id="join-title" class="m-b-80">Join the Movement</h1>

        </div>
      </div>
      <div class="row">
        <!--<a href="http://eepurl.com/cdLG1H">-->
        <a data-toggle="modal" data-target="#investor-modal">
          <div class="col-sm-3 col-xs-12 modal-button text-center">
            <img src="images/rocket-white.png" />
            <p>Invest in the future</p>
          </div>
        </a>
        <!--<a href="http://eepurl.com/cdLJ5T">-->
        <a data-toggle="modal" data-target="#lead-modal">
          <div class="col-sm-3 col-xs-12 modal-button text-center">
            <img src="images/hat-white.png" />
            <p>Be a lead user</p>
          </div>
        </a>
        <a data-toggle="modal" data-target="#team-modal">
          <div class="col-sm-3 col-xs-12 modal-button text-center">
            <img src="images/astronauts-white.png" />
            <p>Be a part of the team</p>
          </div>
        </a>
        <!--<a href="http://eepurl.com/cdLMav">-->
        <a data-toggle="modal" data-target="#keep-modal">
          <div class="col-sm-3 col-xs-12 modal-button text-center">
            <img src="images/letter-white.png" />
            <p>Keep in touch</p>
          </div>
        </a>
      </div>
    </div>
  </section>

  <section id="footer">
    <div class="container">
      <div class="row">
        <div class="col-sm-12 text-center m-t-40">
          <img src="images/logowhite.png" style="width:240px" />
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-sm-12 text-center m-t-40">
          <ul class="social-profiles">

            <li><a href="https://twitter.com/@_thebrane"><i class="zmdi zmdi-twitter"></i></a></li>

            <li><a href="https://www.facebook.com/The-Brane-1676174555990280/"><i class="zmdi zmdi-facebook"></i></a></li>

            <li><a href="https://www.linkedin.com/company/the-brane"><i class="zmdi zmdi-linkedin"></i></a></li>
            <li><a target="_blank" href="http://angel.co/the-brane"><img style="margin-top: -5px" src="images/angellist.png"></a></li>
            
          </ul> 
        </div>
      </div>

      <div class="row">
        <div class="col-sm-12 text-center">
        <p style="font-size: 14px;" >&copy; The Brane Inc.</p>
        </div>
      </div>
    </div>
  </section>

</body>

<script>
/*
  window.sr = new ScrollReveal();
  sr.reveal('#para-1', { origin: 'right' });
  sr.reveal('#para-2', { origin: 'left' });
  sr.reveal('#para-3', { origin: 'right' });
  sr.reveal('#para-4', { origin: 'left' });
  */
</script>

<div class="modal brane-modal fade" tabindex="-1" role="dialog" id="login-modal">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      
      <div class="modal-body text-center">

        <form role="form" id="login-form">
          <div class="row">
            <div class="col-xs-12">
              <button href="#" class="nextBtn btn btn-lg btn-li btn-block"><i class="zmdi zmdi-linkedin"></i>Log in with Linkedin</button>
              <button href="#" class="nextBtn btn btn-lg btn-fb btn-block"><i class="zmdi zmdi-facebook"></i>Log in with Facebook</button>
              <button href="#" class="nextBtn btn btn-lg btn-go btn-block"><i class="zmdi zmdi-google"></i>Log in with Google</button>
            </div>   
            <div class="col-xs-12"> 
              <div class="or">
                <span>
                or <!--Padding is optional-->
                </span>
              </div>
              <h3 class="error"></h3>
              <div class="form-group">
                <input class="form-control" id="youremail" name="email" placeholder="Email Address" type="email" data-validationmessage="Please fill out email" id="email" required="required" />
              </div> 
              <div class="form-group">
                <input class="form-control" id="yourpassword" name="password" placeholder="Password" type="password" data-validationmessage="Please fill out password" required="required" />
              </div>  
              <div class="form-group space-between">
                <div class="checkbox">
                  <label><input type="checkbox" name="remember" value="">Remember Me</label>
                </div>
                <a data-toggle="modal" data-target="#forgot-modal">Forgot password?</a>
              </div>
              <button type="submit" href="#" class="btn btn-lg btn-em btn-block login">Login</button>
              <p class="agree">Don't have an account yet? <a data-toggle="modal" data-target="#register-modal">Register here.</a></p>
            </div><!-- end col -->
          </div><!-- end row -->

        </form>

      </div>
      <!-- /.modal-body -->
    </div>
    <!-- /.modal-content -->
  </div>
  <!-- /.modal-dialog -->
</div>

<div class="modal brane-modal fade" tabindex="-1" role="dialog" id="register-modal">
  <div class="modal-dialog" role="document">
    <div class="modal-content">

      <div class="modal-body text-center">

        <form role="form" id="register-form">
          <div class="row setup-content" id="step-1">
            <div class="col-xs-12">
                <h3 class="m-t-0">Join The Movement</h3>
                <p>Connect with Linkedin to have your expertise recognized.</p>
                <button href="#" class="m-b-0 nextBtn btn btn-lg btn-li btn-block"><i class="zmdi zmdi-linkedin"></i>Continue with Linkedin</button>
                <div class="or">
                  <span>
                  or 
                  </span>
                </div>
                <button href="#" class="nextBtn btn btn-lg btn-fb btn-block"><i class="zmdi zmdi-facebook"></i>Continue with Facebook</button>
                <button href="#" class="nextBtn btn btn-lg btn-go btn-block"><i class="zmdi zmdi-google"></i>Continue with Google</button>

                <button href="#" class="nextBtn btn btn-lg btn-em btn-block"><i class="zmdi zmdi-email"></i>Sign up with Email</button>
                <p class="agree">By registering, I agree with <a href="#">The Brane’s terms of agreement</a></p>
                <p class="agree">Already have an account? <a href="#"">Login here.</a></p>
            </div>
          </div>

          <div class="row setup-content" id="step-2">
            <h3 class="m-t-0 m-b-40">Join The Movement</h3>
            <h4></h4>
            <div class="form-group">
              <input class="form-control" name="firstname" placeholder="First Name" data-validationmessage="Please fill out first name" type="text" required="required"/>
              <span class="help-block"></span>
            </div>
            <div class="form-group">
              <input class="form-control" name="lastname" placeholder="Last Name" type="text" data-validationmessage="Please fill out last name" required="required"/>
              <span class="help-block"></span>
            </div>
            
            <div class="form-group">
              <input class="form-control" name="email" placeholder="Your Email" type="email" data-validationmessage="Please fill out valid email" required="required"/>
              <span class="help-block"></span>
            </div> 
            <div class="form-group">
              <input class="form-control" id="registerpassword" name="password" placeholder="Your Password" type="password" data-validationmessage="Please fill out password" required="required" />
              <span class="help-block"></span>
            </div>
            <div class="form-group">
              <input class="form-control" name="reenterpassword" placeholder="Retype Password" type="password" data-validationmatch="#registerpassword" 
              data-validationmessage="Must match password entered above" />
              <span class="help-block"></span>
            </div>
            <div class="form-group space-between">
              <div class="checkbox">
                <label><input type="checkbox" name="newsletter" value="1">Receive our awesome newsletter</label>
              </div>
            </div>

            <p class="agree m-b-5 text-left">By registering, I agree with <a href="#">The Brane’s terms of agreement</a></p>
            <button href="#" class="nextBtn btn btn-lg btn-em btn-block"><i class="zmdi zmdi-email"></i>Create Account</button>
            <p class="agree">Already have an account? <a href="#">Login here.</a></p>
          </div>

          <div class="row setup-content" id="step-3">
            <div class="col-xs-12">
              <h3 class="m-t-0 m-b-40">Activate your account</h3>
              <p class="text-left">Welcome <span class="registration_name"><?php echo $first_name ?> </span></p>
              <p class="agree m-b-40 text-left">Please click on the activation link we've sent to your email inbox at <a href="#"> <span class="registration_email"><?php echo $email ?> </span></a></p>
              <button disabled=true href="#" class="nextBtn btn btn-lg btn-em btn-block activateBtn">Continue</button>
              <p class="agree m-b-0"><a href="#">resend activation email</a></p>
            </div>
          </div>

          <div class="row setup-content" id="step-4">
            <div class="col-xs-12">
              <h3 class="m-t-0 m-b-40">Activate your account</h3>
              <div class="combo-box form-group">
                  <select id="select-group" name="groups">
                    <option value="" disabled selected hidden>What group best describes you?</option>
                    <option value="enthusiast">Science or Tech enthusiast</option>
                    <option value="student">STEM Student</option>
                    <option value="Scientist">Scientist</option>
                    <option value="entrepreneur">Practitioner (Applied Sciences)</option>
                    <option value="researcher">Researcher</option>
                    <option class="editable" value="">Other</option>
                  </select>
                  <input class="editOption" style="display:none;" placeholder="Other"></input>
              </div>
              <div class="form-group">
                  <input class="form-control" name="university" placeholder="What university are you from?" type="text"  />
              </div>
              <div class="form-group">
                  <input class="form-control" name="url" placeholder="Got an Academia.edu or Researchgate accout URL?" type="text" />
              </div>
              <div class="form-group">
                  <textarea class="form-control" name="bio" placeholder="Write a short bio(optional)"></textarea>
              </div>
              <button href="#" class="nextBtn btn btn-lg btn-em btn-block">Continue</button>
              <p class="agree m-b-0"><a class="skip-step" href="#">Skip this step</a></p>
            </div>
          </div>

          <div class="row setup-content" id="step-5">
            <h3 class="m-t-0 m-b-40">Fields of expertise</h3>
            <div class="fox-container">

              <div class="col-xs-6 fox-col available-fields">
                <div class="header">
                  <button href="#" class="btn backBtn btn-sm">
                    Back
                  </button>
                  <p>Available fields</p>
                </div>
                <div class="form-group m-b-0">
                  <i class="zmdi zmdi-search"></i>
                  <input class="form-control search-fields" id="search-fields" name="search" placeholder="Search" type="text" />
                </div>
                <div class="field-list">
                  <div class="parent-fields">
                    <ul>
                      
                    </ul>  
                  </div>

                  <div class="specific-fields">
 
                  </div>
                </div>  
              </div>

              <div class="col-xs-6 fox-col selected-fields">
                <div class="header">
                  <p>Selected fields</p>
                </div>
                <div class="selected-fields-list">

                </div>
              </div>

            </div>
            <button type="submit" href="#" class="nextBtn btn btn-lg btn-em btn-block m-t-25 final-btn">Continue</button>
              <p class="agree m-b-0"><a style="margin-right:50px" class="go-back">Go back</a><a class="skip-step" href="#">Skip this step</a></p>  
          </div>            
        </form>


      </div>
      <!-- /.modal-body -->
    </div>
    <!-- /.modal-content -->
  </div>
  <!-- /.modal-dialog -->
</div>
<!-- /.modal -->

<div class="modal brane-modal fade" tabindex="-1" role="dialog" id="forgot-modal">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      
      <div class="modal-body text-center">

        <form role="form">
          <div class="row">
            <div class="col-xs-12">
              <h3 class="m-t-0 m-b-40">Reset Password</h3>

              <div class="form-group">
                <input class="form-control" name="email" placeholder="Email Address" type="email" data-validationmessage="Please fill out email" required="required" />
              </div> 
              
              <button type="submit" class="btn btn-lg btn-em btn-block forgot">Reset</button>
              
            </div><!-- end col -->
          </div><!-- end row -->

        </form>

      </div>
      <!-- /.modal-body -->
    </div>
    <!-- /.modal-content -->
  </div>
  <!-- /.modal-dialog -->
</div>

<div class="modal brane-modal fade" tabindex="-1" role="dialog" id="reset-modal">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      
      <div class="modal-body text-center">

        <form role="form">
          <div class="row">
            <div class="col-xs-12"> 
              <h3 class="m-t-0 m-b-40">Choose A New Password</h3>

              <div class="form-group">
                <input class="form-control" name="new_password" placeholder="New Password" type="password" data-validationmessage="Please fill out password" id="newpassword" required="required" />
                <span class="help-block"></span>
              </div> 
              <div class="form-group">
                <input class="form-control" name="confirm_new_password" placeholder="Confirm New Password" 
                type="password" 
                data-validationmatch="#newpassword" 
                data-validationmessage="Must match password entered above" required="required" />
                <span class="help-block"></span>
              </div> 

              <input type="hidden" name="email" value="<?php echo $reset_email ?>">    
              <input type="hidden" name="hash" value="<?php echo $reset_hash ?>">  
              <button type="submit" href="#" class="btn btn-lg btn-em btn-block">Apply</button>
              
            </div><!-- end col -->
          </div><!-- end row -->

        </form>

      </div>
      <!-- /.modal-body -->
    </div>
    <!-- /.modal-content -->
  </div>
  <!-- /.modal-dialog -->
</div>

<div class="modal fade" tabindex="-1" role="dialog" id="join-modal">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header text-center">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h1 class="modal-title">Join the movement</h1>
        <p data-cloud9-id="170">The Brane is a global initiative committed to making Science more accessible<span class="dot">.</span><br class="desktop" /> Would you like to be a part of it?<br>
          <strong>Here's how!</strong></p>
      </div>

      <div class="modal-footer">
        <div class="row modal-links">
          <!--<a href="http://eepurl.com/cdLG1H">-->
          <a data-toggle="modal" data-target="#investor-modal">
            <div class="col-xs-3 modal-button text-center">
              <img src="images/rocket-black.png" />
              <p>Invest<br class="mobile" /> in the<br class="mobile" /> future</p>
            </div>
          </a>
          <!--<a href="http://eepurl.com/cdLJ5T">-->
          <a data-toggle="modal" data-target="#lead-modal">
            <div class="col-xs-3 modal-button text-center">
              <img src="images/hat-black.png" />
              <p>Be a<br class="mobile" /> lead user</p>
            </div>
          </a>
          <a data-toggle="modal" data-target="#team-modal">
            <div class="col-xs-3 modal-button text-center">
              <img src="images/astronauts-black.png" />
              <p>Be a<br class="mobile" /> part of<br class="mobile" /> the team</p>
            </div>
          </a>
          <!--<a href="http://eepurl.com/cdLMav">-->
          <a data-toggle="modal" data-target="#keep-modal">
            <div class="col-xs-3 modal-button text-center">
              <img src="images/letter-black.png" />
              <p>Keep<br class="mobile" /> in touch</p>
            </div>
          </a>
        </div>
      </div>
    </div>
    <!-- /.modal-content -->
  </div>
  <!-- /.modal-dialog -->
</div>
<!-- /.modal -->

<!-- Be a part of the team Modal -->
<div class="modal fade" tabindex="-1" role="dialog" id="team-modal">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header text-center">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h1 class="modal-title">Be a part of the team </h1>
        
      </div>

      <div class="modal-body text-center">
      <p>Looking to do meaningful work?</p> 
      <p>Think you&#39;ve got what it takes to bring our team to the next level?</p> 
      <p>Apply on our Angellist page and help us build the future.</p> 
      <a target="_blank" href="http://angel.co/the-brane/jobs"><button class="btn-trans-black m-t-40">Apply here</button></a>   
         
      </div>
      
    </div>
    <!-- /.modal-content -->
  </div>
  <!-- /.modal-dialog -->
</div>
<!-- /.modal -->

<!-- Be a lead user  Modal -->
<div class="modal fade" role="dialog" id="lead-modal">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header text-center">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h1 class="modal-title">Be a lead user </h1>
        <p data-cloud9-id="170">Do you have a graduate education in a STEM discipline? Join our lead user program and share your expertise with the world.</p>
      </div>

      <div id="lead-modal-body" class="modal-body">
        <!-- Begin MailChimp Signup Form -->
        <link href="//cdn-images.mailchimp.com/embedcode/classic-10_7.css" rel="stylesheet" type="text/css">
        <style type="text/css">
          #mc_embed_signup{background:#fff; clear:left; font:14px Helvetica,Arial,sans-serif; }
          /* Add your own MailChimp form style overrides in your site stylesheet or in this style block.
             We recommend moving this block and the preceding CSS link to the HEAD of your HTML file. */
        </style>
        <div id="mc_embed_signup">
        <form action="//thebrane.us14.list-manage.com/subscribe/post?u=10e49685d81146ba117b2a7f5&amp;id=0ac240c7a1" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>
          <div id="mc_embed_signup_scroll">
            <h2>Subscribe to our mailing list</h2>
            <div class="indicates-required"><span class="asterisk">*</span> indicates required</div>
            
            <div class="mc-field-group">
              <label for="mce-FNAME">First name  <span class="asterisk">*</span>
              </label>
              <input type="text" value="" name="FNAME" class="required" id="mce-FNAME">
            </div>
            <div class="mc-field-group">
              <label for="mce-MMERGE4">Last name  <span class="asterisk">*</span>
            </label>
              <input type="text" value="" name="MMERGE4" class="required" id="mce-MMERGE4">
            </div>
            <div class="mc-field-group">
              <label for="mce-EMAIL">Email Address  <span class="asterisk">*</span>
              </label>
              <input type="email" value="" name="EMAIL" class="required email" id="mce-EMAIL">
            </div>
            <div class="mc-field-group">
              <label for="mce-MMERGE3">Scientific fields of interest  <span class="asterisk">*</span>
              </label>
              <p>Comma separated entries, e.g., Physics, Biology, Chemistry</p>
              <p class="tags-field">
                <input type="text" value="" name="MMERGE3" id="mce-MMERGE3" class="autoCom" style="width: 100%">
              </p>
            </div>
            <div class="mc-field-group">
              <label for="mce-MMERGE5">LinkedIn, Researchgate or Academia.edu profile URL </label>
              <p>*Please send us a link to your portfolio or send a CV to the adress below</p>
              <input type="text" value="" name="MMERGE5" class="" id="mce-MMERGE5">
            </div>
            <div class="mc-field-group">
              <p>You can send your CV to:</p>
              <a href="mailto:contact@thebrane.com">contact@thebrane.com</a>
            </div>
              <div id="mce-responses" class="clear">
                <div class="response" id="mce-error-response" style="display:none"></div>
                <div class="response" id="mce-success-response" style="display:none"></div>
              </div>    <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
              <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_10e49685d81146ba117b2a7f5_0ac240c7a1" tabindex="-1" value=""></div>
              <div class="clear"><input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" class="button"></div>
          </div>
        </form>
        </div>
        <script type='text/javascript' src='//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js'></script><script type='text/javascript'>(function($) {window.fnames = new Array(); window.ftypes = new Array();fnames[0]='EMAIL';ftypes[0]='email';fnames[1]='FNAME';ftypes[1]='text';fnames[4]='MMERGE4';ftypes[4]='text';fnames[3]='MMERGE3';ftypes[3]='text';fnames[5]='MMERGE5';ftypes[5]='text';}(jQuery));var $mcj = jQuery.noConflict(true);</script>
        <!--End mc_embed_signup-->

      </div>
      
    </div>
    <!-- /.modal-content -->
  </div>
  <!-- /.modal-dialog -->
</div>
<!-- /.modal -->

<!-- Keep in touch Modal -->
<div class="modal fade" tabindex="-1" role="dialog" id="keep-modal">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header text-center">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h1 class="modal-title">Keep in touch</h1>
        <p data-cloud9-id="170">You share our vision and wish to stay updated about our progress? Subscribe to our mailing list and you won&#39;t miss a thing.</p>
      </div>

      <div class="modal-body">
        <!-- Begin MailChimp Signup Form -->
        <link href="//cdn-images.mailchimp.com/embedcode/classic-10_7.css" rel="stylesheet" type="text/css">
        <style type="text/css">
          #mc_embed_signup{background:#fff; clear:left; font:14px Helvetica,Arial,sans-serif; }
          /* Add your own MailChimp form style overrides in your site stylesheet or in this style block.
             We recommend moving this block and the preceding CSS link to the HEAD of your HTML file. */
        </style>
        <div id="mc_embed_signup">
        <form action="//thebrane.us14.list-manage.com/subscribe/post?u=10e49685d81146ba117b2a7f5&amp;id=46e7ff10bf" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>
          <div id="mc_embed_signup_scroll">
          <h2>Subscribe to our mailing list</h2>
          <div class="indicates-required"><span class="asterisk">*</span> indicates required</div>
          
          <div class="mc-field-group">
            <label for="mce-FNAME">First Name  <span class="asterisk">*</span>
          </label>
            <input type="text" value="" name="FNAME" class="required" id="mce-FNAME">
          </div>
          <div class="mc-field-group">
            <label for="mce-LNAME">Last Name </label>
            <input type="text" value="" name="LNAME" class="" id="mce-LNAME">
          </div>
          <div class="mc-field-group">
            <label for="mce-EMAIL">Email Address  <span class="asterisk">*</span>
            </label>
          <input type="email" value="" name="EMAIL" class="required email" id="mce-EMAIL">
          </div>
          <div class="mc-field-group">
            <p>Contact us</p>
            <a href="mailto:contact@thebrane.com">contact@thebrane.com</a>
          </div>
          <div id="mce-responses" class="clear">
            <div class="response" id="mce-error-response" style="display:none"></div>
            <div class="response" id="mce-success-response" style="display:none"></div>
          </div>    <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
          <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_10e49685d81146ba117b2a7f5_46e7ff10bf" tabindex="-1" value=""></div>
          <div class="clear"><input type="submit" value="Follow us" name="subscribe" id="mc-embedded-subscribe" class="button"></div>
          </div>
        </form>
        </div>
        <script type='text/javascript' src='//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js'></script><script type='text/javascript'>(function($) {window.fnames = new Array(); window.ftypes = new Array();fnames[0]='EMAIL';ftypes[0]='email';fnames[1]='FNAME';ftypes[1]='text';fnames[2]='LNAME';ftypes[2]='text';}(jQuery));var $mcj = jQuery.noConflict(true);</script>
        <!--End mc_embed_signup-->

      </div>
      
    </div>
    <!-- /.modal-content -->
  </div>
  <!-- /.modal-dialog -->
</div>
<!-- /.modal -->

<!-- Investors Modal -->
<div class="modal fade" tabindex="-1" role="dialog" id="investor-modal">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header text-center">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h1 class="modal-title">Invest in the future</h1>
        <p data-cloud9-id="170">Join the ranks of the first visionaries to invest in this groundbreaking platform. </p>
      </div>

      <div class="modal-body">
        <!-- Begin MailChimp Signup Form -->
        <link href="//cdn-images.mailchimp.com/embedcode/classic-10_7.css" rel="stylesheet" type="text/css">
        <style type="text/css">
          #mc_embed_signup{background:#fff; clear:left; font:14px Helvetica,Arial,sans-serif; }
          /* Add your own MailChimp form style overrides in your site stylesheet or in this style block.
             We recommend moving this block and the preceding CSS link to the HEAD of your HTML file. */
        </style>
        <div id="mc_embed_signup">
        <form action="//thebrane.us14.list-manage.com/subscribe/post?u=10e49685d81146ba117b2a7f5&amp;id=6bcb481ba3" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>
          <div id="mc_embed_signup_scroll">
            <div class="indicates-required"><span class="asterisk">*</span> indicates required</div>
            
            <div class="mc-field-group">
              <label for="mce-FNAME">First Name </label>
              <input type="text" value="" name="FNAME" class="" id="mce-FNAME">
            </div>
            <div class="mc-field-group">
              <label for="mce-LNAME">Last Name </label>
              <input type="text" value="" name="LNAME" class="" id="mce-LNAME">
            </div>
            <div class="mc-field-group">
              <label for="mce-EMAIL">Email Address  <span class="asterisk">*</span>
            </label>
              <input type="email" value="" name="EMAIL" class="required email" id="mce-EMAIL">
            </div>
            <div class="mc-field-group size1of2">
              <label for="mce-MMERGE3">Phone number </label>
              <input type="number" name="MMERGE3" class="" value="" id="mce-MMERGE3">
            </div>
            <div class="mc-field-group">
              <p>Contact us</p>
              <a href="mailto:contact@thebrane.com">contact@thebrane.com</a>
            </div>
              <div id="mce-responses" class="clear">
                <div class="response" id="mce-error-response" style="display:none"></div>
                <div class="response" id="mce-success-response" style="display:none"></div>
              </div>    <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
              <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_10e49685d81146ba117b2a7f5_6bcb481ba3" tabindex="-1" value=""></div>
            <div class="clear"><input type="submit" value="Send" name="subscribe" id="mc-embedded-subscribe" class="button"></div>
          </div>
        </form>
        </div>
        <script type='text/javascript' src='//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js'></script><script type='text/javascript'>(function($) {window.fnames = new Array(); window.ftypes = new Array();fnames[0]='EMAIL';ftypes[0]='email';fnames[1]='FNAME';ftypes[1]='text';fnames[2]='LNAME';ftypes[2]='text';fnames[3]='MMERGE3';ftypes[3]='number';}(jQuery));var $mcj = jQuery.noConflict(true);</script>
        <!--End mc_embed_signup-->
      </div>
      
    </div>
    <!-- /.modal-content -->
  </div>
  <!-- /.modal-dialog -->
</div>
<!-- /.modal -->

<script>


/*
$(window).load(function(){
  
  $.getJSON('fields.json', function(opts){
    $("#mce-MMERGE3").select2({
      data: opts,
      
    });
  })
})
*/
</script>
</html>
