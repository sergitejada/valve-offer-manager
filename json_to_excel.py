import openpyxl

# Supongamos que este es tu JSON de entrada
input_json = [
    {
        "item": 1,
        "valve type": "Type1",
        "end_user": "User1",
        "9COM": "Code1",
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
        "valve type": "Type2",
        "end_user": "User2",
        "9COM": "Code2",
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
]

# Mapeo de columnas en Excel
items_to_excel = {
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
}

# Función para convertir letra de columna a número de columna
def column_letter_to_index(letter):
    return openpyxl.utils.column_index_from_string(letter)

# Crear un nuevo libro de trabajo
wb = openpyxl.Workbook()
ws = wb.active
ws.title = "Items"

# Insertar los datos en el archivo Excel
starting_row = 9  # Comienza en la fila 9
for index, item in enumerate(input_json, start=0):
    # Insertar el número de ítem en la columna B
    ws.cell(row=starting_row + index, column=2, value=item["item"])
    
    # Iterar sobre los atributos definidos en items_to_excel
    for attribute, column_letter in items_to_excel.items():
        # Obtener el valor del atributo en el JSON
        value = item.get(attribute, "N/A")  # "N/A" si no existe el atributo
        
        # Obtener el índice numérico de la columna en base a su letra
        col_index = column_letter_to_index(column_letter)
        
        # Insertar el valor en la celda correspondiente
        ws.cell(row=starting_row + index, column=col_index, value=value)

# Guardar el archivo Excel
wb.save("items_output.xlsx")
