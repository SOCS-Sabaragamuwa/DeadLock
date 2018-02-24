<?php

/*
Author : Shafraz Rahim
*/

ini_set('error_log', 'sms-app-error-jedi.log');

include 'lib/SMSSender.php';
include 'lib/SMSReceiver.php';


//date_default_timezone_set("Asia/Colombo");


/*** To be filled ****/

$password= "d0b3e8942bcd47a609d2830ae31c97d9";

$applicationId = "APP_042964";

$serverurl= 'https://api.dialog.lk/sms/send';

 


try{
	/*************************************************************/
	$receiver = new SMSReceiver(file_get_contents('php://input'));
	$content =$receiver->getMessage();
	$content=preg_replace('/\s{2,}/',' ', $content); 
	$address = $receiver->getAddress();
	$address = $receiver->getAddress();
	$requestId = $receiver->getRequestID();
	$applicationId = $receiver->getApplicationId();
	/*************************************************************/
	

	$sender = new SMSSender($serverurl, $applicationId, $password);
	
	
	
	//list($keyword,$opt)=explode(" ","fegg");
	
	if (TRUE) {

		// Send a broadcast message to all the subcribed users
		$response = $sender->sendMessage("This is a test app.",$address);
	
	}else{

		// Send a SMS to a particular user
		$response=$sender->sendMessage('Incorrect message',$address);
	}

						

	}catch(SMSServiceException $e){

	     	error_log("Passed Exception ".$e);

	
	}

?>
