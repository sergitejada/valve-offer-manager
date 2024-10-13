// Supongamos que este es tu JSON de entrada
const inputJson = [
    {
        "item": 1,
        "valve type": "E1",
        "end_user": "User1",
        "9COM": "J1",
        "size": "Small",
        "class": "A",
        "operation": "Open",
        "body_construction": "Steel",
        "ball_construction": "Plastic",
        "bore": "10",
        "ends": "Welded",
        "standard": "ISO",
        "tag": "Tag1",
        "model": "Model1",
        "body": "Body1",
        "ball": "Ball1",
        "stem": "Stem1",
        "seat_housing": "Housing1",
        "seat": "Seat1",
        "seals": "Seal1",
        "injectors": "Injector1",
        "drain_vent": "Vent1",
        "painting": "Paint1",
        "temperature": "20C",
        "service": "Service1",
        "available": "Yes"
    },
    {
        "item": 2,
        "valve type": "E2",
        "end_user": "User2",
        "9COM": "J2",
        "size": "Medium",
        "class": "B",
        "operation": "Close",
        "body_construction": "Aluminum",
        "ball_construction": "Metal",
        "bore": "20",
        "ends": "Flanged",
        "standard": "ANSI",
        "tag": "Tag2",
        "model": "Model2",
        "body": "Body2",
        "ball": "Ball2",
        "stem": "Stem2",
        "seat_housing": "Housing2",
        "seat": "Seat2",
        "seals": "Seal2",
        "injectors": "Injector2",
        "drain_vent": "Vent2",
        "painting": "Paint2",
        "temperature": "25C",
        "service": "Service2",
        "available": "No"
    }
    // Agrega más ítems según sea necesario
];

// Mapeo de columnas
const items_to_excel = {
    "valve type": "E",
    "end_user": "D",
    "9COM": "J",
    "size": "K",
    "class": "L",
    "operation": "F",
    "body_construction": "M",
    "ball_construction": "N",
    "bore": "O",
    "ends": "P",
    "standard": "Q",
    "tag": "G",
    "model": "R",
    "body": "S",
    "ball": "T",
    "stem": "U",
    "seat_housing": "V",
    "seat": "W",
    "seals": "X",
    "injectors": "Y",
    "drain_vent": "Z",
    "painting": "AA",
    "temperature": "AB",
    "service": "AC",
    "available": "AS"
};

// Función para convertir JSON a Excel
function jsonToExcel(jsonData) {
    // Crear un nuevo libro de trabajo
    const wb = XLSX.utils.book_new();

    // Crear un arreglo para las filas
    const rows = [];

    // Añadir los encabezados
    const headers = ["Item", ...Object.keys(items_to_excel)];
    rows.push(headers);

    // Llenar las filas con los datos del JSON
    jsonData.forEach(item => {
        const row = [item.item]; // Primero el número de ítem
        for (const key of Object.keys(items_to_excel)) {
            row.push(item[key]); // Agrega el valor de cada atributo
        }
        rows.push(row);
    });

    // Convertir las filas a una hoja de trabajo
    const ws = XLSX.utils.aoa_to_sheet(rows);

    // Definir el rango a partir de B9
    const range = XLSX.utils.decode_range(ws['!ref']);
    range.s.r = 8; // Comienza en la fila 9 (0-indexado)
    ws['!ref'] = XLSX.utils.encode_range(range);

    // Añadir la hoja de trabajo al libro
    XLSX.utils.book_append_sheet(wb, ws, "Items");

    // Guardar el archivo Excel
    XLSX.writeFile(wb, 'items.xlsx');
}

// Llamar a la función
jsonToExcel(inputJson);
