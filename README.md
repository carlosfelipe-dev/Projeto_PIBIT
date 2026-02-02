# Sistema de Avaliação de Riscos e Indicadores (Django)

Este projeto consiste em um **sistema web de questionários inteligentes com lógica condicional**, voltado para a **avaliação de riscos, geração de indicadores e relatórios**, atendendo diferentes perfis de usuários: **operários, gestores, pesquisadores e administradores**.

O sistema foi projetado para coletar dados de forma guiada, analisar respostas individualmente e apresentar resultados agregados por meio de gráficos e relatórios estratégicos.

---

##  Objetivo do Projeto

- Aplicar questionários com **lógica condicional** baseado em instrumentos validadeos como o Copenhagen Psychosocial Questionnaire (COPSOQ) e o Job Content Questionnaire (JCQ)
- Identificar **níveis de risco individuais**
- Gerar **indicadores agregados** para tomada de decisão
- Fornecer **relatórios analíticos** para gestores e pesquisadores
- Centralizar a **gestão do sistema** em um painel administrativo

---

## 🧩 Perfis de Usuário

O sistema é dividido em **quatro perfis**, cada um com funcionalidades específicas:

###  Operário
- Responde ao questionário
- Visualiza **resultado individual simples**
- Interface direta e objetiva

###  Gestor
- Visualiza **indicadores agregados**
- Acesso a **gráficos e relatórios**
- Foco em análise gerencial e tomada de decisão

###  Pesquisador
- Acesso a **dados agregados e relatórios**
- Visualização analítica dos resultados
- Foco em estudos e análises estatísticas

###  Administrador
- Gestão de usuários
- Configuração do sistema
- Gerenciamento de questionários e regras de lógica

---

##  Fluxo Geral do Sistema

```text
Tela de Login (opcional)
        ↓
Página Inicial (Dashboard por Perfil)
        ↓
Questionário Inteligente
        ↓
Resultado Individual
        ↓
Gráficos e Indicadores
        ↓
Avaliação e Relatórios


 
