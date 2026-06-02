// CRM SuperDev - Módulo de Inteligência Preditiva (app.js)
// Projeto Didático para ADS & ADM

// 1. CARGA E PARSING DA BASE DE DADOS (100 CLIENTES DO CSV COM FALLBACK)

// CSV Embutido para compatibilidade offline / protocolo file://
const csvDataPadrao = `ID;Nome;CPF;Dias_Sem_Comprar;Total_Gasto_Mes;Categoria_Mais_Comprada;Quantidade_Compras
1;Lucas Silva;123.456.789-00;25;850.5;Mercearia;9
2;Ana Santos;234.567.890-11;3;1200.0;Vegetariano e Saudavel;13
3;Mateus Oliveira;345.678.901-22;14;450.2;Fraldas e Infantil;5
4;Beatriz Costa;456.789.012-33;22;920.0;Hortifruti;10
5;Thiago Rodrigues;567.890.123-44;1;350.0;Bebidas e Cervejas;4
6;Larissa Almeida;678.901.234-55;15;510.8;Fraldas e Infantil;6
7;Gabriel Nascimento;789.012.345-66;35;780.0;Limpeza;8
8;Mariana Sousa;890.123.456-77;5;150.0;Padaria;2
9;Felipe Lima;901.234.567-88;28;640.1;Acougue e Peixaria;7
10;Juliana Carvalho;012.345.678-99;13;480.0;Fraldas e Infantil;5
11;Gustavo Rocha;123.987.654-32;4;890.0;Vegetariano e Saudavel;9
12;Camila Araujo;234.876.543-21;21;1100.5;Mercearia;12
13;Rafael Melo;345.765.432-10;14;530.0;Fraldas e Infantil;6
14;Fernanda Gomes;456.654.321-09;42;720.0;Feriados e Doces;8
15;Leonardo Cardoso;567.543.210-98;2;410.0;Acougue e Peixaria;5
16;Aline Martins;678.432.109-87;15;495.0;Fraldas e Infantil;5
17;Rodrigo Ferreira;789.321.098-76;26;950.0;Bebidas e Cervejas;10
18;Amanda Barbosa;890.210.987-65;6;220.0;Hortifruti;3
19;Bruno Ribeiro;901.109.876-54;31;600.0;Mercearia;7
20;Isabela Pinto;012.012.345-43;13;560.2;Fraldas e Infantil;6
21;Vinicius Ramos;111.222.333-44;8;130.0;Padaria;2
22;Leticia Vieira;222.333.444-55;24;810.0;Limpeza;9
23;Diego Castro;333.444.555-66;14;520.0;Fraldas e Infantil;6
24;Caroline Rocha;444.555.666-77;33;1050.0;Vegetariano e Saudavel;11
25;Arthur Mendes;555.666.777-88;3;390.0;Mercearia;4
26;Bianca Nunes;666.777.888-99;15;480.9;Fraldas e Infantil;5
27;Pedro Souza;777.888.999-00;29;750.0;Acougue e Peixaria;8
28;Vanessa Dias;888.999.000-11;7;280.0;Hortifruti;3
29;Murilo Cunha;999.000.111-22;27;880.4;Mercearia;9
30;Larissa Neves;000.111.222-33;14;515.0;Fraldas e Infantil;6
31;Andre Santos;123.234.345-45;5;340.0;Bebidas e Cervejas;4
32;Jessica Cruz;234.345.456-56;23;990.0;Limpeza;10
33;Danilo Reis;345.456.567-67;13;540.0;Fraldas e Infantil;6
34;Barbara Lima;456.567.678-78;38;620.0;Padaria;7
35;Igor Moreira;567.678.789-89;2;460.0;Acougue e Peixaria;5
36;Camila Viana;678.789.890-90;15;500.0;Fraldas e Infantil;6
37;Douglas Teixeira;789.890.901-01;22;1250.0;Vegetariano e Saudavel;13
38;Patricia Guedes;890.901.012-12;9;190.0;Hortifruti;2
39;Renan Freitas;901.012.012-23;45;580.0;Mercearia;6
40;Natalia Alves;012.023.034-34;14;535.0;Fraldas e Infantil;6
41;Caio Borges;121.314.151-16;4;420.0;Bebidas e Cervejas;5
42;Gabriela Marques;232.425.262-27;25;790.0;Limgue e Peixaria;8
43;Eduardo Correia;343.536.373-38;15;490.0;Fraldas e Infantil;5
44;Priscila Farias;444.545.646-47;31;860.0;Vegetariano e Saudavel;9
45;Samuel Cavalcanti;555.656.757-58;1;310.0;Mercearia;4
46;Tatiana Macedo;666.767.868-69;13;525.0;Fraldas e Infantil;6
47;Vitor Peixoto;777.878.979-70;28;910.0;Acougue e Peixaria;10
48;Helena Antunes;888.989.080-81;6;240.0;Hortifruti;3
49;Hugo Assis;999.090.191-92;36;670.0;Limpeza;7
50;Bruna Guimaraes;000.101.202-03;14;505.0;Fraldas e Infantil;6
51;Alexandre Carvalho;102.203.304-45;3;1350.0;Mercearia;14
52;Debora Bernardes;203.304.405-56;12;210.0;Padaria;3
53;Marcos Pires;304.405.506-67;26;830.0;Acougue e Peixaria;9
54;Sabrina Meireles;405.406.507-78;8;400.0;Hortifruti;5
55;Wesley Braga;506.507.608-89;18;620.0;Bebidas e Cervejas;7
56;Leandro Fontes;607.608.709-90;2;1150.0;Vegetariano e Saudavel;12
57;Tania Sales;708.709.800-01;22;940.0;Limpeza;10
58;Ronaldo Paz;808.809.901-12;11;330.0;Mercearia;4
59;Milena Porto;909.910.012-23;5;270.0;Padaria;3
60;Fabio Silveira;010.112.123-34;34;700.0;Acougue e Peixaria;8
61;Cintia Dorneles;112.223.334-45;14;550.0;Fraldas e Infantil;6
62;Marcelo Xavier;223.334.445-56;3;410.0;Mercearia;5
63;Renata Campos;334.445.556-67;15;485.0;Fraldas e Infantil;5
64;Otavio Lins;445.556.667-78;27;820.0;Bebidas e Cervejas;9
65;Larissa Duarte;556.667.778-89;7;190.0;Hortifruti;2
66;Felipe Nazario;667.778.889-90;13;510.0;Fraldas e Infantil;6
67;Gisele Toledo;778.889.990-01;32;640.0;Limpeza;7
68;Sandro Malta;889.990.001-12;4;1280.0;Vegetariano e Saudavel;13
69;Viviane Rocha;990.001.112-23;14;530.0;Fraldas e Infantil;6
70;Cesar Valente;001.112.223-34;24;760.0;Mercearia;8
71;Daniela Paiva;113.224.335-46;8;310.0;Padaria;4
72;Marisa Franco;224.335.446-57;15;495.0;Fraldas e Infantil;5
73;Yago Frota;335.446.557-68;21;900.0;Acougue e Peixaria;10
74;Erika Lourenco;446.557.668-79;2;250.0;Hortifruti;3
75;Murilo Rossi;557.668.778-90;13;520.0;Fraldas e Infantil;6
76;Katia Abreu;668.778.889-01;37;610.0;Limpeza;7
77;Moacir Neto;779.880.991-12;6;380.0;Bebidas e Cervejas;4
78;Thais Villa;880.991.002-23;14;540.0;Fraldas e Infantil;6
79;Samuel Ortiz;991.002.113-34;30;850.0;Mercearia;9
80;Flavia Junqueira;002.113.224-45;4;1420.0;Vegetariano e Saudavel;15
81;Reinaldo Filho;122.233.344-55;15;505.0;Fraldas e Infantil;6
82;Elisa Guerra;233.344.455-66;25;730.0;Padaria;8
83;Denilson Aguiar;344.455.566-77;14;512.0;Fraldas e Infantil;6
84;Morgana Luz;455.566.677-88;39;680.0;Limpeza;7
85;Erick Nogueira;566.677.788-99;1;430.0;Acougue e Peixaria;5
86;Regina Falcao;677.788.889-00;13;528.0;Fraldas e Infantil;6
87;Nelson Jobim;788.889.990-11;28;915.0;Mercearia;10
88;Marta Suplicy;889.990.001-22;7;290.0;Hortifruti;3
89;Silvio Santos;990.001.112-33;15;490.0;Fraldas e Infantil;5
90;Fausto Silva;001.112.223-44;41;1100.0;Bebidas e Cervejas;12
91;Claudia Raia;114.225.336-47;10;1350.0;Vegetariano e Saudavel;14
92;Tony Ramos;225.336.447-58;14;518.0;Fraldas e Infantil;6
93;Gloria Pires;336.447.558-69;23;840.0;Mercearia;9
94;Lázaro Ramos;447.558.669-80;3;320.0;Padaria;4
95;Taís Araújo;558.669.770-91;13;532.0;Fraldas e Infantil;6
96;Reynaldo G.;669.770.881-02;26;795.0;Acougue e Peixaria;8
97;Giovanna A.;770.881.992-13;6;215.0;Hortifruti;3
98;Rodrigo S.;881.992.003-24;15;501.0;Fraldas e Infantil;6
99;Fernanda M.;992.003.114-35;33;660.0;Limpeza;7
100;Lima Duarte;003.114.225-46;14;545.0;Fraldas e Infantil;6`;

