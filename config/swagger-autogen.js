const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'VetCare API',
        version: '1.0.0',
        description: 'API RESTful para gerenciamento de atendimentos veterinários com autenticação JWT',
    },
    host: 'localhost:3000',
    schemes: ['http'],
    securityDefinitions: {
        BearerAuth: {
            type: 'apiKey',
            name: 'Authorization',
            in: 'header',
            description: 'Informe o token JWT no formato: Bearer <token>'
        }
    },
    // security: [{ BearerAuth: [] }],
    definitions: {
        Usuario: {
            id: 1,
            nome: 'João Silva',
            usuario: 'joao.silva',
            perfil: 'recepcao'
        },
        NovoUsuario: {
            nome: 'João Silva',
            usuario: 'joao.silva',
            senha: 'senha123',
            perfil: 'recepcao'
        },
        Login: {
            usuario: 'joao.silva',
            senha: 'senha123'
        },
        LoginResposta: {
            token: 'eyJhbGciOiJIUzI1NiIs...',
            usuario: {
                id: 1,
                nome: 'João Silva',
                usuario: 'joao.silva',
                perfil: 'recepcao'
            }
        },
        Pet: {
            id: 1,
            nome: 'Rex',
            especie: 'cachorro',
            criada_em: '2026-06-14T10:00:00.000Z',
            atualizada_em: '2026-06-14T10:00:00.000Z'
        },
        Atendimento: {
            id: 1,
            data_hora: '2026-06-15T14:30:00.000Z',
            motivo: 'Consulta de rotina',
            status: 'agendado',
            pet_id: 1,
            usuario_id: 1,
            criada_em: '2026-06-14T10:00:00.000Z',
            atualizada_em: '2026-06-14T10:00:00.000Z',
            Pet: {
                id: 1,
                nome: 'Rex',
                especie: 'cachorro'
            }
        },
        AtendimentoCompleto: {
            id: 1,
            data_hora: '2026-06-15T14:30:00.000Z',
            motivo: 'Consulta de rotina',
            status: 'agendado',
            pet_id: 1,
            usuario_id: 1,
            criada_em: '2026-06-14T10:00:00.000Z',
            atualizada_em: '2026-06-14T10:00:00.000Z',
            Pet: {
                id: 1,
                nome: 'Rex',
                especie: 'cachorro'
            }
        },
        NovoAtendimento: {
            data_hora: '2026-06-15T14:30:00.000Z',
            motivo: 'Consulta de rotina',
            pet_id: 1,
            usuario_id: 1
        }
    }
};

const arquivo_saida = './config/swagger_output.json';
const arquivo_rotas = ['./app.js'];

swaggerAutogen(arquivo_saida, arquivo_rotas, doc);