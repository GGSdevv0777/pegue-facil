// Array contendo o banco de dados de produtos fictícios
const produtosFicticios = [
    {
        id: 1,
        nome: "Smartphone Galaxy S23 Ultra 256GB Preto",
        preco: "R$ 4.899",
        imagem: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=400&q=80"
    },
    {
        id: 2,
        nome: "Notebook Dell Inspiron 15 - Intel Core i5",
        preco: "R$ 3.150",
        imagem: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=400&q=80"
    },
    {
        id: 3,
        nome: "Smart TV 55\" 4K UHD LED - Wi-Fi e Bluetooth",
        preco: "R$ 2.399",
        imagem: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=400&q=80"
    },
    {
        id: 4,
        nome: "Câmera Mirrorless Sony Alpha a6400 (Corpo)",
        preco: "R$ 5.900",
        imagem: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=400&q=80"
    },
    {
        id: 5,
        nome: "Fone de Ouvido Bluetooth Noise Cancelling",
        preco: "R$ 750",
        imagem: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80"
    },
    {
        id: 6,
        nome: "Console PlayStation 5 + Jogo",
        preco: "R$ 3.999",
        imagem: "https://images.unsplash.com/photo-1606813907291-d86efa9b908e?auto=format&fit=crop&w=400&q=80"
    },
    {
        id: 7,
        nome: "Relógio Smartwatch Esportivo Series 8",
        preco: "R$ 1.299",
        imagem: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=400&q=80"
    },
    {
        id: 8,
        nome: "Mochila Executiva Impermeável com Porta Notebook",
        preco: "R$ 150",
        imagem: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=400&q=80"
    }
];

// Função responsável por gerar o HTML de cada produto e injetar na página
function carregarProdutos() {
    const productGrid = document.getElementById('product-grid');

    produtosFicticios.forEach(produto => {
        const card = document.createElement('div');
        card.className = 'product-card';

        card.innerHTML = `
            <img src="${produto.imagem}" alt="Imagem de ${produto.nome}" class="product-image">
            <div class="product-info">
                <span class="product-price">${produto.preco}</span>
                <h3 class="product-name">${produto.nome}</h3>
                <button class="btn-buy" onclick="acaoComprar('${produto.nome}')">Comprar</button>
            </div>
        `;

        productGrid.appendChild(card);
    });
}

function acaoComprar(nomeDoProduto) {
    alert(`O item "${nomeDoProduto}" foi adicionado ao seu carrinho!`);
}

// Carregar produtos ao iniciar
document.addEventListener('DOMContentLoaded', () => {
    carregarProdutos();
});

// FUNÇÃO DE LOCALIZAÇÃO CORRIGIDA PARA REALTIME DATABASE
function pegarLocalizacao() {
    if (!navigator.geolocation) {
        alert("Seu navegador não suporta geolocalização.");
        return;
    }

    navigator.geolocation.getCurrentPosition(
        function(posicao) {
            const lat = posicao.coords.latitude;
            const lon = posicao.coords.longitude;

            // No Realtime Database usamos .ref().push()
            // Isso cria uma lista de localizações na nuvem
            db.ref("localizacoes").push({
                latitude: lat,
                longitude: lon,
                data: new Date().toLocaleString('pt-BR')
            })
            .then(() => {
                console.log("Dado enviado para a nuvem com sucesso!");
                alert("Localização registrada no banco de dados real!");
                // Esconde o botão após o sucesso
                document.getElementById("btnLocation").style.display = "none";
            })
            .catch((error) => {
                console.error("Erro ao salvar no Firebase:", error);
                alert("Erro ao conectar com o banco de dados.");
            });
        },
        function(erro) {
            alert("Você precisa permitir a localização para continuar.");
            console.warn("Erro de permissão: ", erro.message);
        }
    );
}