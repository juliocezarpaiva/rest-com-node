class Tables {
    init(connection) {
        this.connection = connection
        console.log('Tabelas foram chamadas')

        this.createAtendimentos()
    }

    createAtendimentos() {
        const sql = 'CREATE TABLE IF NOT EXISTS Atendimentos (id int NOT NULL AUTO_INCREMENT, \
            cliente varchar(50) NOT NULL, pet varchar(20), servico varchar(20) NOT NULL, \
            data datetime NOT NULL, dataCriacao datetime NOT NULL, \
            status varchar(20) NOT NULL, observacoes text, PRIMARY KEY(id))'

        this.connection.query(sql, (error) => {
            if (error) {
                console.log('Erro na criacao de tabelas de atendimentos: ' + error)
            } else {
                console.log('Tabela atendimentos criada com sucesso')
            }
        })
    }
}

module.exports = new Tables