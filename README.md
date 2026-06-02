# CRM SuperDev - O Supermercado Preditivo 🛒

Este é um protótipo funcional de **CRM Automatizado** desenvolvido como recurso didático para turmas de **Análise e Desenvolvimento de Sistemas (ADS)** e **Administração (ADM)**. O sistema simula a coleta de dados de compras de um supermercado através de CPF na nota e o disparo automatizado de ofertas personalizadas (Push Notifications).

---

## 📌 Cenário de Negócio

O supermercado **SuperDev** lançou seu aplicativo de fidelidade. A partir do histórico de transações de **100 clientes cadastrados** no arquivo CSV fornecido, o sistema avalia o comportamento de compra e ativa gatilhos personalizados baseados em condicionais lógicas.

O protótipo atende a **3 perfis em risco ou com potencial de venda**:
1. **O "Ex-Fiel" (Risco de Churn):** Clientes recorrentes de alto ticket que sumiram há mais de 20 dias.
2. **O "Vegetariano Incompleto" (Cross-Selling):** Clientes com hábitos de compra saudáveis que não consomem produtos básicos (como higiene/limpeza) na loja.
3. **O "Cliente de Hábitos Previsíveis" (Reposição/Sazonalidade):** Pais que compram fraldas e fórmulas infantis regularmente e precisam de lembretes preventivos.

---

## ⚙️ Arquitetura do Sistema e Estrutura de Arquivos

O projeto foi construído utilizando tecnologias web puras para facilitar a execução local instantânea (sem necessidade de compilação ou banco de dados externo):

*   **[clientes_supermercado.csv](file:///c:/Users/erisv/Desktop/Faculdade/GTI/clientes_supermercado.csv)**: Base de dados com 100 clientes contendo informações de CPF, histórico de gasto, dias de inatividade, categoria preferida e frequência de compras.
*   **[index.html](file:///c:/Users/erisv/Desktop/Faculdade/GTI/index.html)**: Scaffolding visual contendo o Dashboard administrativo, console de eventos, KPIs e Sandbox.
*   **[styles.css](file:///c:/Users/erisv/Desktop/Faculdade/GTI/styles.css)**: Estilos baseados no conceito *Dark Premium* com variáveis HSL, glassmorphism e micro-animações.
*   **[app.js](file:///c:/Users/erisv/Desktop/Faculdade/GTI/app.js)**: Lógica Javascript que tenta carregar o arquivo CSV dinamicamente (com fallback embutido offline) e executa as regras do motor de regras.

---

## 🧠 Tradução Lógica: Da Regra de Negócio ao Código (ADS)

Para auxiliar os alunos, a tabela abaixo demonstra como as regras lógicas condicionais (`IF-THEN`) foram implementadas no motor de regras em Javascript:

### 1. Perfil 1 (Ex-Fiel)
*   **Lógica de Negócio (ADM):** *SE o gasto mensal for superior a R$ 800 E o cliente estiver há 20 dias ou mais sem passar o CPF.*
*   **Implementação em JS (ADS):**
    ```javascript
    if (cliente.totalGastoMes > 800 && cliente.diasSemComprar >= 20) {
        // Disparar cupom de 15% de desconto no produto favorito
    }
    ```

### 2. Perfil 2 (Vegetariano)
*   **Lógica de Negócio (ADM):** *SE a categoria mais comprada for "Vegetariano e Saudavel" E o cliente estiver há 20 dias ou mais inativo.*
*   **Implementação em JS (ADS):**
    ```javascript
    if (cliente.categoriaMaisComprada === "Vegetariano e Saudavel" && cliente.diasSemComprar >= 20) {
        // Disparar 10% OFF em itens de Higiene Eco-friendly
    }
    ```

### 3. Perfil 3 (Pai / Reposição Bebê)
*   **Lógica de Negócio (ADM):** *SE a categoria principal for "Fraldas e Infantil".*
*   **Implementação em JS (ADS):**
    ```javascript
    if (cliente.categoriaMaisComprada === "Fraldas e Infantil") {
        // Disparar push de 12% OFF lembrando que o estoque de fraldas está acabando
    }
    ```

---

## 🚀 Como Executar e Testar

1. Baixe ou clone a pasta com os três arquivos no seu computador.
2. Dê um duplo clique sobre o arquivo **`index.html`** para abrir o dashboard diretamente em qualquer navegador moderno.
3. **Explorando as Funcionalidades:**
    *   **Filtros Rápidos**: Use os botões acima da tabela para filtrar apenas clientes de determinado perfil.
    *   **Simulador de Campanhas**: Clique em qualquer um dos botões do painel direito para rodar as regras lógicas e ver os envios acontecerem em tempo real no console simulado.
    *   **Simulador Sandbox**: Altere o gasto, os dias sem comprar ou a categoria na sandbox interativa e veja instantaneamente qual condicional foi ativada.
    *   **Histórico de Compras**: Clique em qualquer cliente na tabela para abrir o *Drawer* com seu histórico detalhado e o motivo daquele cliente ter ativado a respectiva regra.
