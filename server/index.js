const cors = require('cors')
const express = require('express');
const app = express();         
const bodyParser = require('body-parser');
const port = 8266;
const sql = require('mssql/msnodesqlv8');
const config = {
  driver: 'msnodesqlv8',
  connectionString: 'Driver={SQL Server Native Client 11.0};Server=KENELYF;Database=Mordor;Trusted_Connection=yes;',
};
sql.connect(config)
   .then(conn => global.conn = conn)
   .catch(err => console.log(err));
   
const router = express.Router();
router.get('/api/', (req, res) => res.json({ message: 'Funcionando!' }));
router.get('/api/produtos', (req, res) =>{
    executaConsulta("SELECT * FROM Produtos", res);
}),
router.get('/api/produtos/:codigoBarra', (req, res) =>{
    executaConsulta("SELECT * FROM Produtos where CodigoBarra = '" + req.params.codigoBarra + "'" , res);
})
app.use(cors({credentials: true, origin: true}));
app.use('/', router);
app.listen(port);

function executaConsulta(query, res){
    global.conn.request()
               .query(query)
               .then(result => res.json(result.recordset))
               .catch(err => res.json(err));
}