// Inicializar banco de dados de clientes
const clientes = [];

// Função auxiliar para interpretar a string CSV e povoar o array
function parseCSV(content) {
    const linhas = content.trim().split("\n");
    clientes.length = 0; // Limpar array existente

    for (let i = 1; i < linhas.length; i++) {
        const linha = linhas[i].trim();
        if (!linha) continue;
        const valores = linha.split(";");

        const id = parseInt(valores[0]);
        const nome = valores[1];
        const cpf = valores[2];
        const diasSemComprar = parseInt(valores[3]);
        const totalGastoMes = parseFloat(valores[4]);
        const categoriaMaisComprada = valores[5];
        const quantidadeCompras = parseInt(valores[6]);

        clientes.push({
            id: id,
            nome: nome,
            cpf: cpf,
            totalGastoMes: totalGastoMes,
            diasSemComprar: diasSemComprar,
            categoriaMaisComprada: categoriaMaisComprada,
            quantidadeCompras: quantidadeCompras
        });
    }
}

// Inicializar clientes carregando o arquivo dinamicamente ou usando o embutido
async function inicializarClientes() {
    try {
        const response = await fetch("clientes_supermercado.csv");
        if (response.ok) {
            const txt = await response.text();
            parseCSV(txt);
            crmConsole.log("Base de dados carregada: clientes_supermercado.csv", "success");
        } else {
            throw new Error("Falha ao abrir o arquivo CSV local.");
        }
    } catch (e) {
        parseCSV(csvDataPadrao);
        crmConsole.log("Base de dados carregada (fallback offline).", "info");
    }

    // Renderiza a UI após ler
    renderizarDashboard();
}

