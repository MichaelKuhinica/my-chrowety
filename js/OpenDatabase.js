/*
 * @nome string *
 * @tit string
 * @use new OpenDatabase('test', 'My database for testing');
*/
function OpenDatabase(nome, tit){
    if( !nome ){
        return;
    }
    this.query = null;
    this.db = openDatabase(nome, "1.0", (tit?tit:nome),  5 * 1024 * 1024);

    /*
     * @query string *
     * @dados object array
     * @sucesso function(@SQLTransaction, @SQLResult)
     * @erro function(@SQLTransaction, @SQLError)
     * @use db.executa("INSERT INTO table (id, name) VALUES (?, ?)", [id, name]);
    */
    this.executa = function(query, dados, sucesso, erro){
        this.query = query;
        if(typeof sucesso != 'function'){
            //sucesso = function(t, re){console.log(re)}
            sucesso = null;
        }
        if(typeof erro != 'function'){
            //erro = function(t, re){console.log(re)}
            erro = null;
        }
        this.db.transaction(function(e){
            e.executeSql(query, (typeof dados == 'object' ? dados : []), sucesso, erro);
        });
    }


    /*
     * @table string *
     * @dados object array *
     * @sucesso function(@SQLTransaction, @SQLResult)
     * @erro function(@SQLTransaction, @SQLError)
     * @use db.createTable('nomes', ['id REAL UNIQUE', 'nome TEXT', 'sobrenome TEXT'] );
    */
    this.createTable = function(table, dados, sucesso, erro){
        var query = "CREATE TABLE IF NOT EXISTS {table} ({rows})";
        if(typeof dados == 'object'){
            query = query.replace('{table}', table);
            query = query.replace('{rows}', dados.join(','));
            this.executa(query, null, sucesso, erro);
        }else{
            return;
        }
    }


    /*
     * @table string *
     * @dados object *
     * @sucesso function(@SQLTransaction, @SQLResult)
     * @erro function(@SQLTransaction, @SQLError)
     * @use db.insert('table', { 'dado1': 'valor1', 'dado2': 'valor2' });
    */
    this.insert = function(table, dados, sucesso, erro){
        var query = "INSERT INTO {table} ({rows}) VALUES ({nr})";
        var rows = [], nr = [], values = [], n = 0, Amenos = null;
        if(typeof dados == 'object'){
            for(i in dados){
                rows[n]   = i;
                if(dados[i] == 'NOW()'){
                    nr[n] = "datetime('now')";
                    Amenos = true;
                }else{
                    nr[n]     = '?';
                    if(Amenos){
                        values[n-1] = dados[i];
                    }else{
                        values[n] = dados[i];
                    }
                    Amenos = null;
                }
                n++
            }
            rows   = rows.join(',');
            nr     = nr.join(',');

            query = query.replace('{table}', table);
            query = query.replace('{rows}', rows);
            query = query.replace('{nr}', nr);

            this.executa(query, values, sucesso, erro);
        }else{
            return;
        }
    }

    /*
     * @table string *
     * @rows string
     * @sucesso function(@SQLTransaction, @SQLResult)
     * @erro function(@SQLTransaction, @SQLError)
     * @use db.select('Tabela', 'campo1, campo2, campo3');
    */
    this.select = function(table, rows, sucesso, erro){
        var query = "SELECT {rows} FROM {table}";
        query = query.replace('{table}', table);
        query = query.replace('{rows}', (rows ? rows : '*'));
        this.executa(query, null, sucesso, erro);
    }

    /*
     * @table string *
     * @where string
     * @sucesso function(@SQLTransaction, @SQLResult)
     * @erro function(@SQLTransaction, @SQLError)
     * @use db.remove("table", "WHERE id=2"); // db.remove("table", "WHERE user LIKE '%Junior'");
    */
    this.remove = function(table, where, sucesso, erro){
        var query = "DELETE FROM {table} {where}";
        query = query.replace('{table}', table);
        query = query.replace('{where}', (where ? where : ''));
        this.executa(query, [], sucesso, erro);
    }
}