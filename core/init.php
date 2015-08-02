<?php
session_start();
$GLOBALS['config'] = array(
	'mysql'=> array(
			'host' => 'localhost',
			'username' => 'root',
			'password' => 'root',
			'db' => 'malgiac_oftalmologico'
		),
	'remember'=>array(
		'cookie_name'=> 'hash',
		'cookie_expiry'=> 31536000
		),
	'session' => array(
		'session_name'=>'user',
		'token_name' => 'token'
		),
	'pagination' => array(
		'maxreg' => 10,
		'adjacents' => 3
		)
	);
spl_autoload_register(function($class){
	require_once 'classes/'.$class.'.php';
});

require_once 'functions/sanitize.php';

if (Cookie::exists(Config::get('remember/cookie_name')) && !Session::exists(Config::get('session/session_name'))) {
	$hash = Cookie::get(Config::get('remember/cookie_name'));
	$hashCheck = DB::getInstance()->get('TUSERS_SESSIONS',array('HASH','=',$hash));

	if ($hashCheck->count()) {
		$user = new User($hashCheck->first()->USER_ID);
		$user->login();
	}
	
}
?>