// 2. LÓGICA DE AVALIAÇÃO DOS PERFIS (CONSTITUIÇÃO DO CRM)
// Retorna a lista contendo o alerta de maior prioridade ativado pelo cliente
function classificarCliente(cliente) {
    const alertas = [];

    // Perfil 1: Ex-Fiel (Risco de Churn)
    if (cliente.totalGastoMes > 800 && cliente.diasSemComprar >= 20) {
        alertas.push({
            perfilId: 1,
            perfilNome: "Ex-Fiel",
            status: "crítico",
            mensagem: `Faz ${cliente.diasSemComprar} dias que não te vemos! Temos ofertas exclusivas esperando por você. 15% OFF na sua próxima visita!`
        });
    }
    // Perfil 2: Vegetariano (Cross-Selling)
    if ((cliente.categoriaMaisComprada === "Vegetariano e Saudavel" || cliente.categoriaMaisComprada === "Vegetariano e Saudável") && cliente.diasSemComprar >= 20) {
        alertas.push({
            perfilId: 2,
            perfilNome: "Vegetariano",
            status: "alerta",
            mensagem: `${cliente.nome.split(" ")[0]}, percebemos que você adora nossos produtos vegetarianos e saudáveis. Complete sua lista com higiene eco-friendly. 10% OFF só para você!`
        });
    }
    // Perfil 3: Pai / Mãe (Reposição)
    if (cliente.categoriaMaisComprada === "Fraldas e Infantil") {
        alertas.push({
            perfilId: 3,
            perfilNome: "Pai / Mãe",
            status: "oportunidade",
            mensagem: `${cliente.nome.split(" ")[0]}, seu estoque de produtos para bebê pode estar acabando. Garanta já com 12% OFF, válido por 48h! 👶`
        });
    }
    // Perfil 4: Fiel (Fidelização)
    if (cliente.totalGastoMes > 800 && cliente.diasSemComprar < 20) {
        alertas.push({
            perfilId: 4,
            perfilNome: "Fiel",
            status: "sucesso",
            mensagem: `${cliente.nome.split(" ")[0]}, agradecemos sua lealdade! Ganhe 10% OFF em toda a loja na sua próxima compra.`
        });
    }

    return alertas;
}

// 3. RENDERIZAÇÃO DA UI E FILTROS DO DASHBOARD
let filtroAtual = "todos";
let buscaAtual = "";
let clienteSelecionado = null;
let colunaOrdenacao = "id"; // Coluna padrão
let direcaoOrdenacao = "asc"; // Direção padrão: ascendente

function renderizarDashboard() {
    const listBody = document.getElementById("client-list-body");
    listBody.innerHTML = "";

    // Filtragem e busca
    const clientesFiltrados = clientes.filter(c => {
        const correspondeBusca = c.nome.toLowerCase().includes(buscaAtual.toLowerCase()) || c.cpf.includes(buscaAtual);
        const alertas = classificarCliente(c);

        if (!correspondeBusca) return false;
        if (filtroAtual === "todos") return true;
        if (filtroAtual === "ex_fiel") return alertas.some(a => a.perfilId === 1);
        if (filtroAtual === "vegetariano") return alertas.some(a => a.perfilId === 2);
        if (filtroAtual === "fraldas") return alertas.some(a => a.perfilId === 3);
        if (filtroAtual === "vip") return alertas.some(a => a.perfilId === 4);
        if (filtroAtual === "com_risco") return alertas.length > 0;
        return true;
    });

    // Ordenação
    clientesFiltrados.sort((a, b) => {
        let valA = a[colunaOrdenacao];
        let valB = b[colunaOrdenacao];

        if (typeof valA === "string") {
            valA = valA.toLowerCase();
            valB = valB.toLowerCase();
            return direcaoOrdenacao === "asc" ? valA.localeCompare(valB) : valB.localeCompare(valA);
        }

        return direcaoOrdenacao === "asc" ? valA - valB : valB - valA;
    });

    // Atualizar setas visuais de ordenação
    const colunas = ["nome", "totalGastoMes", "diasSemComprar"];
    colunas.forEach(col => {
        const el = document.getElementById(`sort-${col}`);
        if (el) {
            if (colunaOrdenacao === col) {
                el.textContent = direcaoOrdenacao === "asc" ? "▲" : "▼";
                el.style.color = "var(--color-primary)";
            } else {
                el.textContent = "↕";
                el.style.color = "var(--color-text-muted)";
            }
        }
    });

    clientesFiltrados.forEach(c => {
        const alertas = classificarCliente(c);
        const tr = document.createElement("tr");
        tr.className = "client-row";
        if (clienteSelecionado && clienteSelecionado.id === c.id) {
            tr.classList.add("selected-row");
        }

        tr.onclick = () => abrirDetalhesCliente(c);

        // Tags do Perfil
        let tagHtml = `<span class="tag tag-ok">Regular</span>`;
        if (alertas.length > 0) {
            tagHtml = alertas.map(a => {
                let badgeClass = "tag-ok";
                if (a.perfilId === 1) badgeClass = "tag-danger";
                if (a.perfilId === 2) badgeClass = "tag-warning";
                if (a.perfilId === 3) badgeClass = "tag-info";
                if (a.perfilId === 4) badgeClass = "tag-success";
                return `<span class="tag ${badgeClass}">${a.perfilNome}</span>`;
            }).join(" ");
        }

        tr.innerHTML = `
            <td>
                <div class="client-name">${c.nome}</div>
                <div class="client-cpf">${c.cpf}</div>
            </td>
            <td class="text-right bold">R$ ${c.totalGastoMes.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
            <td class="text-center ${c.diasSemComprar >= 20 ? 'text-danger bold' : ''}">${c.diasSemComprar} dias</td>
            <td><div class="tags-container">${tagHtml}</div></td>
            <td>
                <button class="btn btn-sm btn-icon" onclick="event.stopPropagation(); dispararNotificacaoUnica(${c.id})" title="Disparar ofertas personalizadas">
                    Enviar
                </button>
            </td>
        `;
        listBody.appendChild(tr);
    });

    // Atualizar Contadores / KPIs
    atualizarKPIs();
}

