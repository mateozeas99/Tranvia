<?php
require_once 'core/init.php';
$user = new User();
//if ($user->isLoggedIn())
{
	include 'paginas/header.php';
?>
	<div class="container border_sinaptica">
      <div class="row">
        <div class="col s12 m12">
          <div class="card white hoverable">
            <div class="card-content center-align">
              	<span class="card-title black-text">Cámara</span>
                <br>
                <img id="cam_draw" src="" widht="400" height="300"/>
                <iframe name="action_zone" id="action_zone"></iframe>
            </div>
            <div class="card-action center-align">
              <a class="waves-effect white-text btn amber" onmousedown="action_zone.location='http://192.168.88.230:3030/decoder_control.cgi?user=admin&pwd=maradona68&command=0';" onmouseup="action_zone.location='http://192.168.88.230:3030/decoder_control.cgi?user=admin&pwd=maradona68&command=1';">Down</a>
              <a class="waves-effect white-text btn amber" onmousedown="action_zone.location='http://192.168.88.230:3030/decoder_control.cgi?user=admin&pwd=maradona68&command=2';" onmouseup="action_zone.location='http://192.168.88.230:3030/decoder_control.cgi?user=admin&pwd=maradona68&command=3';">Up</a>
              <a class="waves-effect white-text btn amber" onmousedown="action_zone.location='http://192.168.88.230:3030/decoder_control.cgi?user=admin&pwd=maradona68&command=4';" onmouseup="action_zone.location='http://192.168.88.230:3030/decoder_control.cgi?user=admin&pwd=maradona68&command=5';">Right</a>
              <a class="waves-effect white-text btn amber" onmousedown="action_zone.location='http://192.168.88.230:3030/decoder_control.cgi?user=admin&pwd=maradona68&command=6';" onmouseup="action_zone.location='http://192.168.88.230:3030/decoder_control.cgi?user=admin&pwd=maradona68&command=7';">Left</a>
            </div>
          </div>
        </div>
      </div>
  </div>
<?php
	include 'paginas/footer.php';
}
/*else
{
	include 'login.php';
}*/
?>
<script type="text/javascript">
  $( document ).ready(function() {
    // Handler for .ready() called.
    initial('camera');
    connectWebSocket();
  });
</script>
