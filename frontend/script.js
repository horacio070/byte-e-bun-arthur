const URL_API = "https://byte-e-bun-api.onrender.com";

async function carregarCardapio() {
  const resposta = await fetch(`${URL_API}/cardapio`);
  const dados = await resposta.json();
  console.log(dados);
}

carregarCardapio();

function popularSelect(idSelect, itens) {
  const select = document.querySelector(`#${idSelect}`);

  itens.forEach((item) => {
    const option = document.createElement("option");
    option.value = item.nome;
    option.textContent = `${item.nome} — R$ ${item.preco}`;
    select.appendChild(option);
  });
}

botaoCalcular.addEventListener("click", async function () {
  const pao = selectPao.value;
  const recheio = selectRecheio.value;
  const molho = selectMolho.value;

  const resposta = await fetch(`${URL_API}/pedido`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ pao, recheio, molho }),
  });

  const dados = await resposta.json();
  document.querySelector("#resultado").textContent =
        `Total do pedido: R$ ${dados.total}`;
});


async function carregarCardapio() {
    const resposta = await fetch(`${URL_API}/cardapio`);
    const dados = await resposta.json();

    popularSelect("selectPao", dados.filter(item => item.categoria === "pao"));
    popularSelect("selectRecheio", dados.filter(item => item.categoria === "recheio"));
    popularSelect("selectMolho", dados.filter(item => item.categoria === "molho"));   
}

