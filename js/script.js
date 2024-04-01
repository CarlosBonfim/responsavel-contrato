$(document).ready(function(){
  $('.cpf-mask').mask('000.000.000-00');
	$('.cnpj-mask').mask('00.000.000/0000-00');
});

document.getElementById("generatorForm").addEventListener("submit", function(event){
  event.preventDefault()

  let data = {
    codUnidadeOrcamentaria: document.getElementById('codUnidadeOrcamentaria').value,
		numContrato: document.getElementById('numContrato').value,
		tpContrato: document.getElementById('tpContrato').value,
    cpf: document.getElementById('cpf').value.replace(/\D/g,''),
    matricula: document.getElementById('matricula').value,
    nome: document.getElementById('nome').value,
    tpResponsavel: document.getElementById('tpResponsavel').value,
		cnpjContratoOriginal: document.getElementById('cnpjContratoOriginal').value.replace(/\D/g,''),
		// cnpjContratoOriginal: cnpjContratoOriginal.replace(/\D/g,'')
  }
	const dataLikeAnArray = [data]

  let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(dataLikeAnArray));
  let downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute("href", dataStr);
  downloadAnchorNode.setAttribute("download", "RESPONSAVELCONTRATO.json");
  document.body.appendChild(downloadAnchorNode);
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
})
//Funcao que ira ler os arquivos no formato json e inserir nos campos
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
      document.getElementById('codUnidadeOrcamentaria').value = json.codUnidadeOrcamentaria;
      document.getElementById('numContrato').value = json.numContrato;
      document.getElementById('tpContrato').value = json.tpContrato;
    };
    reader.readAsText(file);
  }
}



document.getElementById('jsonFile').addEventListener('change', loadJsonFile);