function atualizarKPIs() {
    const kpiTotal = document.getElementById("kpi-total-clientes");
    const kpiExFiel = document.getElementById("kpi-ex-fiel");
    const kpiVegetariano = document.getElementById("kpi-vegetariano");
    const kpiFraldas = document.getElementById("kpi-fraldas");
    const kpiVips = document.getElementById("kpi-vips");

    let countExFiel = 0;
    let countVegetariano = 0;
    let countFraldas = 0;
    let countVips = 0;

    clientes.forEach(c => {
        const alertas = classificarCliente(c);
        alertas.forEach(a => {
            if (a.perfilId === 1) countExFiel++;
            if (a.perfilId === 2) countVegetariano++;
            if (a.perfilId === 3) countFraldas++;
            if (a.perfilId === 4) countVips++;
        });
    });

    kpiTotal.textContent = clientes.length;
    kpiExFiel.textContent = countExFiel;
    kpiVegetariano.textContent = countVegetariano;
    kpiFraldas.textContent = countFraldas;
    if (kpiVips) kpiVips.textContent = countVips;
}

// Função para disparar a ordenação por coluna
function ordenarPorCol(coluna) {
    if (colunaOrdenacao === coluna) {
        direcaoOrdenacao = direcaoOrdenacao === "asc" ? "desc" : "asc";
    } else {
        colunaOrdenacao = coluna;
        direcaoOrdenacao = "asc";
    }
    renderizarDashboard();
}

// Filtros rápidos
function setFiltro(tipo, elemento) {
    filtroAtual = tipo;
    document.querySelectorAll(".tab-btn").forEach(btn => btn.classList.remove("active"));
    elemento.classList.add("active");
    renderizarDashboard();
}

// 4. MOTOR DE SIMULAÇÃO DE NOTIFICAÇÃO (GATILHOS DO CRM)
const crmConsole = {
    log: function (mensagem, tipo = "info") {
        const consoleLogs = document.getElementById("console-logs");
        const logItem = document.createElement("div");
        logItem.className = `log-item log-${tipo}`;

        const timestamp = new Date().toLocaleTimeString('pt-BR');
        logItem.innerHTML = `<span class="log-time">[${timestamp}]</span> <span class="log-message">${mensagem}</span>`;

        consoleLogs.appendChild(logItem);
        consoleLogs.scrollTop = consoleLogs.scrollHeight;
    },
    clear: function () {
        document.getElementById("console-logs").innerHTML = `<div class="log-item log-info"><span class="log-time">[${new Date().toLocaleTimeString('pt-BR')}]</span> Terminal de Eventos do CRM pronto.</div>`;
    }
};

// Disparar gatilhos em lote para perfis específicos
function simularGatilhoLote(perfilId) {
    let nomePerfil = "";
    let contagem = 0;

    if (perfilId === 1) nomePerfil = "Ex-Fiel";
    if (perfilId === 2) nomePerfil = "Vegetariano";
    if (perfilId === 3) nomePerfil = "Infantil";
    if (perfilId === 4) nomePerfil = "Fiel";
    if (perfilId === 'todos') nomePerfil = "Todos";

    crmConsole.log(`Campanha iniciada: ${nomePerfil}`, "info");

    clientes.forEach((c) => {
        const alertas = classificarCliente(c);
        alertas.forEach((a) => {
            if (perfilId === 'todos' || a.perfilId === perfilId) {
                contagem++;
                const delayIndex = contagem;
                setTimeout(() => {
                    crmConsole.log(`Campanha ${a.perfilNome}: ${c.nome} - "${a.mensagem}"`, "success");
                    if (delayIndex <= 3) {
                        mostrarNotificacaoFlutuante(c.nome, a.mensagem);
                    }
                }, delayIndex * 150);
            }
        });
    });

    setTimeout(() => {
        if (contagem === 0) {
            crmConsole.log(`Campanha ${nomePerfil}: Nenhum cliente elegível.`, "warning");
        } else {
            crmConsole.log(`Campanha ${nomePerfil} concluída. Total: ${contagem} envios.`, "info");
        }
    }, (contagem + 1) * 150);
}

