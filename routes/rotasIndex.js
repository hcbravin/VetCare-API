var express = require('express');
var router = express.Router();
const controllerIndex = require('../controllers/controllerIndex');

/* GET home page. */
router.get('/',
  /* #swagger.tags = ['Index']
     #swagger.summary = 'Informações sobre a API VetCare'
     #swagger.description = 'Retorna dados gerais do serviço como nome, versão, status e link para documentação'
     #swagger.responses[200] = {
       description: 'Informações obtidas com sucesso',
       schema: {
         nome: 'VetCare API',
         descricao: 'API RESTful para gerenciamento de atendimentos veterinários',
         versao: '1.0.0',
         tecnologias: ['Node.js', 'Express', 'Sequelize', 'MySQL', 'JWT'],
         status: 'online',
         timestamp: '2026-06-14 14:30:00',
         documentacao: '/api-docs'
       }
     }
  */
  controllerIndex.index
);

module.exports = router;