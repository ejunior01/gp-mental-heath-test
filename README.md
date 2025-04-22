# Sistema de Aferição de Notas - Teste Técnico Fullstack Junior

Repositório do projeto desenvolvido como parte do Teste Técnico para a vaga de Desenvolvedor Fullstack Junior. Este projeto tem como objetivo otimizar o processo de aferição de notas de pesquisas, automatizando o cálculo, armazenamento e consulta de dados, além de garantir segurança e acessibilidade.

## 🚀 Descrição do Projeto

O sistema foi projetado para resolver os seguintes problemas identificados no processo de aferição de notas da equipe de consultoria da GPTW:

- Processamento manual das notas: Demorado e suscetível a erros.
- Dificuldade de acesso às notas: Falta de uma plataforma centralizada para consulta.
- Segurança dos documentos: Armazenamento no OneDrive sem controle adequado de acesso.

**A solução proposta consiste em um fluxo automatizado com as seguintes etapas:**

- [x] Recepção da Planilha: Upload de planilhas geradas pelo sistema de pesquisa.
- [x] Processamento dos Dados: Cálculo automatizado das notas com base nos dados fornecidos.
- [x] Armazenamento no Banco de Dados: Persistência estruturada das notas processadas.
- [x] Disponibilização em Sistema Web: Interface web para consulta centralizada das notas.

🛠️ Tecnologias Utilizadas

- Backend: Node.js (Nest.js) para criação de uma API RESTful.
- Frontend: React.js para interfaces responsivas e acessíveis.
- Processamento de Dados: Python (Pandas) para manipulação de arquivos CSV.
- Banco de Dados: PostgreSQL para persistência de dados.
- Docker para conteinerização das aplicações.
- Documentação: Swagger para documentação das APIs.

## 📋 Funcionalidades

Backend (Node.js - Nest.js)

- API RESTful com operações CRUD (Create, Read, Update, Delete).
- Integração com PostgreSQL para manipulação de dados.

Frontend (React.js)

- Página para upload de planilhas CSV e acompanhamento dos uploads.
- Página para visualização dos resultados das pesquisas.

Serviço de Processamento (Python)

- Leitura e manipulação de arquivos CSV usando Pandas.
- Cálculo da nota da pesquisa: Nota da pesquisa = (nota 1 + nota 2) / 2.
- Adição de uma coluna com a nota aferida no arquivo CSV.

Documentação

- APIs documentadas com Swagger.

📂 Estrutura do Repositório

```

├── backend/     # Código do serviço backend (Node.js - Nest.js)
├── frontend/    # Código do frontend (React.js)
├── worker/      # Serviço de processamento de dados (Python)
├── docker/      # Configurações do docker
└── README.md 
```


## ⚙️ Clonando e Executando o Código

**Pré-requisitos**

- Node.js (v16 ou superior)
- Python (v3.12.8 ou superior)
- PostgreSQL
- Conta AWS configurada (para S3)
- Docker Desktop ou Docker engine

Para clonar e executar o projeto localmente, siga as etapas abaixo:

1. Abra o terminal de sua escolha e navegue até o diretório onde deseja clonar o projeto.

2. Execute o seguinte comando para clonar o repositório:
`
git clone https://github.com/ejunior01/gptw-mental-health-test.git
`
3. Acesse o diretório do projeto:
`cd gptw-mental-health-test`

4. Configure as variáveis de ambiente no arquivo **.env** dentro da pasta: **./docker**. No arquivo **.env.example** possui os exemplos das variáveis necessárias para rodar a aplicação.

5. Execute o docker compose para criar as imagens da aplicação e subir os container.
`
docker-compose -f ./docker/docker-compose.yml up -d
`
6. O frontend estará disponível em seu navegador no seguinte endereço: <http://localhost:3000>

7. A documentação das API estará disponível no seguinte endereço: <http://localhost:30001/api-docs>

## Próximos Passos

Para os próximos serão implementadas as funcionadlidades abaixo:

- [ ] Implementação de autenticação e controle de acesso.
- [ ] Suporte a múltiplos formatos de planilha (além de CSV).
- [ ] Relatórios avançados com gráficos e filtros.
- [ ] Integração com CI/CD para deploy automatizado.
- [ ] Armazenamento Seguro na AWS: Salvamento seguro das planilhas no Amazon S3.
