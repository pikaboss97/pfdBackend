const XLSX = require('xlsx');

exports.jsonToExcel = function (jsonData) {

    // Crear una hoja de cálculo de Excel
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(jsonData);

    // Agregar la hoja de cálculo al libro de trabajo
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Record');

    // Convertir el libro de trabajo a un archivo binario en memoria
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });

    // Devolver el archivo adjunto en la respuesta HTTP
    return excelBuffer;
}

exports.getStringBetween = function (str, start, end, isglobal = false) {
    try {
        let result = [];
        if (isglobal == "g") {
            //if(start == 'L0006')console.log(str);
            for (const match of str.matchAll(new RegExp(`${start}(.*)${end}`, isglobal))) {
                if (match && match[1].length == 0) {
                    try {
                        let temp = str.match(new RegExp(`${match[0]}(.*)${"    \n"}`, "s"));
                        let m = temp[1].match(new RegExp(`${"    \n"}`));
                        let subcadena = temp[1].substring(0, m.index);
                        let resp = subcadena.replace(/\n/g, '');
                        result.push(resp + '        ');
                    } catch (error) {
                        //implementar codigo para que el usuario pueda validar el estado del curso si ya no se pudo validar por codigo
                        console.log("error in geetStringBetween ", error);
                    }
                } else {
                    result.push(match[1])
                }
            }
        }else if(isglobal == "s"){
            result = str.match(new RegExp(`${start}(.*)${end}`, "s"))[1];
        } else {
            result = str.match(new RegExp(`${start}(.*)${end}`))[1];

        }
        return result;
    } catch (error) {
        console.log("Error al obtener la informacion mediante Regex:  ", error);
        return error;
    }
}