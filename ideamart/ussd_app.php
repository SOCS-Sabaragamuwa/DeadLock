<?php


include_once 'lib/ussd/MoUssdReceiver.php';
include_once 'lib/ussd/MtUssdSender.php';
include_once 'log.php';

ini_set('error_log', 'ussd-app-error.log');

$receiver = new MoUssdReceiver(); 

$receiverSessionId = $receiver->getSessionId();
session_id($receiverSessionId); 
session_start();

$content = $receiver->getMessage(); // get the message content
$address = $receiver->getAddress(); // get the sender's address
$requestId = $receiver->getRequestID(); // get the request ID
$applicationId = $receiver->getApplicationId(); // get application ID
$encoding = $receiver->getEncoding(); // get the encoding value
$version = $receiver->getVersion(); // get the version
$sessionId = $receiver->getSessionId(); // get the session ID;
$ussdOperation = $receiver->getUssdOperation(); // get the ussd operation

if ($content == "1"){
	$eventsList = "Event list will be displayed here.";
}

logFile("[ content=$content, address=$address, requestId=$requestId, applicationId=$applicationId, encoding=$encoding, version=$version, sessionId=$sessionId, ussdOperation=$ussdOperation ]");

//your logic goes here......
$responseMsg = array(
    "main" => "Welcome to University of Sri Jayewardenepura USSD Portal.
    				1.Get Events
                    2.My Profile
                    000.Exit",
    "events" => $eventsList,
    "my_profile" => "Profile Info:
    				Name
    				Email
    				Mobile
    				Faculty & Department
    				Degree
                    94.Back
                    000.Exit",
);

logFile("Previous Menu is := " . $_SESSION['menu-Opt']); //Get previous menu number
if (($receiver->getUssdOperation()) == "mo-init") { //Send the main menu
    loadUssdSender($sessionId, $responseMsg["main"]);
    if (!(isset($_SESSION['menu-Opt']))) {
        $_SESSION['menu-Opt'] = "main"; //Initialize main menu
    }

}
if (($receiver->getUssdOperation()) == "mo-cont") {
    $menuName = null;

    switch ($_SESSION['menu-Opt']) {
        case "main":
            switch ($receiver->getMessage()) {
                case "1":
                    $menuName = "events";
                    break;
                case "2":
                    $menuName = "my_profile";
                    break;
                default:
                    $menuName = "main";
                    break;
            }
            $_SESSION['menu-Opt'] = $menuName; //Assign session menu name
            break;
        case "events":
	        switch ($receiver->getMessage()) {
	                case "94":
	                	$menuName = "main";
                    	$_SESSION['menu-Opt'] = "main";
                    	break;
	                default:
	                    $menuName = "main";
	                    break;
	            }
	            $_SESSION['menu-Opt'] = $menuName; //Assign session menu name
	            break;
	    case "my_profile":
	        switch ($receiver->getMessage()) {
	                case "94":
	                	$menuName = "main";
                    	$_SESSION['menu-Opt'] = "main";
                    	break;
	                default:
	                    $menuName = "main";
	                    break;
	            }
	            $_SESSION['menu-Opt'] = $menuName; //Assign session menu name
	            break; 

        
        

    }

    if ($receiver->getMessage() == "000") {
        $responseExitMsg = "Thank you for using USJP USSD Portal!";
        $response = loadUssdSender($sessionId, $responseExitMsg);
        session_destroy();
    } else {
        logFile("Selected response message := " . $responseMsg[$menuName]);
        $response = loadUssdSender($sessionId, $responseMsg[$menuName]);
    }

}
/*
    Get the session id and Response message as parameter
    Create sender object and send ussd with appropriate parameters
**/

function loadUssdSender($sessionId, $responseMessage)
{
    $password = "d0b3e8942bcd47a609d2830ae31c97d9";
    $destinationAddress = "tel:94771122336";
    if ($responseMessage == "000") {
        $ussdOperation = "mt-fin";
    } else {
        $ussdOperation = "mt-cont";
    }
    $chargingAmount = "5";
    $applicationId = "APP_042964";
    $encoding = "440";
    $version = "1.0";

    try {
        // Create the sender object server url

//        $sender = new MtUssdSender("http://localhost:7000/ussd/send/");   // Application ussd-mt sending http url
        $sender = new MtUssdSender("https://localhost:7443/ussd/send/"); // Application ussd-mt sending https url
        $response = $sender->ussd($applicationId, $password, $version, $responseMessage,
            $sessionId, $ussdOperation, $destinationAddress, $encoding, $chargingAmount);
        return $response;
    } catch (UssdException $ex) {
        //throws when failed sending or receiving the ussd
        error_log("USSD ERROR: {$ex->getStatusCode()} | {$ex->getStatusMessage()}");
        return null;
    }
}

?>