// Disparar uma notificação específica para um único cliente selecionado
function dispararNotificacaoUnica(clienteId) {
    const cliente = clientes.find(c => c.id === clienteId);
    if (!cliente) return;

    const alertas = classificarCliente(cliente);
    if (alertas.length === 0) {
        crmConsole.log(`${cliente.nome} sem gatilhos ativos.`, "warning");
        mostrarNotificacaoFlutuante(cliente.nome, "Nenhuma oferta ativa.", "warning");
        return;
    }

    alertas.forEach(a => {
        crmConsole.log(`Envio individual: ${cliente.nome} - "${a.mensagem}"`, "success");
        mostrarNotificacaoFlutuante(cliente.nome, a.mensagem);
    });
}

// UI: Notificação flutuante simulando o celular do cliente
function mostrarNotificacaoFlutuante(nome, mensagem, tipo = "default") {
    const container = document.getElementById("phone-simulation-container");
    const push = document.createElement("div");
    push.className = "phone-push";
    if (tipo === "warning") push.style.borderLeft = "4px solid var(--color-warning)";

    push.innerHTML = `
        <div class="push-header">
            <span class="push-app-title">Notificação CRM</span>
            <span class="push-time">agora</span>
        </div>
        <div class="push-body">
            <strong>${nome.split(" ")[0]}</strong>
            <p>${mensagem}</p>
        </div>
    `;

    container.appendChild(push);

    // Remove a notificação após 6 segundos
    setTimeout(() => {
        push.style.animation = "slideOut 0.4s forwards";
        setTimeout(() => push.remove(), 400);
    }, 6000);
}

