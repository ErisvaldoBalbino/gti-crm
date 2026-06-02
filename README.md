# **CRM: O Supermercado Preditivo**

* **Público:** Alunos de ADS (divididos em grupos de 3 a 5 integrantes).  
* **Papel do Professor:** Diretor(a) de Operações e Marketing do Supermercado (O "Cliente" de Negócios).  
* **O Cenário de Negócio:**  
  *"Nossa rede de supermercados, o **SuperDev**, acabou de lançar um aplicativo de fidelidade onde o cliente digita o CPF no caixa. Nós já estamos coletando os dados de todas as compras. Agora, o Diretor de Marketing (você) precisa que as equipes de TI criem um **Módulo de CRM Automatizado**. O sistema deve analisar os dados do histórico de compras (inputs) e disparar ofertas ou alertas personalizados (outputs) para aumentar as vendas e evitar que o cliente vá comprar no concorrente."*

## **AULA 1: O Desenho Lógico (Criação) — 50 min**

Nesta aula, os alunos vão atuar como analistas de sistemas desenhando a lógica do CRM. Eles devem criar regras baseadas na estrutura condicional que adoram: SE o banco de dados detectar o comportamento X → ENTÃO o sistema dispara a ação Y.

Cada grupo deve resolver o desafio para **3 perfis de clientes em risco ou com potencial de compra**:

### **Os 3 Perfis para os Alunos Resolverem:**

* **Perfil 1: O "Ex-Fiel" (Risco de Churn):** Um cliente que, nos últimos 6 meses, gastava R$ 800,00 todo mês no supermercado (frequentador assíduo). Porém, nos últimos 20 dias, ele não passou o CPF nenhuma vez no caixa.  
* **Perfil 2: O "Vegetariano Incompleto" (Venda Cruzada / Cross-Selling):** O cliente que compra toda semana produtos caros como leite de amêndoas, tofu, hambúrguer vegetal e saladas, mas *nunca* compra itens de higiene, limpeza ou mercearia básica no seu supermercado (ele provavelmente compra o básico no concorrente mais barato).  
* **Perfil 3: O "Cliente de Hábitos Previsíveis" (Sazonalidade e Reposição):** O cliente que compra exatamente as mesmas duas marcas de fraldas infantis e fórmula de leite em pó a cada 15 dias, indicando que tem um bebê em casa.

### **O que os grupos devem produzir na Aula 1?**

Eles devem rascunhar (em papel, slides ou quadro) um mapa lógico contendo:

1. **Gatilho de Dados (Input):** O que o sistema precisa monitorar no histórico do CPF do cliente para ativar o alerta?  
2. **Ação de Relacionamento (Output do CRM):** Que notificação no app, cupom de desconto ou e-mail personalizado o sistema vai gerar para esse cliente específico?

**Exemplo**

| Perfil | Lógica do Aluno (ADS) | Visão de Negócio (ADM) |
| :---- | :---- | :---- |
| **Perfil 1 (Ex-Fiel)** | SE Total\_Gasto\_Mes \> 800 E dias\_sem\_comprar \>= 20 | Disparar notificação push: *"Faz tempo que não te vemos\! Que tal levar o seu café favorito \[Nome do Café que ele mais comprava\] com 15% de desconto hoje?"* |

## **O Desafio Técnico: Desenvolver o Protótipo do CRM**

Você vai propor o seguinte complemento para os grupos:

*"Agora que a regra de negócio do nosso supermercado está aprovada, vocês têm a missão de desenvolver um protótipo funcional de aplicativo para este CRM. O sistema precisa ter uma base inicial de **100 clientes cadastrados** e simular o disparo dos gatilhos automatizados que vocês planejaram."*

### **O que o App dos alunos precisa ter (Requisitos do Sistema):**

1. **Módulo de Carga de Dados:** Uma tabela ou banco de dados populado com 100 clientes fictícios (variando entre os perfis: clientes fiéis, sumidos, compradores de fraldas, etc.).  
2. **Painel do Administrador (Dashboard do Supermercado):** Uma tela onde o gerente do supermercado consegue ver a lista desses clientes e o "status de risco" de cada um (ex: Vermelho para o *Ex-Fiel*, Amarelo para o *Vegetariano Incompleto*).  
3. **Simulador de Gatilho (A Automação):** Um botão ou função no app que, ao ser clicado, simula a regra lógica criada pelo grupo (ex: *“Disparar Cupom para Sumidos”*). O app deve mostrar na tela qual mensagem personalizada o cliente X receberia.

## **O que você vai ser avaliado nessa entrega?**

Não vai avaliar a beleza do código ou a sintaxe da programação. A avaliação continuará sendo gerencial e analítica:

* **Aderência às Regras:** O app realmente consegue identificar quem são os clientes sumidos dentre os 100 cadastrados?  
* **Personalização:** Quando o aplicativo simula o disparo de uma oferta para o "Cliente do Perfil Bebê", a oferta gerada faz sentido com o histórico dele que está na tabela?  
* **Usabilidade:** O painel é claro? Um gerente de supermercado (uma pessoa de negócios) conseguiria usar essa tela para tomar decisões?