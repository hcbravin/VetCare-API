const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Usuario } = require('../models/models');
const { JWT_SECRET } = require('../config/passport');

// Cadastro de usuário
exports.cadastro = async function (req, res) {
    const { nome, usuario, senha, perfil } = req.body;

    const errors = [];
    if (!nome || nome.trim() === '') errors.push({ msg: 'Nome é obrigatório' });
    if (!usuario || usuario.trim() === '') errors.push({ msg: 'Usuário é obrigatório' });
    if (!senha || senha.length < 6) errors.push({ msg: 'Senha deve ter no mínimo 6 caracteres' });
    if (errors.length > 0) return res.status(400).json({ errors });

    try {
        const usuarioExistente = await Usuario.findOne({ where: { usuario } });
        if (usuarioExistente) {
            return res.status(400).json({ errors: [{ msg: 'Usuário já cadastrado' }] });
        }

        const senha_hash = await bcrypt.hash(senha, 10);
        const novoUsuario = await Usuario.create({
            nome,
            usuario,
            senha_hash,
            perfil: perfil || 'recepcao'
        });

        return res.status(201).json({
            id: novoUsuario.id,
            nome: novoUsuario.nome,
            usuario: novoUsuario.usuario,
            perfil: novoUsuario.perfil
        });
    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        return res.status(500).json({ error: 'Erro ao cadastrar usuário' });
    }
};

// Login
exports.login = async function (req, res) {
    const { usuario, senha } = req.body;

    if (!usuario || !senha) {
        return res.status(400).json({ errors: [{ msg: 'Usuário e senha são obrigatórios' }] });
    }

    try {
        const usuarioEncontrado = await Usuario.findOne({ where: { usuario } });
        if (!usuarioEncontrado) {
            return res.status(401).json({ errors: [{ msg: 'Usuário ou senha inválidos' }] });
        }

        const senhaValida = await bcrypt.compare(senha, usuarioEncontrado.senha_hash);
        if (!senhaValida) {
            return res.status(401).json({ errors: [{ msg: 'Usuário ou senha inválidos' }] });
        }

        const token = jwt.sign(
            { id: usuarioEncontrado.id, perfil: usuarioEncontrado.perfil },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        return res.status(200).json({
            token,
            usuario: {
                id: usuarioEncontrado.id,
                nome: usuarioEncontrado.nome,
                usuario: usuarioEncontrado.usuario,
                perfil: usuarioEncontrado.perfil
            }
        });
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        return res.status(500).json({ error: 'Erro ao fazer login' });
    }
};