// 5. DRAWER DE DETALHES DO CLIENTE
function abrirDetalhesCliente(cliente) {
    clienteSelecionado = cliente;

    // Destacar linha selecionada na tabela
    document.querySelectorAll(".client-row").forEach(tr => tr.classList.remove("selected-row"));
    renderizarDashboard(); // Recarrega para aplicar estilo de seleção

    const drawer = document.getElementById("details-drawer");
    const nameEl = document.getElementById("drawer-name");
    const cpfEl = document.getElementById("drawer-cpf");
    const spendEl = document.getElementById("drawer-spend");
    const daysEl = document.getElementById("drawer-days");
    const categoryEl = document.getElementById("drawer-category");
    const frequencyEl = document.getElementById("drawer-frequency");
    const rulesTriggeredEl = document.getElementById("drawer-rules-triggered");
    const actionContainerEl = document.getElementById("drawer-actions");

    nameEl.textContent = cliente.nome;
    cpfEl.textContent = `CPF: ${cliente.cpf}`;
    spendEl.textContent = `R$ ${cliente.totalGastoMes.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
    daysEl.textContent = `${cliente.diasSemComprar} dias`;
    categoryEl.textContent = cliente.categoriaMaisComprada;
    frequencyEl.textContent = `${cliente.quantidadeCompras} compras`;

    // Verificar regras ativas
    const alertas = classificarCliente(cliente);
    rulesTriggeredEl.innerHTML = "";
    actionContainerEl.innerHTML = "";

    if (alertas.length === 0) {
        rulesTriggeredEl.innerHTML = `
            <div class="rule-triggered-card no-rules">
                <strong>Perfil Saudável (Regular)</strong>
                <p>O cliente está frequentando a loja normalmente ou não se enquadra nos limites das ofertas automatizadas definidas.</p>
            </div>
        `;
        actionContainerEl.innerHTML = `
            <p style="color: var(--color-text-muted); font-size: 0.85rem; margin-bottom: 1rem;">Nenhuma regra condicional ativa para este cliente no momento.</p>
            <button class="btn btn-secondary w-full" disabled>Nenhum Gatilho para Disparar</button>
        `;
    } else {
        alertas.forEach(a => {
            let classBadge = "rule-tag-ok";
            if (a.perfilId === 1) classBadge = "rule-tag-danger";
            if (a.perfilId === 2) classBadge = "rule-tag-warning";
            if (a.perfilId === 3) classBadge = "rule-tag-info";
            if (a.perfilId === 4) classBadge = "rule-tag-success";

            let explanation = '';
            if (a.perfilId === 1) {
                explanation = 'Cliente de alto valor (gasto > R$ 800) inativo há 20 dias ou mais.';
            } else if (a.perfilId === 2) {
                explanation = 'Cliente com preferência vegetariana e inatividade de 20 dias ou mais.';
            } else if (a.perfilId === 3) {
                explanation = 'Cliente com preferência em produtos infantis/fraldas.';
            } else if (a.perfilId === 4) {
                explanation = 'Cliente Fiel: alto valor (gasto > R$ 800) e ativo (inatividade < 20 dias).';
            }

            rulesTriggeredEl.innerHTML += `
                <div class="rule-triggered-card">
                    <div class="rule-card-header">
                        <span class="rule-status-indicator ${classBadge}"></span>
                        <strong>Perfil: ${a.perfilNome}</strong>
                    </div>
                    <p class="rule-card-explanation">${explanation}</p>
                    <div class="rule-card-message">
                        <strong>Mensagem:</strong> "${a.mensagem}"
                    </div>
                </div>
            `;
        });

        actionContainerEl.innerHTML = `
            <button class="btn btn-primary w-full" onclick="dispararNotificacaoUnica(${cliente.id})">
                Enviar Ofertas
            </button>
        `;
    }

    drawer.classList.add("drawer-open");
}

function fecharDrawer() {
    const drawer = document.getElementById("details-drawer");
    drawer.classList.remove("drawer-open");
    clienteSelecionado = null;
    document.querySelectorAll(".client-row").forEach(tr => tr.classList.remove("selected-row"));
}

// 6. NAVEGAÇÃO POR ABAS PRINCIPAL
function alternarAba(aba, elemento) {
    // Alterna visibilidade das views
    document.getElementById("view-dashboard").classList.toggle("hidden-view", aba !== "dashboard");
    document.getElementById("view-analytics").classList.toggle("hidden-view", aba !== "analytics");

    // Atualiza estilos dos botões de nav
    document.querySelectorAll(".main-tab-btn").forEach(btn => btn.classList.remove("active"));
    elemento.classList.add("active");

    // Renderiza análises quando a aba é aberta pela primeira vez
    if (aba === "analytics") {
        renderizarAnaliticas();
    }
}

// 7. MÓDULO DE ANÁLISES E INSIGHTS
// Cores por categoria para consistência visual
const coresCategorias = {
    "Fraldas e Infantil":       { bg: "rgba(59,130,246,0.2)",  border: "var(--color-info)",    text: "#60a5fa" },
    "Vegetariano e Saudavel":   { bg: "rgba(16,185,129,0.2)",  border: "var(--color-success)", text: "#34d399" },
    "Vegetariano e Saudável":   { bg: "rgba(16,185,129,0.2)",  border: "var(--color-success)", text: "#34d399" },
    "Mercearia":                { bg: "rgba(245,158,11,0.2)",  border: "var(--color-warning)", text: "#fbbf24" },
    "Acougue e Peixaria":       { bg: "rgba(239,68,68,0.2)",   border: "var(--color-danger)",  text: "#f87171" },
    "Limgue e Peixaria":        { bg: "rgba(239,68,68,0.2)",   border: "var(--color-danger)",  text: "#f87171" },
    "Limpeza":                  { bg: "rgba(139,92,246,0.2)",  border: "#8b5cf6",              text: "#a78bfa" },
    "Bebidas e Cervejas":       { bg: "rgba(236,72,153,0.2)",  border: "#ec4899",              text: "#f472b6" },
    "Padaria":                  { bg: "rgba(234,179,8,0.2)",   border: "#eab308",              text: "#facc15" },
    "Hortifruti":               { bg: "rgba(34,197,94,0.2)",   border: "#22c55e",              text: "#4ade80" },
    "Feriados e Doces":         { bg: "rgba(249,115,22,0.2)",  border: "#f97316",              text: "#fb923c" },
};

function getCorCategoria(cat) {
    return coresCategorias[cat] || { bg: "rgba(156,163,175,0.2)", border: "#6b7280", text: "#9ca3af" };
}

// Nome normalizado para exibição (evita duplicatas de Vegetariano/Acougue)
function normalizarCategoria(cat) {
    if (cat === "Vegetariano e Saudável") return "Vegetariano e Saudavel";
    if (cat === "Limgue e Peixaria") return "Acougue e Peixaria";
    return cat;
}

// Agrega dados por categoria a partir do array global `clientes`
function calcularAnaliticas() {
    const mapa = {}; // { categoria: { clientes, totalReceita, totalCompras } }

    clientes.forEach(c => {
        const cat = normalizarCategoria(c.categoriaMaisComprada);
        if (!mapa[cat]) {
            mapa[cat] = { categoria: cat, totalClientes: 0, totalReceita: 0, totalCompras: 0 };
        }
        mapa[cat].totalClientes++;
        mapa[cat].totalReceita += c.totalGastoMes;
        mapa[cat].totalCompras += c.quantidadeCompras;
    });

    // Calcula ticket médio por categoria
    Object.values(mapa).forEach(cat => {
        cat.ticketMedio = cat.totalClientes > 0 ? cat.totalReceita / cat.totalClientes : 0;
        cat.mediaCompras = cat.totalClientes > 0 ? cat.totalCompras / cat.totalClientes : 0;
    });

    return Object.values(mapa);
}

// Calcula KPIs globais de análise
function calcularKPIsAnaliticos() {
    if (clientes.length === 0) return {};

    const totalGasto = clientes.reduce((s, c) => s + c.totalGastoMes, 0);
    const totalCompras = clientes.reduce((s, c) => s + c.quantidadeCompras, 0);
    const inativos = clientes.filter(c => c.diasSemComprar >= 20).length;
    const cats = calcularAnaliticas();
    const catCampea = cats.sort((a, b) => b.totalClientes - a.totalClientes)[0];
    const catFraca = [...cats].sort((a, b) => a.totalClientes - b.totalClientes)[0];

    return {
        totalGasto: totalGasto,
        totalCompras: totalCompras,
        clientesAtivos: clientes.length - inativos,
        ticketMedio: totalGasto / clientes.length,
        mediaCompras: totalCompras / clientes.length,
        pctInativos: (inativos / clientes.length) * 100,
        catCampea: catCampea ? catCampea.categoria : "—",
        catFraca: catFraca ? catFraca.categoria : "—",
    };
}

// Estado do ranking atual
let rankOrdem = "clientes";

// Renderiza a aba de análises completa
function renderizarAnaliticas() {
    const kpis = calcularKPIsAnaliticos();
    if (!kpis.ticketMedio) return;

    // KPIs analíticos
    document.getElementById("an-faturamento-total").textContent =
        `R$ ${kpis.totalGasto.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    document.getElementById("an-total-compras").textContent =
        kpis.totalCompras.toLocaleString("pt-BR");
    document.getElementById("an-ticket-medio").textContent =
        `R$ ${kpis.ticketMedio.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    document.getElementById("an-media-compras").textContent =
        kpis.mediaCompras.toFixed(1);
    document.getElementById("an-clientes-ativos").textContent =
        kpis.clientesAtivos.toLocaleString("pt-BR");
    document.getElementById("an-pct-inativos").textContent =
        `${kpis.pctInativos.toFixed(1)}%`;

    // Abreviar nome da categoria para o KPI card
    const abreviar = (str) => str.length > 18 ? str.slice(0, 17) + "…" : str;
    document.getElementById("an-cat-campea").textContent = abreviar(kpis.catCampea);
    document.getElementById("an-cat-fraca").textContent = abreviar(kpis.catFraca);

    // Renderiza os gráficos
    renderizarRanking(rankOrdem);
    renderizarGraficoPerfis();
    renderizarGraficoReceita();
    renderizarGraficoFrequencia();
}

// === BLOCO 1: Ranking de Categorias ===
function renderizarRanking(ordem, btnEl) {
    rankOrdem = ordem;

    // Atualiza botões de ordenação
    if (btnEl) {
        document.querySelectorAll(".rank-sort-btn").forEach(b => b.classList.remove("active"));
        btnEl.classList.add("active");
    }

    const cats = calcularAnaliticas();
    let sorted;
    if (ordem === "clientes") sorted = cats.sort((a, b) => b.totalClientes - a.totalClientes);
    else if (ordem === "receita") sorted = cats.sort((a, b) => b.totalReceita - a.totalReceita);
    else sorted = cats.sort((a, b) => b.ticketMedio - a.ticketMedio);

    const maxVal = sorted[0] ?
        (ordem === "clientes" ? sorted[0].totalClientes :
         ordem === "receita" ? sorted[0].totalReceita : sorted[0].ticketMedio) : 1;

    const container = document.getElementById("ranking-categorias");
    container.innerHTML = "";

    sorted.forEach((cat, idx) => {
        const cor = getCorCategoria(cat.categoria);
        const val = ordem === "clientes" ? cat.totalClientes :
                    ordem === "receita" ? cat.totalReceita : cat.ticketMedio;
        const valLabel = ordem === "clientes"
            ? `${cat.totalClientes} clientes`
            : `R$ ${val.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        const pct = (val / maxVal) * 100;

        let medalha = "";
        if (idx === 0) medalha = `<span class="rank-medal gold">🏆 1º</span>`;
        else if (idx === 1) medalha = `<span class="rank-medal silver">🥈 2º</span>`;
        else if (idx === 2) medalha = `<span class="rank-medal bronze">🥉 3º</span>`;
        else if (idx === sorted.length - 1) medalha = `<span class="rank-medal last">⚠️ ${idx + 1}º</span>`;
        else medalha = `<span class="rank-medal neutral">${idx + 1}º</span>`;

        container.innerHTML += `
            <div class="rank-row">
                <div class="rank-label">
                    ${medalha}
                    <span class="rank-cat-name" style="color: ${cor.text}">${cat.categoria}</span>
                    <span class="rank-val-label">${valLabel}</span>
                </div>
                <div class="rank-bar-track">
                    <div class="rank-bar-fill"
                         style="width: 0%; background: ${cor.border}; border-radius: 4px;"
                         data-target="${pct.toFixed(1)}">
                    </div>
                </div>
            </div>
        `;
    });

    // Anima as barras após inserção no DOM
    requestAnimationFrame(() => {
        container.querySelectorAll(".rank-bar-fill").forEach(bar => {
            bar.style.transition = "width 0.7s cubic-bezier(0.4,0,0.2,1)";
            bar.style.width = bar.dataset.target + "%";
        });
    });
}

