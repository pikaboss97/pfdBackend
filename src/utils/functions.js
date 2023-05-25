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