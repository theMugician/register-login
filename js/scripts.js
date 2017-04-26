//$(document).ready(function() {
	function scrll(selector, speed) {

		selector.click(function(e) {

			e.preventDefault();

			var section = $(this).attr("href");

			if (typeof section !== 'undefined') {

				$("html, body").animate({

					scrollTop: $(section).offset().top - 80

				}, speed);
			}
		});

	};

	scrll($(".navbar").find("a"), 2000);

	scrll($("#intro-text").find("a"), 1000);

	scrll($("#foot").find("a"), 2000);

	function test(){
		console.log("Testing func Works!!!");
	}

	$('.nav a').on('click', function() {

		if ($('.navbar-toggle').css('display') != 'none') {

			$(".navbar-toggle").trigger("click");

		}

	});

	var Login = (function(){

		var submit, error;

		function cacheDOM() {
			form = $("#login-form");
			error = $("#login-form .error");
		}

		function bindEvents() {
			form.submit(function(e){
				e.preventDefault();
				login();
			});
		}

		function init() {
			cacheDOM();
			bindEvents();
		}
			
		function registrationError(message) {
			error.text("");
			error.text(message);
		}

		function login() {
			var formdata = $("#login-form").serialize();
			$.ajax({
	      type:"post",
	      url:"php/login.php",
	      data: formdata,
	      success:function(result){
	      	if (result === "!exist") {
	      		registrationError("User with this email doesn't exist!");
	      	} else if (result === "!password") {
	      		registrationError("You have entered the wrong password, Please try again!");
	      	} else if ("login_success") {
	      		window.location = 'index.php';
	      		console.log("Logged In");
	      	} else {
	      		console.log(result);
	      	}
	      }
	    })
		}

		return {
			init: init
		}
	})()


	var Forgot = (function(){

		var submit;

		function cacheDOM() {
			submit = $(".forgot");
			content = $("#forgot-modal .col-xs-12");
			form = $("#forgot-modal form");
		}

		function bindEvents() {
			//submit.click(reset);
			form.submit(function(e){
				e.preventDefault();
				reset();
			})
		}

		function init() {
			console.log("Forgot init");
			cacheDOM();
			bindEvents();
		}

		function reset() {
			var formdata = form.serialize();
			$.ajax({
	      type:"post",
	      url:"php/forgot.php",
	      data: formdata,
	      success:function(result){
	      	if (result === "!exist") {
	      		registrationError("User with this email doesn't exist!");
	      	} else {
	      		var message = "<p>Please check your email <a href=''><span class='registration_email'>" + result + "</span></a> for a confirmation link to complete your password reset!<p>";
            content.html(message);
	      		console.log("Reset Sent");
	      	}
	      }
	    })
		}

		return {
			init: init
		}
	})()

	var Reset = (function(){

		var form, content;

		function cacheDOM() {
			form = $("#reset-modal form");
			content = $("#reset-modal .col-xs-12");
		}

		function bindEvents() {
			form.submit(function(e){
				e.preventDefault();
				if(Validation(form)) {
					reset();
				} else {
					console.log("Not Valid");
				}
			});
		}

		function init() {
			cacheDOM();
			bindEvents();
		}

		function reset() {
			var formdata = $("#reset-modal form").serialize();
			$.ajax({
	      type:"post",
	      url:"php/reset_password.php",
	      data: formdata,
	      success:function(result){
	      	if (result === "!exist") {
	      		registrationError("User with this email doesn't exist!");
	      	} else if (result === "reset_success") {
	      		var message  = "<h3 class='m-t-0 m-b-40'>Your password has been reset successfully!</h3>";
	      				
            content.html(message);
	      		console.log("Reset Sent");
	      	} else {
	      		console.log("Reset Error");
	      	}
	      }
	    })
		}

		return {
			init: init
		}
	})()


	//------------------------------------------
	// REGISTRATION - FORM
	//------------------------------------------



	function Validation(form) {
		var $form = form;
		var inputs = form.find("input[type='text'],input[type='email'],input[type='password'],select,textarea");
		var $inputs = $(inputs);
		var $formgroup = $form.find(".form-group");
		var isValid = true;

		$formgroup.removeClass("has-error");

		function errorMessage(input) {
			var input = $(input);
			var valMessage = input.attr("data-validationmessage");
			input.closest(".form-group").addClass("has-error");
			input.siblings(".help-block").text(valMessage);	
		}

		//Loop through each input and check for validity
		for(var i=0; i<$inputs.length; i++){
			$inputs.eq(i).siblings(".help-block").text("");
			if (!$inputs[i].validity.valid){
				errorMessage($inputs[i]);
				isValid = false;
			}
			
			if ($inputs.eq(i).attr("data-validationmatch")) {
				otherInput = inputs.eq(i).attr("data-validationmatch");
				$otherInput = $(otherInput);
				$otherValue = $otherInput.val();
				if ($inputs.eq(i).val() !== $otherValue) {
					errorMessage($inputs[i]);
					isValid = false;
				}
			}

		}
		return isValid;

	}

	$(document).ready(function(){

		$('.modal').on('shown.bs.modal', function () {
		  var thismodal = $(this).attr('id'); 
		  $('.modal:not(#' + thismodal + ')').modal('hide');
		})

		$('#login-modal').on('shown.bs.modal', function () {
			Login.init();
		})

		$('#forgot-modal').on('shown.bs.modal', function () {
			console.log("Forgot initiated");
			Forgot.init();
		})
	})

	var registration = (function(){

		var allWells,
				allNextBtn = $('.nextBtn'),
				allSkipStep = $('.skip-step'),
				goBack = $('.go-back'),
				step = 0;

		function cacheDOM(start) {
			allWells = $('.setup-content');
			allNextBtn = $('.nextBtn');
			allSkipStep = $('.skip-step');
			goBack = $('.go-back');
			step = start;
		}

		function bindEvents() {
			allNextBtn.click(next);
			allSkipStep.click(skip);
			goBack.click(back);
		}

		//allWells.hide();

		function activate() {
			$(".activateBtn").prop('disabled', false);
		}

		function nextStep() {
			allWells.hide();
			allWells.eq(step).show();
		}

		function errorMessage(input) {
			$(input).closest(".form-group").addClass("has-error");
			valMessage = $(input).attr("data-validationmessage");
			$(input).siblings(".help-block").text(valMessage);	
		}

		function registrationError(message) {
			var container = $("#step-2 > h4");
			container.text(message);
		}

		function registerUser() {
			var formdata = $("#register-form").serialize();
			$.ajax({
	      type:"post",
	      url:"php/register.php",
	      data: formdata,
	      success:function(result){
	      	if (result === "email_exists") {
	      		registrationError("User with this email already exists!");
	      	} else if (result === "registration_failed") {
	      		registrationError("Registration Failed!");
	      	} else {
	      		json = JSON.parse(result);
	      		$(".registration_name").text(json.first_name);
	      		$(".registration_email").text(json.email);
	      		step++;
	      		nextStep(step);
	      	}
	      }
	    });
		}

		function back(){
			step--;
			nextStep(step);
				
		};

		function skip(){
			step++;
			if(step === 5){
				step = 0;
			   $('.modal').modal('hide');  
			}
			nextStep(step);
				
		};

		function next(){
			event.preventDefault();
			var curStep = $(this).closest(".setup-content"),
				curInputs = curStep.find("input[type='text'],input[type='email'],input[type='password'],select,textarea"),
				isValid = true;

			$(".form-group").removeClass("has-error");
			for(var i=0; i<curInputs.length; i++){
				$(curInputs[i]).siblings(".help-block").text("");
				if (!curInputs[i].validity.valid){
					errorMessage(curInputs[i]);
					isValid = false;
				}
				
				if (curInputs.eq(i).attr("data-validationmatch")) {
		
					otherInput = curInputs.eq(i).attr("data-validationmatch");
					$otherInput = $(otherInput);
					$otherValue = $otherInput.val();
					if ($(curInputs[i]).val() !== $otherValue) {
						errorMessage(curInputs[i]);
						isValid = false;
					}
				}
			}

			if(step === 1 && isValid) {
				registerUser();
			} else {
				if (isValid) {
					step++;
					if(step === 4) {
						FinalStep.init();
					}
					if(step === 5) {
						step = 0;
					   $('.modal').modal('hide');  
					}
					nextStep(step);
				}
			}			
		};

		//allWells.eq(0).show();

		$('.modal').on('hidden.bs.modal', function(){
			$(this).find('form')[0].reset();
		});

	  function _init(start) {
	    if ( start === undefined ) {
	    	step = 0;
	    } else {
	    	step = start;
	    }
	    cacheDOM(start);
	    bindEvents();
	  	nextStep();
	  }

	  return {
      init: function(start) {
      	_init(start)
      },
      activate: function() {
      	activate()
      }
    }

	})()

	//------------------------------------------
	// CUSTOM SELECT OPTION
	//------------------------------------------