// === BLOCO 2: Distribuição de Perfis CRM ===
function renderizarGraficoPerfis() {
    let countExFiel = 0, countVeg = 0, countFraldas = 0, countVip = 0, countRegular = 0;
    clientes.forEach(c => {
        const alertas = classificarCliente(c);
        if (alertas.length === 0) { countRegular++; return; }
        alertas.forEach(a => {
            if (a.perfilId === 1) countExFiel++;
            if (a.perfilId === 2) countVeg++;
            if (a.perfilId === 3) countFraldas++;
            if (a.perfilId === 4) countVip++;
        });
    });

    const total = clientes.length || 1;
    const perfis = [
        { label: "Ex-Fiel (Churn)",         count: countExFiel,  color: "var(--color-danger)",  icon: "🔴" },
        { label: "Vegetariano (Cross-sell)", count: countVeg,     color: "var(--color-warning)", icon: "🟡" },
        { label: "Bebê / Infantil",          count: countFraldas, color: "var(--color-info)",    icon: "🔵" },
        { label: "Fiel (Ativo)",              count: countVip,     color: "var(--color-success)", icon: "🟢" },
        { label: "Regular (Sem Gatilho)",    count: countRegular, color: "#6b7280",              icon: "⚪" },
    ];
    const maxCount = Math.max(...perfis.map(p => p.count), 1);

    const container = document.getElementById("grafico-perfis");
    container.innerHTML = "";

    perfis.forEach(p => {
        const pct = ((p.count / total) * 100).toFixed(1);
        const barPct = ((p.count / maxCount) * 100).toFixed(1);
        container.innerHTML += `
            <div class="perfil-bar-row">
                <div class="perfil-bar-label">
                    <span>${p.icon} ${p.label}</span>
                    <span class="perfil-bar-count">${p.count} <span class="perfil-pct">(${pct}%)</span></span>
                </div>
                <div class="rank-bar-track">
                    <div class="rank-bar-fill"
                         style="width: 0%; background: ${p.color}; border-radius: 4px;"
                         data-target="${barPct}">
                    </div>
                </div>
            </div>
        `;
    });

    requestAnimationFrame(() => {
        container.querySelectorAll(".rank-bar-fill").forEach(bar => {
            bar.style.transition = "width 0.7s cubic-bezier(0.4,0,0.2,1)";
            bar.style.width = bar.dataset.target + "%";
        });
    });
}

