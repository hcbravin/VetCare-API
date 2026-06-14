const { Pet } = require('../models/models');

// Cadastro de Pet (apenas admin)
exports.cadastrar = async function (req, res) {
    const { nome, especie } = req.body;

    const errors = [];
    if (!nome || nome.trim() === '') errors.push({ msg: 'Nome do pet é obrigatório' });
    if (!especie || especie.trim() === '') errors.push({ msg: 'Espécie é obrigatória' });
    if (errors.length > 0) return res.status(400).json({ errors });

    try {
        const novoPet = await Pet.create({ nome, especie });
        return res.status(201).json(novoPet);
    } catch (error) {
        console.error('Erro ao cadastrar pet:', error);
        return res.status(500).json({ error: 'Erro ao cadastrar pet' });
    }
};

// Listagem de Pets (apenas recepcao) - com filtro por espécie
exports.listar = async function (req, res) {
    try {
        let where = {};
        if (req.query.especie) {
            where = { especie: req.query.especie };
        }

        const pets = await Pet.findAll({ where, order: [['nome', 'ASC']] });

        // Cache: public + max-age 6 meses + no-cache (pergunta ao servidor)
        res.set('Cache-Control', 'public, max-age=15552000, no-cache');
        return res.json(pets);
    } catch (error) {
        console.error('Erro ao listar pets:', error);
        return res.status(500).json({ error: 'Erro ao listar pets' });
    }
};