$(document).ready(function(){
	var initialText = $('.editable').val();
	$('.editOption').val(initialText);

	$('#select-group').change(function(){
	var selected = $('option:selected', this).attr('class');
	var optionText = $('.editable').text();

	if(selected == "editable"){
	  $('.editOption').show();
	  
	  $('.editOption').keyup(function(){
		  var editText = $('.editOption').val();
		  $('.editable').val(editText);
		  $('.editable').html(editText);
	  });

	}else{
	  $('.editOption').hide();
	}
	});

	$('#select-group').select2({
	  tags: true,
	minimumResultsForSearch: Infinity
	});
})
	
	//------------------------------------------
	// POPULATE FIELDS IN STEP-5 OF REGISTRATION
	//------------------------------------------

	var FinalStep = (function(){
		
		//------------------------------------------
		// GLOBAL 
		//------------------------------------------		

		var fieldList,
				backBtn,
				fieldCategory,
				search,
				finalSubmit,
				parentFieldslist,
				selectedFieldsList,
    		specificFieldsList;

		function cacheDOM() {
  		parentFieldsList = $(".parent-fields ul");
			selectedFieldsList = $(".selected-fields-list");
    	specificFieldsList = $(".specific-fields");
  		fieldList = $(".field-list");
			backBtn = $(".backBtn");
			fieldCategory = $(".available-fields .header p");
			search = $("#search-fields");
			finalSubmit = $(".final-btn");
  	}

  	function bindEvents() {
			backBtn.click(slideBack);
			finalSubmit.click(function(e){
				e.preventDefault();
				_userDetails();
			});
		}

		function slideBack() {
			fieldCategory.text("Available Fields");
			fieldList.removeClass("slide");
			specificFieldsList.html("");
		}
		/*
		search.keyup(function(e) {
			e.stopImmediatePropagation();
	    if(e.keyCode === 13) {
	    	var value = $(this).val();
	    	$.ajax({
          type:"post",
          url:"search-fields.php",
          data:"value=" + value,
          success:function(data){
              $("#result").html(data);
              $("#search").val("");
           }
        });
	    }
    });
		*/
    function _init() {
    	cacheDOM();
    	bindEvents();
      _parentFields.init();
    }

    function _userDetails() {
			var formdata = $("#register-form").serialize();
			$.ajax({
	      type:"post",
	      url:"php/user_details.php",
	      data: formdata,
	      success:function(result){
	      	if (result === "account_updated") {
	      		console.log("account updated")
	      	} else if (result === "error") {
	      		console.log("Update Failed!");
	      	}
	      }
	    });
		}

    function _getCategories(id, callback) {
      if( id === undefined) {
      	id = "";
      }
      $.get("https://api.thebrane.com/v1/categories/" + id, function(data) {
      }, "json")
      .done(function (data) {
      	if (callback) {
				  callback(data);
				}
      })
      .fail(function () {
      });
    }

    function _fieldClickHandler (parent, field) {
    	var selectedField = field.closest("label").text();
			if(field.is(":checked")) {
				_selectedFields.array.push({"parent": parent, "title": selectedField });
				_selectedFields.init();
			} else {
				var index = _selectedFields.array.findIndex(function (item) {
				  return item.title === selectedField;
				});
				_selectedFields.array.splice(index, 1);
				_selectedFields.init();
				_specificFields.render();
			}
		}

		function _checkedBox (category) {
			if(_selectedFields.array.findIndex(function (item) {
          return item.title === category;
				}) > -1 ) {
				console.log("true");
				return true;
			} else {
				console.log("false");
				return false;
			}
		}

	  //------------------------------------------
		// SPECIFIC FIELDS
		//------------------------------------------							

    var _specificFields = {
    	array: [],
    	parentid: "",
    	parent: "",
      updateTitle: function(parent) {
      	fieldCategory.html(parent);
      },
      updateArray: function(data) {
      	_specificFields.array = data;
				_specificFields.render();
			},
      render: function() {
    		specificFieldsList.html("");
      	$.each(_specificFields.array.categories, function(key, category){
    			_specificFields.parentid = _specificFields.array.parents[0].id;
    			_specificFields.parent = _specificFields.array.parents[0].title;
	        var categoryStr = "";
							categoryStr += "  <div class=\"form-group space-between\">";
							categoryStr += "    <div class=\"checkbox\">";
							categoryStr += "      <label><input type=\"checkbox\" value=\"\">" + category.title + "<\/label>";
							categoryStr += "    <\/div>";
							categoryStr += "  <\/div>";

					var field = $(categoryStr);
					specificFieldsList.append(field);
					field = field.find("input");
					field.prop('checked', 
						_checkedBox(category.title, _specificFields.parent)
					);
					field.click(function(){
						_fieldClickHandler(_specificFields.parent, field);
					});
				})
      },
      init: function(id, parent){
      	_getCategories(id, this.updateArray);
        this.updateTitle(parent);
        fieldList.addClass('slide');
      }
    }

    //------------------------------------------
		// PARENT FIELDS
		//------------------------------------------

    var _parentFields = {
      render: function(data) {
      	parentFieldsList.html("");
      	$.each(data.categories, function(key, category){
	        var categoryStr =  "";
	            categoryStr += "<li>";
	            categoryStr += "<a><span>" + category.title + "<\/span><span>&gt;<\/span><\/a>";
	            categoryStr += "<\/li>";

					var field = $(categoryStr);
					console.log(_parentFields.list);
					parentFieldsList.append(field);
					field.click(function(){
						_specificFields.init(category.id, category.title);
					})
      	})
      },
      init: function(){
      	_getCategories("", this.render);
      	fieldList.removeClass('slide');
      }
    }

    //------------------------------------------
		// SELECTED FIELDS
		//------------------------------------------

    var _selectedFields = {
    	array: [],
    	render: function(data) {

    		selectedFieldsList.html("");

				var groups = {};
				_selectedFields.array.forEach(function (item) {
					if (!groups.hasOwnProperty(item.parent)) {
						groups[item.parent] = [];
					}
					groups[item.parent].push(item.title);
				});
				
				$.each(groups, function(key, group){ 
					var parentField = key;
					var parentDiv = "<div class='parent-title'>" + parentField + "</div>";
					selectedFieldsList.append(parentDiv);
					$.each(group, function(key, category) {
						
						var categoryStr="";
							categoryStr += "  <div class=\"form-group space-between\">";
							categoryStr += "    <div class=\"checkbox\">";
							categoryStr += "      <label><input type=\"checkbox\" name=\"selected_fields[]\" checked=\"checked\" value=\"" + category + "\">" + category + "<\/label>";
							categoryStr += "    <\/div>";
							categoryStr += "  <\/div>";

						var field = $(categoryStr);
						selectedFieldsList.append(field);
						field = field.find("input");
						field.click(function(){
							_fieldClickHandler(parent, field)
						});
					})
				})
      },
      init: function(id, parent){
      	this.render();
      }      
    }

    return {
      init: _init
    }
  })();

	
	//------------------------------------------
	// NODES
	//------------------------------------------

	function lineDistance(x, y, x0, y0) {
		return Math.sqrt((x -= x0) * x + (y -= y0) * y);
	};

	function drawLine(ptName, lnName, lnFill) {
		var ptGroup = $("." + ptName)
		ptGroup.each(function(i) {
			if (i <= ptGroup.length - 2) {
				var a = ptGroup[i];
				var b = ptGroup[i + 1];
				if ($("#" + lnName + '' + i).length == 0) {
					var line = $("<div id='" + lnName + "" + i + "' class='" + lnName + "'><div class='" + lnFill + "'></div></div>");
					$("body").prepend(line);
				}
				else {
					var line = $("#" + lnName + '' + i);
				}
				var pointA = $(a).offset();
				var pointB = $(b).offset();
				var pointAcenterX = $(a).outerWidth() / 2;
				var pointAcenterY = $(a).outerHeight() / 2;
				var pointBcenterX = $(b).outerWidth() / 2;
				var pointBcenterY = $(b).outerHeight() / 2;
				var pointAx = pointA.left + pointAcenterX;
				var pointAy = pointA.top + pointAcenterY;
				var pointBx = pointB.left + pointBcenterX;
				var pointBy = pointB.top + pointBcenterY;
				var angle = Math.atan2(pointBy - pointAy, pointBx -
					pointAx) * 180 / Math.PI;
				var distance = lineDistance(pointAx, pointAy, pointBx,
					pointBy);

				if ($(a).hasClass("circleExp")) {
					
					var prev = ptGroup[i-1];
					var next = ptGroup[i+1];
					var endY = $(next).offset().top
					var startY  = $(prev).offset().top+$(prev).outerHeight()
					var middleY = ((endY-startY)/2)+$(prev).outerHeight()-($(this).outerHeight()/2);

					$(a).css({
						top: middleY
					});
				}

				// Set Angle
				$(line).css('transform', 'rotate(' + angle + 'deg)');
				
				// Set Width
				$(line).css('width', distance + 'px');
				
				if ($(a).hasClass("circleExp")) {
					var pdLeft = pointAcenterY+50
				} else {
					var pdLeft = pointAcenterY
				}
				if ($(b).hasClass("circleExp")) {
					var pdRight = pointBcenterY+50
				} else {
					var pdRight = pointBcenterY
				}
				
				// Set hidden part
				$(line).css({
					paddingLeft: pdLeft,
					paddingRight: pdRight
				});
				
				// Set Position
				$(line).css('position', 'absolute');
				if (pointB.left < pointA.left) {
					$(line).offset({
						top: pointA.top + pointAcenterY,
						left: pointB.left + pointBcenterX
					});
				}
				else {
					$(line).offset({
						top: pointA.top + pointAcenterY,
						left: pointA.left + pointAcenterX
					});
				}
			}
		});
	}
	var resizeTimer; // Set resizeTimer to empty so it resets on page load
	function resizeFunction() {
		drawLine("linkedCircle", "circleLink", "circleLinkInner")
	};
	// On resize, run the function and reset the timeout
	// 250 is the delay in milliseconds. Change as you see fit.
	$(window).resize(function() {
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(resizeFunction, 100);
	}).resize();
	
   $(window).on("load", function(){
	   $(window).resize()
	});
	

	var apiFields = new Bloodhound({
		console: console.log('bloodhound is initiated'),
		datumTokenizer: Bloodhound.tokenizers.whitespace,
		queryTokenizer: Bloodhound.tokenizers.whitespace,
		prefetch: 'fields.json', 
		sorter: function(a, b) { 

			//get input text
			//var InputString = $('#mce-MMERGE3').val();
			var InputString = document.getElementsByClassName("autoCom")[1].value;

			console.log("InputString: " + InputString);
			//move exact matches to top
			if(InputString==a){ return -1;}
			if(InputString==b){return 1;}
				  
			//close match without case matching
			//console.log('a: ' + a);
			//console.log('b: ' + b); 
			if(InputString.toLowerCase() == a.toLowerCase()){ return -1;}
			if(InputString.toLowerCase() == b.toLowerCase()){return 1;} 

			if( (InputString!=a) && (InputString!=b)){
				return a < b ? -1 : a > b ? 1 : 0;
			}
		}
	
	});
	var listSug = ["abstract algebra","academic medicine","acanthochronology","accelerator physics","acoustical engineering","acoustical oceanography","acoustics","acousto-electronics","acousto-optics","actinide chemistry","actinobiology","actinology","actuarial science","addiction medicine","adductomics","advanced metrics","aerial photography","aeroacoustics","aerobiological engineering","aerodynamics","aeromechanics","aeronautics","aeronomy","aeroponics","aerospace","aerospace engineering","aerospace physiology","aerostatics","aesthetic medicine","affective haptics","agricultural chemistry","agricultural science","agricultural soil science","agriculture","agrobiology","agroecology","agrogeology","agrology","agrometeorology","agronomy","agrophysics","air traffic management","aircraft flight mechanics","algaculture","algebra","algebraic geometry","algebraic logic","algorithm engineering","alkane stereochemistry","analytic geometry","analytical chemistry","analytical dynamics","analytical mechanics","anaplastology","anatomical pathology","andrology","angiology","animal geography","animal science","animal tooth development","animal-free agriculture","animatronics","anthracology","anthrobotics","antibody engineering","antimicrobial pharmacodynamics","aphasiology","applicable mathematics","applied ecology","applied engineering","applied mathematics","applied mechanics","applied physics","aquaculture","aquaculture engineering","aquatic science","aquatic toxicology","aqueous geochemistry","archaeoastronomy","architectural acoustics","architectural engineering","arctic ecology","artificial intelligence (discipline)","artificial life","asteroid-impact avoidance","asteroseismology","astrobiology","astrobiophysics","astrochemistry","astrodynamics","astroecology","astroengineering","astroinformatics","astrometry","astronautical hygiene","astronautics","astronomical chronology","astronomy","astrooceanography","astroparticle physics","astrophotography","astrophysics","astrostatistics","asymptotology","atmospheric chemistry","atmospheric optics","atmospheric physics","atmospheric science","atmospheric sciences","atmospheric thermodynamics","atom optics","atomic and molecular astrophysics","atomic physics","atomic, molecular, and optical physics","atomtronics","attophysics","audio electronics","audio engineering","audio forensics","audiology","audioprosthology","automata theory","automation","automation engineering","automotive aerodynamics","automotive electronics","automotive engineering","autonomous logistics","autopharmacology","auxology","aviation","aviation medicine","avionics","bacterial genetics","bacteriology","ballistics","bathymetry","bayes linear statistics","bayesian statistics","behavior-based robotics","behavioral endocrinology","behavioral neurology","bicycle and motorcycle dynamics","bicycle transportation planning and engineering","binary arithmetic","bio-geoengineering","bioacoustics","bioastronautics","biochemical engineering","biochemistry","bioclimatology","biocybernetics","biodegradable waste management","bioelectrochemistry","bioelectrodynamics","bioelectromagnetics","bioelectronics","bioenergetics","biogeochemistry","biogeography","biogeology","biogeomorphology","biogeophysics","biogerontology","bioimage informatics","bioinformatics","bioinorganic chemistry","biological engineering","biological interface engineering","biological oceanography","biological psychiatry","biological systems engineering","biological thermodynamics","biologically inspired engineering","biology","biomechanics","biomechatronics","biomedical cybernetics","biomedical engineering","biomedicine","biometeorology","biomics","biomimetics","biomolecular engineering","biomorphic robotics","bionics","bioorganic chemistry","bioorganometallic chemistry","biopharmacology","biophotonics","biophysical chemistry","biophysics","bioprocess engineering","bioproducts engineering","bioresource engineering","biorheology","biorobotics","biospeleology","biostatistics","biosystems engineering","biotechnology","birational geometry","black hole thermodynamics","blobotics","bone pathology","boolean algebra","braid statistics","broadcast engineering","brownian dynamics","building biology","building engineering physics","building management system","building-integrated agriculture","calculus","calorimetry","cancer genomics","carbochemistry","carbohydrate chemistry","cardiac physiology","cardiogeriatrics","cardiology","cardiophysics","cardiovascular physiology","cartography","catchment hydrology","categorical quantum mechanics","catoptrics","cavity optomechanics","cavity quantum electrodynamics","celestial mechanics","cell biology","cell biophysics","cell mechanics","cellular microbiology","ceramic chemistry","ceramic engineering","cetology","channelomics","chaos theory","chemical biology","chemical ecology","chemical engineering","chemical kinetics","chemical oceanography","chemical physics","chemical reaction engineering","chemical thermodynamics","cheminformatics","chemistry","chemogenetics","chemogenomics","chemometrics","chemotronics","chirotechnology","chordate genomics","chronobiology","circuit quantum electrodynamics","civil engineering","civionics","classical mechanics","classical pharmacology","classical physics","claytronics","climate engineering","climatology","clinical pharmacology","clinical biophysics","clinical chemistry","clinical electrophysiology","clinical engineering","clinical neurochemistry","clinical neurophysiology","clinical pathology","clinical pharmacy","clinical virology","clinomics","cloud robotics","coastal biogeomorphology","coastal engineering","coastal geography","colloidal chemistry","combative anatomy","combinatorial biology","combinatorial chemistry","combinatorics and physics","communication design","communication studies","community genetics","comparative endocrinology","comparative genomics","comparative medicine","comparative planetary science","complex dynamics","complex systems","complex systems biology","computational aeroacoustics","computational biology","computational chemistry","computational cybernetics","computational engineering","computational epidemiology","computational epigenetics","computational fluid dynamics","computational genomics","computational geophysics","computational immunology","computational informatics","computational intelligence","computational logic","computational mathematics","computational mechanics","computational neuroscience","computational particle physics","computational physics","computational science","computational statistics","computational transportation science","computer architecture","computer engineering","computer forensics","computer programming","computer science","computer security","computer vision","computer-aided ergonomics","computer-generated imagery","computing","condensed matter physics","configurational mechanics","coniology","connectomics","conservation biology","conservation genetics","conservation medicine","contact dynamics","contact mechanics","continuum mechanics","control engineering","control theory","corporate governance of information technology","corrosion engineering","cosmochemistry","cosmology","cost engineering","critical cartography","critical state soil mechanics","cryobiology","cryochemistry","cryogenic engineering","cryogenics","cryonics","cryptoregiochemistry","crystal chemistry","crystal engineering","crystal optics","culinology","cybernetical physics","cybernetics","cymatics","cytochemistry","cytotechnology","dna nanotechnology","damage mechanics","data management","data science","data visualization","database forensics","decompiculture","deep learning (discipline)","dendroclimatology","dendrology","dental anatomy","dental pharmacology","dentistry","dermatology","dermatopathology","descriptive statistics","design","detailed engineering","developmental biology","developmental robotics","differential calculus","differential equations","differential geometry","differential topology","digital forensics","digital pathology","digital scholarship","digital signal processing","dimensional metrology","dioptrics","direct quantum chemistry","directional statistics","disaster medicine","disease informatics","distributed computing","diving medicine","diving physics","drilling engineering","dynamic combinatorial chemistry","dynamic covalent chemistry","dynamic stereochemistry","dynamical systems","dynamics","e-agriculture","e-epidemiology","earth science","earth system science","earthquake engineering","eco-friendly dentistry","ecohydrology","ecoimmunology","ecoinformatics","ecological economics","ecological energetics","ecological engineering","ecology","ecomechanics","ecomechatronics","ecopoiesis","ecosystem ecology","ecotechnology","ecotoxicology","ecovirology","edaphology","electrical engineering","electro-optics","electrochemical engineering","electrochemistry","electrohydrodynamics","electromechanics","electron optics","electronic engineering","electronics","electrophysiology","electrostatics","emergency medicine","endocrine oncology","endocrine pathology","endocrinology","endodontics","endoreversible thermodynamics","energetics","energy and environmental engineering","energy development","energy engineering","energy statistics","energy technology","engineering","engineering geology","engineering informatics","engineering mathematics","engineering physics","engineering statistics","enterprise systems engineering","entomotoxicology","environmental biotechnology","environmental chemistry","environmental design","environmental economics","environmental engineering","environmental engineering science","environmental epidemiology","environmental geology","environmental informatics","environmental microbiology","environmental science","environmental soil science","environmental statistics","environmental studies","environmental toxicology","enzyme kinetics","epidemiology","epigenomics","epitranscriptomics","epizootiology","equilibrium chemistry","equilibrium thermodynamics","ergonomics","estimation statistics","ethopharmacology","euclidean geometry","euclidean solid geometry","euphenics","euthenics","evidence-based dentistry","evidence-based medicine","evidence-based toxicology","evolutionary biology","evolutionary computation","evolutionary developmental robotics","evolutionary informatics","evolutionary medicine","evolutionary robotics","evolutionary taxonomy","exercise physiology","exobiology","exoplanetology","exploration geophysics","explosives engineering","extended irreversible thermodynamics","extensional tectonics","extragalactic astronomy","extrapolation based molecular systems biology","far-infrared astronomy","fault mechanics","femtochemistry","femtotechnology","fertility medicine","file dynamics","fine structure genetics","finsler geometry","fire ecology","fish anatomy","fisheries acoustics","fisheries science","fixed prosthodontics","flight dynamics","flight dynamics (fixed-wing aircraft)","flight dynamics (spacecraft)","flow chemistry","flow cytometry bioinformatics","fluid dynamics","fluid kinematics","fluid mechanics","fluidics","food chemistry","food engineering","food microbiology","food physical chemistry","food rheology","food science","food technology","foodomics","forensic astronomy","forensic chemistry","forensic engineering","forensic entomology","forensic geology","forensic geophysics","forensic materials engineering","forensic meteorology","forensic mycology","forensic palynology","forensic pathology","forensic radiology","forensic science","forensic seismology","forensic statistics","forensic toxicology","forest dynamics","forest ecology","forest pathology","fourier analysis","fourier optics","fractional quantum mechanics","fracture mechanics","freshwater biology","frictional contact mechanics","functional analysis","functional genomics","functional molecular infection epidemiology","futurology","galactic astronomy","gamma-ray astronomy","gas kinetics","gastroenterology","gastrointestinal pathology","general topology","genetic epidemiology","genitourinary medicine","genome engineering","genomics","geobiology","geochemistry","geochronology","geochronometry","geodesy","geodetic astronomy","geoduck aquaculture","geodynamics","geographic information science","geography","geoinformatics","geology","geomathematics","geomatics","geomechanics","geometric mechanics","geometrical acoustics","geometrical optics","geometrodynamics","geometry","geomicrobiology","geomorphology","geophysical fluid dynamics","geophysics","geostatistics","geotechnical engineering","geotechnics","geothermobarometry","geriatric dentistry","geriatric nephrology","geriatric neurology","geriatric oncology","geriatric psychiatry","geriatric rheumatology","geriatrics","gerontechnology","gerontological nursing","gerontology","glaciology","global radiology","glycobiology","glycoinformatics","glycomics","glycoproteomics","graphic design","gravitational biology","gravitational-wave astronomy","green chemistry","green engineering","gross pathology","guidance, navigation and control","gynaecologic cytology","gynaecology","gynecologic pathology","hamiltonian fluid mechanics","hamiltonian optics","health geography","health informatics","health physics","health systems engineering","heart nanotechnology","heat transfer physics","heating, ventilation and air conditioning","heliciculture","helicopter dynamics","heliophysics","helioseismology","helium cryogenics","helminthology","hematology","hematopathology","hemodynamics","hemorheology","hepatology","high energy density physics","high energy nuclear physics","high time-resolution astrophysics","high-definition metrology","high-dimensional statistics","high-energy astronomy","higher-order statistics","highway engineering","hirudiculture","histopathology","hitting mechanics","home-stored product entomology","horology","horticulture","hospice and palliative medicine","host-guest chemistry","human biology","human communication","human systems engineering","human-computer interaction","humanitarian engineering","hurricane engineering","hydraulic engineering","hydraulics","hydroculture","hydrogen biology","hydrogeology","hydrogeomorphology","hydrogeophysics","hydrography","hydroinformatics","hydrology","hydrology (agriculture)","hydrometeorology","hydropedology","hydrostatics","ice-sheet dynamics","ichnology","igneous petrology","imaging","imaging informatics","imaging science","immunochemistry","immunodermatology","immunogenetics","immunohaematology","immunology","immunomics","immunopathology","immunophysics","immunoproteomics","immunotoxicology","in silico medicine","in vitro toxicology","indenter tectonics","induced-charge electrokinetics","industrial agriculture","industrial ecology","industrial engineering","industrial microbiology","infodemiology","informatics","information science","information system (discipline)","information technology","information technology management","informetrics","infrared astronomy","inland saline aquaculture","inorganic chemistry","instrumental chemistry","instrumentation and control engineering","integral geometry","integrated computational materials engineering","integrated geography","integrated modular avionics","intensive care medicine","interface and colloid science","interferomics","internal medicine","intertidal ecology","interventional cardiology","interventional radiology","invariance mechanics","irrigation informatics","island ecology","isotope electrochemistry","isotope geochemistry","isotope hydrology","kinaesthetics","kinematics","kinesiology","kinetics (physics)","laboratory informatics","lagrangian mechanics","land development engineering","landscape ecology","landscape epidemiology","landscape limnology","langevin dynamics","laryngology","laser medicine","laser science","lattice theory","legal informatics","lifestyle medicine","light-field photography","limnology","linear algebra","lipid bilayer mechanics","lipidology","liquid logistics","logic in computer science","logistics","lorentz-violating electrodynamics","loudspeaker acoustics","lumped damage mechanics","lunar seismology","machine learning","macro-engineering","macroecology","macroelectronics","magnetic chemistry","magnetobiology","magnetochemistry","magnetoelectrochemistry","magnetohydrodynamics","maintenance engineering","management cybernetics","managerial epidemiology","manufacturing","manufacturing engineering","mariculture","marine biology","marine engineering","marine geology","marine larval ecology","maritime geography","markov chain geostatistics","mass-gathering medicine","materials informatics","materials physics","materials science","materiomics","maternal-fetal medicine","mathematical analysis","mathematical and theoretical biology","mathematical chemistry","mathematical geophysics","mathematical logic","mathematical modeling","mathematical physics","mathematical physiology","mathematical psychology","mathematical statistics","mathematics","mechanical engineering","mechanics","mechanistic organic photochemistry","mechanobiology","mechanochemistry","mechanostereochemistry","mechatronics","medical biology","medical cybernetics","medical genetics","medical geology","medical logistics","medical microbiology","medical physics","medical robotics","medical statistics","medical toxicology","medicinal chemistry","medicine","megascale engineering","melissopalynology","membrane biology","membrane biophysics","membrane technology","mesoscale meteorology","mesoscopic physics","metabolic engineering","metabolomics","metagenomics","metaproteomics","meteorology","method engineering","methods engineering","metric geometry","metrology","micro process engineering","microbial cytology","microbial ecology","microbial phylogenetics","microbial population biology","microbiology","microbotics","microecology","microelectronics","microfluidics","microgravity research","micromeritics","micropaleontology","microphotonics","microscale chemistry","microscale meteorology","microsurgical endodontics","microwave chemistry","microwave engineering","military engineering","mineral physics","minimally disruptive medicine","mining engineering","mining machinery engineering","mobile agriculture","mobile device forensics","mobile telephony","modern physics","molecular biology","molecular biophysics","molecular electronics","molecular engineering","molecular epidemiology","molecular genetics","molecular geometry","molecular mechanics","molecular microbiology","molecular neuroscience","molecular oncology","molecular paleontology","molecular pathological epidemiology","molecular pathology","molecular phylogenetics","molecular physics","molecular scale electronics","molecular virology","montane ecology","morphogenetic robotics","morphotectonics","mucosal immunology","multilinear algebra","multivariable calculus","multivariate statistics","museum informatics","musical acoustics","nambu mechanics","nanobiomechanics","nanobiotechnology","nanochemistry","nanoelectrochemistry","nanoelectronics","nanoengineering","nanofluidics","nanogeoscience","nanoionics","nanomechanics","nanomedicine","nanometrology","nanonephrology","nanophotonics","nanorobotics","nanotechnology","nanothermometry","nanotoxicology","nanotribology","natural resource management","navigation","near-field optics","near-surface geophysics","neoichnology","neonatal nursing","neonatology","neotectonics","nephrology","network forensics","network science","neural engineering","neural tissue engineering","neuro-ophthalmology","neuroanatomy","neurobioengineering","neurocardiology","neurochemistry","neurocybernetics","neuroendocrinology","neuroepidemiology","neuroergonomics","neuroethology","neurogastroenterology","neuroheuristics","neuroimmunology","neuroinformatics","neurology","neuromorphic engineering","neuromuscular medicine","neurooncology","neuropathology","neuropharmacology","neurophysiology","neuroprosthetics","neuroproteomics","neuropsychiatry","neuroradiology","neurorobotics","neurotology","neurovirology","neutrino astronomy","non-autonomous mechanics","non-equilibrium thermodynamics","non-parametric statistics","non-smooth mechanics","nonimaging optics","nonlinear acoustics","nonlinear optics","nosology","nuclear astrophysics","nuclear chemistry","nuclear electronics","nuclear engineering","nuclear forensics","nuclear medicine","nuclear physics","nuclear reactor physics","nucleic acid thermodynamics","numerical analysis","nursing","nutrigenomics","nutrition","nutritional genomics","nutritional immunology","nutritional science","obesity medicine","observational astronomy","obstetric medicine","obstetrical nursing","obstetrics","obstetrics and gynaecology","ocean chemistry","ocean dynamics","oceanography","octopus aquaculture","oenology","offshore aquaculture","offshore geotechnical engineering","olericulture","omics","oncogenomics","oncology","oncology nursing","onconephrology","online engineering","ontology engineering","open synthetic biology","operatory theory","ophthalmic pathology","ophthalmology","optical engineering","optical physics","optics","optoelectrofluidics","optoelectronics","optofluidics","optomechanics","oral and maxillofacial pathology","oral microbiology","oral mucosa tissue engineering","oral sedation dentistry","order theory","organic aquaculture","organic chemistry","organic electronics","organic geochemistry","organic horticulture","organic photonics","organocerium chemistry","organolanthanide chemistry","organometallic chemistry","orthodontic mechanics","orthopaedic sports medicine","orthoptics","orthotics","osteoimmunology","otology","otorhinolaryngology","packaging engineering","paediatric radiology","paleobiology","paleoceanography","paleoclimatology","paleoecology","paleogenetics","paleogeoscience","paleolimnology","paleomycology","paleontology","paleoparasitology","paleopedology","paleoseismology","paleotempestology","paleovirology","palliative medicine","palynology","paper engineering","parametric statistics","parasitology","parastatistics","paraterraforming","partial differential equations","particle physics","particle statistics","particle technology","passive dynamics","patch dynamics","pathogenomics","pathology","pathophysiology","pavement engineering","pediatric dentistry","pediatric emergency medicine","pediatric endocrinology","pediatric gastroenterology","pediatric nursing","pediatric ophthalmology","pediatric pathology","pediatric urology","pediatrics","pedology (soil study)","pedometrics","perceptual robotics","peridynamics","perineology","periodontology","permaculture","personal genomics","pervasive informatics","pest insect population dynamics","pet orthotics","petrochemistry","petroleum engineering","petroleum geochemistry","petroleum microbiology","petroleum production engineering","petrology","petrophysics","phage ecology","pharmaceutical microbiology","pharmaceutics","pharmacocybernetics","pharmacodynamics","pharmacoepidemiology","pharmacogenetics","pharmacogenomics","pharmacoinformatics","pharmacokinetics","pharmacology","pharmacometrics","pharmaconomy","pharmacotoxicology","pharmacy","phenology","phenomics","photochemistry","photoelectrochemistry","photogeochemistry","photomedicine","photometry (optics)","photonics","phthisiology","phylogenetics","physical acoustics","physical chemistry","physical cosmology","physical geography","physical oceanography","physical optics","physical organic chemistry","physics","physiological chemistry","physiomics","phytochemistry","phytogeomorphology","phytomedicine","phytopathology","picotechnology","planetary cartography","planetary defense","planetary engineering","planetary geology","planetary science","planktology","plant disease epidemiology","plant pathology","plasma electrochemistry","plasma physics","plasticulture","pneumatics","polar ecology","polar meteorology","polyculture","polymer chemistry","polymer engineering","polymer physics","pomology","population biology","population dynamics","population ecology","population genetics","population genomics","poromechanics","port centric logistics","power electronics","power engineering","pre-hospital emergency medicine","precision agriculture","precision engineering","precision mechanics","predictive genomics","privacy engineering","probability and statistics","process analytical chemistry","process engineering","product engineering","production engineering","project management","propulsion engineering","prosthetics","prosthodontics","protein engineering","proteogenomics","proteomics","psychiatric and mental health nursing","psychiatric genetics","psychiatric pharmacy","psychiatry","psychrometrics","public health","pulmonary pathology","pulmonology","quantitative pharmacology","quantum biology","quantum chemistry","quantum electrochemistry","quantum electrodynamics","quantum electronics","quantum gravity","quantum information science","quantum mechanics","quantum metrology","quantum nanoscience","quantum optics","quantum statistical mechanics","quantum technology","quantum thermodynamics","quasioptics","radiation chemistry","radiation material science","radio astronomy","radio electronics","radio-frequency engineering","radio-frequency identification","radioanalytical chemistry","radiobiology","radiochemistry","radiogenomics","radioglaciology","radiology","radiopharmacology","railway engineering","rainfed agriculture","reaction dynamics","receptor-ligand kinetics","recessional agriculture","reconciliation ecology","regenerative agriculture","regenerative biomedicine","regenerative medicine","regenomics","rehabilitation engineering","rehabilitation robotics","relativistic quantum chemistry","reliability engineering","remote sensing (discipline)","renal pathology","reproductive biology","reproductive immunology","reservoir engineering","resource economics","respiratory physiology","restoration ecology","restorative dentistry","restorative neurology","reverse genetics","rheology","rheumatology","rhinology","ribonomics","riemannian geometry","river engineering","river morphology","robot kinematics","robotics","robust statistics","rock mechanics","rocketry","room acoustics","rotordynamics","round-trip engineering","routhian mechanics","sabermetrics","safety engineering","safety pharmacology","salt tectonics","sanitary engineering","scallop aquaculture","scientific modeling","scientometrics","sclerochronology","search-based software engineering","second-order cybernetics","secretomics","security engineering","sedimentology","seismo-electromagnetics","seismology","seismotectonics","selenography","sensitometry","sensory neuroscience","sericulture","serology","service-oriented software engineering","settlement geography","signal processing","silicon photonics","silvology","situated robotics","sleep epidemiology","sleep medicine","slosh dynamics","small-scale agriculture","soft body dynamics","soft chemistry","soft ergonomics","soft tissue pathology","software development","software engineering","soil bioengineering","soil biology","soil chemistry","soil ecology","soil mechanics","soil microbiology","soil physics","soil science","soil zoology","solar astronomy","solar photonics","solar physics","solid mechanics","solid state ionics","solid-state chemistry","sonochemistry","space archaeology","space architecture","space exploration","space geostrategy","space logistics","space manufacturing","space medicine","space neuroscience","space nursing","space physics","space research","space robotics","space science","space tourism","space traffic management","space-based economy","spacecraft design","spatial ecology","special needs dentistry","specialty engineering","spectral theory","speech science","speech-language pathology","speleology","spherical astronomy","spin engineering","spinmechatronics","spinplasmonics","spintronics","sports biomechanics","sports medicine","sports science","statics","statistical epidemiology","statistical genetics","statistical mechanics","statistical physics","statistics","stellar archaeology","stellar astronomy","stellar chemistry","stellar dynamics","stellar kinematics","stellar physics","stem cell engineering","stem cell proteomics","stereochemistry","stereoelectronics","strike-slip tectonics","string phenomenology","structural fracture mechanics","structural bioinformatics","structural biology","structural dynamics","structural engineering","structural genomics","structural geology","structural mechanics","structural parasitology","submillimetre astronomy","subsistence agriculture","subsurface utility engineering","suicidology","supermathematics","superstatistics","supply chain management","supramolecular chemistry","supramolecular electronics","surface chemistry","surface metrology","surface science","surface-water hydrology","surgical pathology","sustainable architecture","sustainable design","sustainable engineering","sustainable transport","sustainable urban planning","symplectic geometry","synaptic pharmacology","synergetics (haken)","synthetic biology","synthetic genomics","synthetic morphology","synthetic virology","systemics","systems biology","systems biomedicine","systems ecology","systems engineering","systems geology","systems immunology","systems medicine","systems neuroscience","systems pharmacology","systems science","techno-mathematics","technology forecasting","tectonics","tectonophysics","tele-epidemiology","telecommunications engineering","teledermatology","telematics","telemedicine","telenursing","telepathology","telepharmacy","telephony","telerobotics","terraforming","terrain cartography","testicular immunology","textile engineering","the central science","theoretical astronomy","theoretical chemistry","theoretical computer science","theoretical ecology","theoretical neuromorphology","theoretical physics","theoretical planetology","theoretical production ecology","theory of computation","theriogenology","thermal engineering","thermal hydraulics","thermal physics","thermal science","thermochemistry","thermodynamics","thermokinetics","thermophysics","thin-film optics","thrust tectonics","time domain astronomy","time geography","tissue engineering","topography","topological dynamics","topology","topology (chemistry)","toponomics","toxgnostics","toxicodynamics","toxicogenomics","toxicology","traffic engineering (transportation)","traffic management","transform theory","transformation optics","transfusion medicine","transition engineering","translational bioinformatics","translational medicine","translational research informatics","transport economics","transportation engineering","transportation geography","traumatology","tribology","trichology","tropical ecology","tropical medicine","u-statistics","ultraviolet astronomy","underwater robotics","urban climatology","urogynecology","urology","urology robotics","valliculture","vehicle dynamics","veterinary medicine","veterinary oncology","veterinary parasitology","veterinary pathology","viral dynamics","viral metagenomics","viral phylodynamics","viroinformatics","virology","virophysics","visible-light astronomy","visual analytics","viticulture","vocology","volatolomics","volcano tectonics","volcanology","waste management","wastewater engineering","water management","web development","web engineering","well engineering","wet chemistry","wet processing engineering","wilderness medicine","wind engineering","x-ray astronomy","xenoarchaeology","xenobiology","xylology","zymology"];
	//listSug = JSON.stringify(listSug);
	/*
	var sorted = [];
	for (var i = 0; i < listSug.length; i++) {
		sorted.push(listSug[i].toLowerCase());
	}
	*/

	$('.autoCom').typeahead(null, {
		name: 'fields',
		source: apiFields,
		limit: 160,
	});

	$('.autoCom').on('keydown', this, function (event) {
		if (event.keyCode == 13) {
			return false;
		}
	}).tagsManager({
		hiddenTagListName: 'MMERGE3',
		onlyTagList: true,
		tagList: listSug
	})

	
//});