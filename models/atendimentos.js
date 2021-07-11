const connection = require('../infra/connection')
const moment = require('moment')

class Atendimento {
    add(atendimento, res) {
        const dataCriacao = moment().format('YYYY-MM-DD hh:mm:ss')
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD hh:mm:ss')
        const atendimentoDatado = {...atendimento, dataCriacao, data}

        // validacoes
        const dataEhValida = moment(data).isSameOrAfter(dataCriacao)
        const clienteEhValido = atendimento.cliente.length >= 5

        const validacoes = [
            {nome: 'data', valido: dataEhValida, mensagem: 'Data de agendamento deve ser maior ou igual a data atual'},
            {nome: 'cliente', valido: clienteEhValido, mensagem: 'O nome do(a) cliente deve ter tamanho maior ou igual a 5'}
        ]

        const errosValidacao = validacoes.filter(campo => !campo.valido)
        const existemErrosValidacao = errosValidacao.length

        if (existemErrosValidacao) {
            res.status(400).json(errosValidacao)
        } else {
            const sql = 'INSERT INTO atendimentos SET ?'

            connection.query(sql, atendimentoDatado, (error, dbRes) => {
                if (error) {
                    res.status(400).json(error)
                } else {
                    const id = dbRes.insertId
                    res.status(201).json({...atendimento, id})
                }
            })
        }       
    }

    list(res) {
        const sql = 'SELECT * FROM atendimentos'

        connection.query(sql, (error, dbRes) => {
            if (error) {
                res.status(400).json(error)
            } else {
                res.status(200).json(dbRes)
            }
        })
    }

    search(id, res) {
        const sql = 'SELECT * FROM atendimentos WHERE id=?'

        connection.query(sql, id, (error, dbRes) => {
            if (error) {
                res.status(400).json(error)
            } else {
                res.status(200).json(dbRes[0])
            }
        })
    }

    alter(id, values, res) {
        if (values.data) {
            values.data = moment(values.data, 'DD/MM/YYYY').format('YYYY-MM-DD hh:mm:ss')
        }

        const sql = 'UPDATE atendimentos SET ? WHERE id=?'

        connection.query(sql, [values, id], (error, dbRes) => {
            if (error) {
                res.status(400).json(error)
            } else {
                res.status(200).json({...values, id})
            }
        })
    }

    delete(id, res) {
        const sql = 'DELETE FROM atendimentos WHERE id=?'

        connection.query(sql, id, (error, dbRes) => {
            if (error) {
                res.status(400).json(error)
            } else {
                res.status(200).json({id})
            }
        })
    }
}

module.exports = new Atendimento