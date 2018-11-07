const sql = require('mssql/msnodesqlv8');
const config = {
  driver: 'msnodesqlv8',
  connectionString: 'Driver={SQL Server Native Client 11.0};Server=KENELYF;Database=Mordor;Trusted_Connection=yes;',
};

sql.connect(config)
.then(con => createTable(con))
.catch(ex => console.log(ex));

function createTable(conn) {

      const table = new sql.Table('Produtos');
      table.create = true;
      table.columns.add('CodigoBarra', sql.NVarChar(20), {nullable: false, primary: true});
      table.columns.add('Descricao', sql.NVarChar(200), {nullable: false});
      table.columns.add('Valor', sql.Decimal(9,4), {nullable: false});
      
      for (let index = 1; index <= 50; index++) {
        table.rows.add(index.toString() + index.toString(), 'Descrição do Produto ' + index.toString(), (Math.random() * 2.36) * index );
      }
      
      const request = new sql.Request()
      request.bulk(table)
             .then(result => console.log('Dados mock inseridos corretamente'))
             .catch(err => console.log('Erro no bulk: ' + err));
}