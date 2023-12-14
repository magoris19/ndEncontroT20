// Array para armazenar os valores de ND
var ndAmeacaArray = [];

function adicionar() {
  // Obter o valor do input
  var ameacaValue = document.getElementById("txtAmeaca").value;
  var ndValue = document.getElementById('ndAmeaca').value;

  // Verificar se está vazio
  if (ndValue === "" || ameacaValue === "") {
    alert("Preencha todos os campos!");
  } else {
    // Converter ndValue para número
    var ndNumber = parseFloat(ndValue);

    // Verificar se o valor é menor ou igual a 20
    if (ndNumber > 20) {
      alert("O valor do ND deve ser menor ou igual a 20!");
      return; // Retorna para evitar a execução do restante da função
    }

    // Verificar se o valor já existe no array
    if (ndAmeacaArray.includes(ndNumber)) {
      alert("⚠️ ND já incluso ⚠️\nPor favor, agrupe os NDs seguindo as regras da página 09 do Ameaças de Arton!");
      return; // Retorna para evitar a execução do restante da função
    }

    // Adicionar o novo valor ao array
    ndAmeacaArray.push(ndNumber);

    // Incluir a nova LI
    incluirNovaLi(ameacaValue, ndValue, ndNumber);
  }

  // Limpa o input a cada vez que roda
  document.getElementById("txtAmeaca").value = "";
  document.getElementById("ndAmeaca").value = "";
}

// Função para incluir uma nova li
function incluirNovaLi(ameacaValue, ndValue, ndNumber) {
  var node = document.createElement("li");
  var textnode = document.createTextNode(ameacaValue + " ND" + ndValue);

  // Atribuir classe com base no valor de nd
  if (ndValue < 5) {
    node.classList.add("iniciante");
  } else if (ndValue >= 5 && ndValue <= 10) {
    node.classList.add("veterano");
  } else if (ndValue >= 11 && ndValue <= 16) {
    node.classList.add("campeao");
  } else {
    node.classList.add("lenda");
  }

  // Adiciona o botão de exclusão à li
  var deleteButton = document.createElement("button");
  deleteButton.className = "delete-button";
  deleteButton.textContent = "X";
  deleteButton.onclick = function () {
    // Função para excluir a li ao clicar no botão
    removerAmeaca(ndNumber);
    node.remove();
  };

  // Adiciona o texto e o botão de exclusão à li
  node.appendChild(textnode);
  node.appendChild(deleteButton);

  // Adiciona a li à ul
  document.getElementById("ul").appendChild(node);
}

// Função para remover o ndNumber da ndAmeacaArray
function removerAmeaca(ndNumber) {
  var index = ndAmeacaArray.indexOf(ndNumber);
  if (index !== -1) {
    ndAmeacaArray.splice(index, 1);
  }
}

// Enter para entrar os valores
function handleEnterKey(event) {
  if (event.key === "Enter" || event.keyCode === 13) {
    adicionar();
  }
}

document.getElementById('txtAmeaca').addEventListener("keydown", handleEnterKey);
document.getElementById('ndAmeaca').addEventListener("keydown", handleEnterKey);

// Apagar a ul quando recarrega
function recarregar() {
  // Find the element which contains the element to be removed.
  var containerEl = document.getElementsByTagName('ul')[0];
  // Enquanto tiver filhos, remove o último filho
  while (containerEl.hasChildNodes()) {
    containerEl.removeChild(containerEl.lastChild);
  }

  // Limpa o input a cada vez que roda
  document.getElementById("txtAmeaca").value = "";
  document.getElementById("ndAmeaca").value = "";
  // Limpa a array
  ndAmeacaArray = [];

  // Remove o elemento <p> com o id "ndFinalResultado"
  var resultadoElement = document.getElementById("ndFinalResultado");
  if (resultadoElement) {
    resultadoElement.remove();
  }
}


function calcularNivelDesafio(ameacas) {
  // Encontre o ND máximo
  let ndBase = Math.max(...ameacas.map(ameaca => ameaca.nd));
  let ndEncontro = ndBase;

  // Calcule o ND do encontro
  for (let ameaca of ameacas) {
      let diferenca = ndBase - ameaca.nd;

      if (diferenca === 1) {
          ndEncontro += 1;
      } else if (diferenca === 2) {
          ndEncontro += 0.5;
      } else if (diferenca === 3) {
          ndEncontro += 0.25;
      }
  }

  // Use a função Number para remover zeros à direita após o ponto decimal
  return Number(ndEncontro).toString();
}


// Função para extrair as ameaças da lista de li
function extrairAmeacasDaLista() {
  const listaAmeacas = document.querySelectorAll("li");
  const ameacas = [];

  listaAmeacas.forEach((item) => {
      const partes = item.innerText.split(" ND");
      const nome = partes[0];
      const nd = parseFloat(partes[1]);
      ameacas.push({ nome, nd });
  });

  return ameacas;
}

// Função para calcular e exibir o ND Final do Encontro
function calcularNDEncontro() {
  const ameacas = extrairAmeacasDaLista();
  const ndFinal = calcularNivelDesafio(ameacas);

  // Verificar se há ameaças para calcular o ND do encontro
  if (ameacas.length === 0) {
    alert("Adicione pelo menos uma ameaça antes de calcular o ND do encontro.");
  } else {
    // Exibir o ndFinal
    const resultadoElement = document.createElement("p");
    resultadoElement.classList.add("pEncontro");
    resultadoElement.textContent = `ND do Encontro: ${ndFinal}`;
    resultadoElement.id = "ndFinalResultado";

    const resultadoContainer = document.getElementById("resultadoContainer");
    resultadoContainer.innerHTML = "";
    resultadoContainer.appendChild(resultadoElement);

    // Mostrar o resultado definindo a propriedade de exibição como "block"
    resultadoContainer.style.display = "block";
  }
}
// Exemplo de uso ao clicar em um botão (pode ser ajustado conforme a interação desejada)
document.getElementById("calcularENDEncontro").addEventListener("click", calcularNDEncontro);
