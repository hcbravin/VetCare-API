# 🐾 VetCare API

API RESTful para gerenciamento de atendimentos veterinários. Desenvolvida como avaliação prática da disciplina Desenvolvimento Back-end II.

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Pré-requisitos](#pré-requisitos)
- [Instalação e Configuração](#instalação-e-configuração)
- [Configuração do Banco de Dados](#configuração-do-banco-de-dados)
- [Variáveis de Ambiente](#variáveis-de-ambiente)
- [Executando o Projeto](#executando-o-projeto)
- [Endpoints da API](#endpoints-da-api)
  - [Informações do Serviço](#informações-do-serviço)
  - [Usuários](#usuários)
  - [Pets](#pets)
  - [Atendimentos](#atendimentos)
- [Autenticação e Autorização](#autenticação-e-autorização)
- [Cache HTTP](#cache-http)
- [Segurança](#segurança)
- [Documentação Swagger](#documentação-swagger)
- [Testes](#testes)
- [Implantaçao](#implantação)
- [Autor](#autor)

---

## Sobre o Projeto

A **VetCare API** é um serviço web desenvolvido para gerenciar o fluxo de atendimentos de uma clínica veterinária. O sistema permite:

- Cadastro e autenticação de usuários com diferentes perfis (admin, recepção, veterinário)
- Gerenciamento de pets
- Agendamento, consulta e acompanhamento de atendimentos veterinários
- Controle de status dos atendimentos (agendado, em_atendimento, finalizado, cancelado)

A API segue os princípios RESTful e implementa recursos avançados de segurança, cache HTTP e documentação interativa.

---

## Tecnologias Utilizadas

| Tecnologia | Descrição |
|------------|-----------|
| **Node.js** | Ambiente de execução JavaScript |
| **Express** | Framework web para Node.js |
| **Sequelize** | ORM para modelagem de dados |
| **MySQL** | Banco de dados relacional |
| **JWT** | JSON Web Token para autenticação |
| **Passport** | Middleware de autenticação |
| **Bcrypt** | Hashing de senhas |
| **Helmet** | Segurança de cabeçalhos HTTP |
| **Swagger** | Documentação interativa da API |
| **dotenv** | Gerenciamento de variáveis de ambiente |

---

## Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

- [Node.js](https://nodejs.org/) (versão 14 ou superior)
- [MySQL](https://www.mysql.com/) (versão 8 ou superior)
- [Git](https://git-scm.com/) (opcional, para clonar o repositório)
- [Boomerang](https://chrome.google.com/webstore/detail/boomerang-soap-rest-client) ou [Postman](https://www.postman.com/) (para testes)

---

## Demonstração

Sistema demonstrativo disponível em https://ifmg-backendii-vetcare.alwaysdata.net/api-docs (Acesso em 14/06/2026)