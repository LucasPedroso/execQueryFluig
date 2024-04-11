function createDataset(fields, constraints, sorts) {
    var dataset = DatasetBuilder.newDataset();
    var dataSource = "/jdbc/AppDS"
    var ic = new javax.naming.InitialContext();
    var ds = ic.lookup(dataSource);
    var created = false;

    if (fields == "" || fields == null) {
        dataset.addColumn("STATUS")
        dataset.addColumn("MENSAGEM")
        dataset.addRow(["NOK", "NÃO FOI ENVIADO QUERY"])

        return dataset;
    }

    var myQuery = fields[0]

    try {
        var tipoQuery = myQuery.split(" ")[0].toUpperCase();

        var conn = ds.getConnection();
        var stmt = conn.createStatement();

        var rs = tipoQuery == "SELECT" ? stmt.executeQuery(myQuery) : stmt.executeUpdate(myQuery);

        if (tipoQuery == "UPDATE") {
            dataset.addColumn("STATUS")
            dataset.addColumn("REGISTROS ATUALIZADOS")
            dataset.addRow(["OK", rs.toString()])
    
            return dataset;
        }

        var columnCount = rs.getMetaData().getColumnCount();

        while (rs.next()) {
            if (!created) {
                for (var i = 1; i <= columnCount; i++) {
                    dataset.addColumn(rs.getMetaData().getColumnName(i));
                }
                created = true;
            }
            var Arr = new Array();
            for (var i = 1; i <= columnCount; i++) {
                var obj = rs.getObject(rs.getMetaData().getColumnName(i));
                if (null != obj) {
                    Arr[i - 1] = rs.getObject(rs.getMetaData().getColumnName(i)).toString();
                } else {
                    Arr[i - 1] = "null";
                }
            }
            dataset.addRow(Arr);
        }
    } catch (e) {
        dataset.addColumn("STATUS")
        dataset.addColumn("MENSAGEM")
        dataset.addRow(["NOK", e.message.toString()])
    } finally {
        if (rs != null && (typeof rs == 'object')) {
            rs.close();
        }
        if (stmt != null) {
            stmt.close();
        }
        if (conn != null) {
            conn.close();
        }
    }
    return dataset;
}