// === BLOCO 3: Receita por Categoria (barras verticais) ===
function renderizarGraficoReceita() {
    const cats = calcularAnaliticas().sort((a, b) => b.totalReceita - a.totalReceita);
    const maxReceita = cats[0] ? cats[0].totalReceita : 1;

    const container = document.getElementById("grafico-receita-categoria");
    container.innerHTML = `<div class="bar-chart-vertical" id="bar-chart-inner"></div>`;
    const chart = document.getElementById("bar-chart-inner");

    cats.forEach(cat => {
        const cor = getCorCategoria(cat.categoria);
        const pct = (cat.totalReceita / maxReceita) * 100;
        const label = cat.categoria.split(" ")[0]; // Primeira palavra como rótulo
        const valStr = `R$ ${(cat.totalReceita / 1000).toFixed(1)}k`;

        chart.innerHTML += `
            <div class="vert-bar-item">
                <span class="vert-bar-value">${valStr}</span>
                <div class="vert-bar-track">
                    <div class="vert-bar-fill"
                         style="height: 0%; background: linear-gradient(to top, ${cor.border}, ${cor.text});"
                         data-target="${pct.toFixed(1)}">
                    </div>
                </div>
                <span class="vert-bar-label" style="color: ${cor.text}" title="${cat.categoria}">${label}</span>
            </div>
        `;
    });

    requestAnimationFrame(() => {
        chart.querySelectorAll(".vert-bar-fill").forEach(bar => {
            bar.style.transition = "height 0.8s cubic-bezier(0.4,0,0.2,1)";
            bar.style.height = bar.dataset.target + "%";
        });
    });
}

// === BLOCO 4: Frequência média de compras por categoria ===
function renderizarGraficoFrequencia() {
    const cats = calcularAnaliticas().sort((a, b) => b.mediaCompras - a.mediaCompras);
    const maxFreq = cats[0] ? cats[0].mediaCompras : 1;

    const container = document.getElementById("grafico-frequencia");
    container.innerHTML = "";

    cats.forEach(cat => {
        const cor = getCorCategoria(cat.categoria);
        const pct = ((cat.mediaCompras / maxFreq) * 100).toFixed(1);

        container.innerHTML += `
            <div class="rank-row">
                <div class="rank-label">
                    <span class="rank-cat-name" style="color: ${cor.text}">${cat.categoria}</span>
                    <span class="rank-val-label">${cat.mediaCompras.toFixed(1)} compras/mês</span>
                </div>
                <div class="rank-bar-track">
                    <div class="rank-bar-fill"
                         style="width: 0%; background: ${cor.border}; border-radius: 4px;"
                         data-target="${pct}">
                    </div>
                </div>
            </div>
        `;
    });

    requestAnimationFrame(() => {
        container.querySelectorAll(".rank-bar-fill").forEach(bar => {
            bar.style.transition = "width 0.7s cubic-bezier(0.4,0,0.2,1)";
            bar.style.width = bar.dataset.target + "%";
        });
    });
}

// 8. INICIALIZAÇÃO E AÇÕES
window.addEventListener("DOMContentLoaded", () => {
    // Inicializa os clientes fictícios
    inicializarClientes();

    // Configura eventos de escuta
    document.getElementById("search-input").addEventListener("input", (e) => {
        buscaAtual = e.target.value;
        renderizarDashboard();
    });

    // Inicializa a tabela
    renderizarDashboard();
    crmConsole.clear();
});
