$(document).ready(function(){
  $('.cpf-mask').mask('000.000.000-00');
});

document.getElementById("generatorForm").addEventListener("submit", function(event){
  event.preventDefault()

  // let tpAto = document.getElementById('tpAto').value;
  // if (tpAto.trim() === '') {
  //   tpAto = '00000';
  // }

  let data = {
    cpf: document.getElementById('cpf').value.replace(/\D/g,''),
    matricula: document.getElementById('matricula').value,
		
    tpAto: tpAto,
    numero: document.getElementById('numero').value,
    dtAto: dtAto,
    onus: document.getElementById('onus').value,
    disposicaoEntidadePrivada: document.getElementById('disposicaoEntidadePrivada').value,
    cnpjCedenteCessionario: cnpjCedenteCessionario.replace(/\D/g,'')
  }

	const dataLikeAnArray = [data]
	

  let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(dataLikeAnArray));
  let downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute("href", dataStr);
  downloadAnchorNode.setAttribute("download", "ATOCESSAODISPOSICAO.json");
  document.body.appendChild(downloadAnchorNode);
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
})


function loadJsonFile(event) {
  let file = event.target.files[0];
  if (file) {
    let reader = new FileReader();
    reader.onload = function(e) {
      let contents = e.target.result;
      let json = JSON.parse(contents);

      if (Object.keys(json).length === 1) {
        json = json[Object.keys(json)[0]];
      }

      // Preencha os campos do formulário com os dados do arquivo JSON
      document.getElementById('cpf').value = json.cpf;
      document.getElementById('matricula').value = json.matricula;

      document.getElementById('tpAto').value = json.tpAto;
      document.getElementById('numero').value = json.numero;
      document.getElementById('dtAto').value = json.dtAto;
      document.getElementById('onus').value = json.onus;
      document.getElementById('disposicaoEntidadePrivada').value = json.disposicaoEntidadePrivada;
      document.getElementById('cnpjCedenteCessionario').value = json.cnpjCedenteCessionario;

      // Aplique as máscaras novamente
      $('.cpf-mask').mask('000.000.000-00').trigger('input');
    };
    reader.readAsText(file);
  }
}



document.getElementById('jsonFile').addEventListener('change', loadJsonFile);
