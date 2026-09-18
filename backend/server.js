const express = require("express");
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5500";
app.use(cors({ origin: FRONTEND_URL }));
const app = express();

const cardapio = [
  {categoria: "pao", nome:"Frances", preco: 1.5},
  {categoria: "pao", nome:"Integral", preco: 2.0},
  {categoria: "pao", nome:"Ciabatta", preco: 2.5},
  {categoria: "recheio", nome:"Frango", preco: 5.0},
  {categoria: "recheio", nome:"Carne", preco: 6.5},
  {categoria: "recheio", nome:"Vegetariano", preco: 4.0},
  {categoria: "molho", nome:"Maionese", preco: 0.5},
  {categoria: "molho", nome:"Mostarda", preco: 0.5},
  {categoria: "molho", nome:"Especial", preco: 1.5},
]

function getPreco(categoria, nome) {
    const item = cardapio.find(n => n.categoria === categoria && n.nome === nome)

    return item.preco
}

app.use(cors())
app.use(express.json());

// ----- exercicio 01 ----- 
app.get("/", (req, res) => {
  res.send("Byte e Bun API no ar!")
})

// ------ exercicio 02 -----
app.get("/cardapio", (req, res) => {
  res.json(cardapio)
})

// ------ exercicio 03 -----// 
app.get("/cardapio/:categoria", (req, res) => {
  const categoria = req.params.categoria
  const filtrados = cardapio.filter((item) => item.categoria === categoria);
  res.json(filtrados);
})

// ------ exercicio 04 ------

app.post("/pedido", (req, res) => {
  const { pao, recheio, molho } = req.body
  
  const total = 
  getPreco ("pao", pao) +
  getPreco ("recheio", recheio) +
  getPreco ("molho", molho);

  res.json({
    pao,
    recheio,
    molho,
    total
  })
})


app.listen(3000, () => {
  console.log("Servidor Rodando em http://localhost:3000")
});


