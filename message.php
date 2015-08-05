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
              	<span class="card-title black-text">Mensajes</span>
                <br>
                <a class="waves-effect white-text btn red" onclick="message(0);">Disparo Termico</a>
                <br>
                <a class="waves-effect white-text btn amber" onclick="message(1);">Nivel de Agua</a>
                <br>
                <a class="waves-effect white-text btn amber" onclick="message(2);">Mantenimiento</a>
                <br>
                <a class="waves-effect white-text btn red" onclick="message(3);">Falta de Energia</a>
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
    connectWebSocket();
  });
</script>
