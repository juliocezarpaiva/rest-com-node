const customExpress = require("./config/customExpress")
const connection = require("./infra/connection")
const Tables = require("./infra/tables")

connection.connect(error => {
    if (error) {
        console.log('Erro de conexao: ' + error)
    } else {
        console.log('Conectado com sucesso')
        Tables.init(connection)
        const app = customExpress()
        app.listen(3000, () => console.log('servidor rodando na porta 3000'))
    }
})