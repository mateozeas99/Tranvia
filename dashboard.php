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
              	<span class="card-title black-text">Electro Valvulas</span>
                <table class="striped centered">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Zona</th>
                      <th class="hide-on-small-only">Descripción</th>
                      <th>Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Av. Americas</td>
                      <td class="hide-on-small-only">Feria Libre</td>
                      <td><!-- Switch -->
                        <div class="switch">
                          <label>
                            Off
                            <input id="switch-1" onchange="if(this.checked){callClient(31,1,2);}else{callClient(31,1,1);}" type="checkbox">
                            <span class="lever"></span>
                            On
                          </label>
                        </div></td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Av México</td>
                      <td class="hide-on-small-only">Taller</td>
                      <td><!-- Switch -->
                        <div class="switch">
                          <label>
                            Off
                            <input id="switch-2" onchange="if(this.checked){callClient(31,2,2);}else{callClient(31,2,1);}" type="checkbox">
                            <span class="lever"></span>
                            On
                          </label>
                        </div></td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>Gran Colombia</td>
                      <td class="hide-on-small-only">Pio Pio</td>
                      <td><!-- Switch -->
                        <div class="switch">
                          <label>
                            Off
                            <input id="switch-3" onchange="if(this.checked){callClient(31,3,2);}else{callClient(31,3,1);}" type="checkbox">
                            <span class="lever"></span>
                            On
                          </label>
                        </div></td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td>Av. España</td>
                      <td class="hide-on-small-only">Terminal Terrestre</td>
                      <td><!-- Switch -->
                        <div class="switch">
                          <label>
                            Off
                            <input id="switch-4" onchange="if(this.checked){callClient(31,4,2);}else{callClient(31,4,1);}" type="checkbox">
                            <span class="lever"></span>
                            On
                          </label>
                        </div></td>
                    </tr>
                    <!--<tr>
                      <td>5</td>
                      <td>Mariscal Lamar</td>
                      <td class="hide-on-small-only">Centro</td>
                      <td>
                        <div class="switch">
                          <label>
                            Off
                            <input id="switch-5" onchange="if(this.checked){callClient(31,5,2);}else{callClient(31,5,1);}" type="checkbox">
                            <span class="lever"></span>
                            On
                          </label>
                        </div></td>
                    </tr>-->
                  </tbody>
                </table>
            </div>
            <div class="card-action center-align">
              <a onclick="allSwitch(1);" class="waves-effect white-text btn amber">Prender Todo</a>
              <a onclick="allSwitch(0);" class="waves-effect white-text btn amber">Apagar Todo</a>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col s12 m12">
          <div class="card white hoverable">
            <div class="card-content center-align">
              <span class="card-title black-text">Historial</span>
              <div class="scroll">
                <table class="striped centered">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Hora</th>
                      <th>Desc.</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>12:05:54</td>
                      <td>Problema</td>
                    </tr>
                    <tr>
                      <td>1</td>
                      <td>12:05:54</td>
                      <td>Problema</td>
                    </tr>
                    <tr>
                      <td>1</td>
                      <td>12:05:54</td>
                      <td>Problema</td>
                    </tr>
                    <tr>
                      <td>1</td>
                      <td>12:05:54</td>
                      <td>Problema</td>
                    </tr>
                    <tr>
                      <td>1</td>
                      <td>12:05:54</td>
                      <td>Problema</td>
                    </tr>
                    <tr>
                      <td>1</td>
                      <td>12:05:54</td>
                      <td>Problema</td>
                    </tr>
                    <tr>
                      <td>1</td>
                      <td>12:05:54</td>
                      <td>Problema</td>
                    </tr>
                    <tr>
                      <td>1</td>
                      <td>12:05:54</td>
                      <td>Problema</td>
                    </tr>
                    <tr>
                      <td>1</td>
                      <td>12:05:54</td>
                      <td>Problema</td>
                    </tr>
                    <tr>
                      <td>1</td>
                      <td>12:05:54</td>
                      <td>Problema</td>
                    </tr>
                  </tbody>
                </table>
              </div>
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
    // document.getElementById("switch-1").checked=true;
    connectWebSocket();
    initial('dashboard');
  });
  function allSwitch(value)
  {
    if(value)
    {
      document.getElementById('switch-1').checked=true;
      callClient(31,1,2);
      document.getElementById('switch-2').checked=true;
      callClient(31,2,2);
      document.getElementById('switch-3').checked=true;
      callClient(31,3,2);
      document.getElementById('switch-4').checked=true;
      callClient(31,4,2);
      document.getElementById('switch-5').checked=true;
      callClient(31,5,2);
    }
    else
    {
      document.getElementById('switch-1').checked=false;
      callClient(31,1,1);
      document.getElementById('switch-2').checked=false;
      callClient(31,2,1);
      document.getElementById('switch-3').checked=false;
      callClient(31,3,1);
      document.getElementById('switch-4').checked=false;
      callClient(31,4,1);
      document.getElementById('switch-5').checked=false;
      callClient(31,5,1);
    }
  }
</script>
