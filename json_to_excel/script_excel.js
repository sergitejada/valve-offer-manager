const xlsx = require('xlsx');
const fs = require('fs');

// Cargar archivo de plantilla existente
const workbook = xlsx.readFile('offer-template.xlsx');

// Seleccionar la segunda hoja (por índice, 1 es la segunda hoja)
const worksheet = workbook.Sheets[workbook.SheetNames[1]];

// Input JSON (ejemplo)
const input_json = [
    {
        "item": 1,
        "valve type": "Type1",
        "end_user": "User1",
        "9COM": "Code1",
        "size": "Small",
        "class": "A"
    },
    {
        "item": 2,
        "valve type": "Type2",
        "end_user": "User2",
        "9COM": "Code2",
        "size": "Medium",
        "class": "B"
    }
];

// Mapeo de columnas (ahora usando índices numéricos en lugar de letras)
const items_to_excel = {
    "valve type": 5,    // Columna E
    "end_user": 4,      // Columna D
    "9COM": 10,         // Columna J
    "size": 11,         // Columna K
    "class": 12,        // Columna L
    "operation": 6,     // Columna F
    "body_construction": 13,
    "ball_construction": 14,
    "bore": 15,
    "ends": 16,
    "standard": 17,
    "tag": 7,
    "model": 18,
    "body": 19,
    "ball": 20,
    "stem": 21,
    "seat_housing": 22,
    "seat": 23,
    "seals": 24,
    "injectors": 25,
    "drain_vent": 26,
    "painting": 27,
    "temperature": 28,
    "service": 29,
    "available": 45
};

// Insertar datos en el Excel comenzando en la fila 9
let starting_row = 9;
input_json.forEach((item, index) => {
    // Insertar el número de ítem en la columna 2 (B)
    let row = starting_row + index;
    worksheet[xlsx.utils.encode_cell({r: row - 1, c: 1})] = { v: item.item };

    // Iterar sobre los atributos definidos en items_to_excel
    for (let attribute in items_to_excel) {
        let col_index = items_to_excel[attribute];  // Obtener el índice de columna
        let value = item[attribute] || "N/A";  // Valor del atributo o "N/A" si no existe

        // Insertar el valor en la celda correspondiente
        worksheet[xlsx.utils.encode_cell({r: row - 1, c: col_index - 1})] = { v: value };
    }
});

// Escribir el archivo Excel actualizado
xlsx.writeFile(workbook, 'items_output.xlsx');
console.log('Archivo Excel creado: items_output.xlsx');
