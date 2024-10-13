'use server'

import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function processDescriptionsToRfq(descriptions) {
  console.log(descriptions)
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: [
            {
              type: 'text',
              text: 'Eres un asistente especializado en extraer información estructurada de descripciones de válvulas industriales. Tu tarea es analizar el texto proporcionado y extraer los siguientes detalles:\n\nTipo de válvula\nTamaño\nClase de presión\nTipo de operación\nTipo de construcción\nTipo de bore (orificio)\nTipo de conexión final\nEstándar aplicable\nMaterial del cuerpo\nMaterial de la bola\nMaterial del vástago\nMaterial del asiento\nMaterial de los sellos\nTemperatura mínima y máxima de operación\nUnidades de temperatura\nServicio o aplicación\n\nOrganiza la información extraída en un formato JSON con la siguiente estructura:\nJson{\n    "valve type": "...",\n    "size": "...",\n    "class": "...",\n    "operation": "...",\n    "construction": "...",\n    "bore": "...",\n    "ends": "...",\n    "standard": "...",\n    "tag": "N/A",\n    "body": "...",\n    "ball": "...",\n    "stem": "...",\n    "seat": "...",\n    "seals": "...",\n    "min_temperature": ...,\n    "max_temperature": ...,\n    "units_temperature": "...",\n    "service": "..."\n}\nSi alguna información no está presente usa "N/F" para campos de texto y null para campos numéricos. Infiere información cuando sea posible basándote en estándares de la industria.\nTexto de Ejemplo\nValve Specification Valve Type: Ball Size: 4 inches Socket Welded (SW) Rating: 300 lbs Spec: API 608 Material:+ Body: Carbon Steel (A105)+ Trim: Stainless Steel (SS316L)+ Seat: filled ptfe+ Seals: lip seals Service:+ Fluid: Water, Air, and Steam+ Temperature Range: -20°C to 120°C Actuation: Pneumatic (TAG: 3456) Features:+ Blowout Proof Stem to Prevent Valve from Closing Unexpectedly+ Rugged Construction for High-Pressure Applications+ Internally Cylindrical Body for Smooth Flow and Reduced Turbulence\n\nAnaliza este texto y proporciona la información extraída en el formato JSON especificado.\n',
            },
          ],
        },
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: 'Stainless steel ball valve with HNBR O-ring seal, 1\\" NPT female connection, 1500 rating, 3/4\\" handle for easy operation. Trim material: Stainless Steel, Seat material: EPDM, Trunnion style, Full bore, Operating temperature range: -20°C to 100°C, Chemical resistance: Suitable for general-purpose industrial applications requiring high-pressure and chemical resistance.',
            },
          ],
        },
        {
          role: 'assistant',
          content: [
            {
              text: '{\n  "valve type":"ball valve",\n  "size":"1\\"",\n  "class":"1500 rating",\n  "operation":"3/4\\" handle",\n  "construction":"trunnion",\n  "bore":"full bore",\n  "ends":"NPT female connection",\n  "standard":"N/F",\n  "tag":"N/F",\n  "body":"stainless steel",\n  "ball":"stainless steel",\n  "stem":"stainless steel",\n  "seat":"EPDM",\n  "seals":"HNBR O-ring seal",\n  "min_temperature":-20,\n  "max_temperature":100,\n  "units_temperature":"ºC",\n  "service":"general-purpose industrial applications"\n}',
              type: 'text',
            },
          ],
        },
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: 'Manual lever-operated ball valve with PTFE seat and floating style design. API 6D compliant. Rated to 600 API 6D. Operating temperature range: -50°C to 200°C, Chemical resistance: Suitable for general-purpose industrial applications involving water, steam, and air services. Body material: Carbon Steel, trim: stainless steel Seat material: PTFE, 2\\" NPT male connection.',
            },
          ],
        },
        {
          role: 'assistant',
          content: [
            {
              text: '{\n    "valve type": "ball valve",\n    "size": "2\\"",\n    "class": "Rated to 600 API 6D",\n    "operation": "Manual lever-operated ",\n    "construction": "floating",\n    "bore": "FB",\n    "ends": "NPT male connection",\n    "standard": "API 6D",\n    "tag": "N/A",\n    "body": "carbon steel",\n    "ball": "stainless steel",\n    "stem": "stainless steel",\n    "seat": "PTFE",\n    "seals": "N/F",\n    "min_temperature": -50,\n    "max_temperature": 200,\n    "units_temperature": "ºC",\n    "service": "water, steam, and air",\n  }',
              type: 'text',
            },
          ],
        },
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: 'Flanged ball valve with PEEK seat and FB design, class900. Operating temperature range: -20°F-80°F, fluid: hydrocarbon fluids, crude oil and gasoline. A350 LF2 cl1 body, Inconel trim material, PEEK seat material, and electric actuation option available. API 6D.',
            },
          ],
        },
        {
          role: 'assistant',
          content: [
            {
              text: '{\n    "valve type": "ball valve",\n    "size": "2\\"",\n    "class": "class900",\n    "operation": "electric",\n    "construction": "N/F",\n    "bore": "FB",\n    "ends": "flanged",\n    "standard": "API 6D",\n    "tag": "N/F",\n    "body": "A350 LF2 cl1",\n    "ball": "inconel",\n    "stem": "inconel",\n    "seat": "PEEK",\n    "seals": "N/F",\n    "min_temperature": -20,\n    "max_temperature": 80,\n    "units_temperature": "ºF",\n    "service": "hydrocarbon fluids, crude oil and gasoline"\n  }',
              type: 'text',
            },
          ],
        },
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: 'RB Manual Gearbox-Operated Ball Valve trunnion, 300# FL o-rings. temperature: 200°C, fluid: water, steam, and air services. body material: A216 WCB, monel trim Seat material: PTFE.',
            },
          ],
        },
        {
          role: 'assistant',
          content: [
            {
              text: '{\n    "valve type": "ball valve",\n    "size": "6\\"",\n    "class": "300#",\n    "operation": "Manual Gearbox-Operated",\n    "construction": "trunnion",\n    "bore": "RB",\n    "ends": "FL",\n    "standard": "N/F",\n    "tag": "N/F",\n    "body": "A216 WCB",\n    "ball": "monel",\n    "stem": "monel",\n    "seat": "PTFE",\n    "seals": "o-rings",\n    "min_temperature": "N/F",\n    "max_temperature": 200,\n    "units_temperature": "ºC",\n    "service": "water, steam, and air services",\n  }',
              type: 'text',
            },
          ],
        },
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: 'Electric Actuated Ball Valve RTJ 200 DN TAG# 080-UZV-11032 seat: RPTFE full port, rated to 1500 API 6D. A182 F51 body Operating temperature range: -20°F to 80°F, Chemical resistance: Suitable for high-temperature and corrosion-resistant industrial applications involving hydrocarbon fluids, such as crude oil and gasoline. Inconel trim material',
            },
          ],
        },
        {
          role: 'assistant',
          content: [
            {
              text: '{\n    "valve type": "ball valve",\n    "size": "200 DN",\n    "class": "1500#",\n    "operation": "electric",\n    "construction": "N/F",\n    "bore": "full port",\n    "ends": "RTJ",\n    "standard": "API 6D",\n    "tag": "080-UZV-11032",\n    "body": "A182 F51",\n    "ball": "inconel",\n    "stem": "inconel",\n    "seat": "RPTFE",\n    "seals": "N/F",\n    "min_temperature": -20,\n    "max_temperature": 80,\n    "units_temperature": "ºF",\n    "service": "hydrocarbon fluids, such as crude oil and gasoline",\n  }',
              type: 'text',
            },
          ],
        },
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: '2 in. rating: 150#RF. Reduced, A105, SS316 ball, SS316 stem. pneumatic 6 psig, FL, ASME 16.34, bolting b8m, methanol service',
            },
          ],
        },
        {
          role: 'assistant',
          content: [
            {
              text: '{\n    "valve type": "N/F",\n    "size": "2 in",\n    "class": "150#",\n    "operation": "pneumatic",\n    "construction": "Fl",\n    "bore": "Reduced",\n    "ends": "RF",\n    "standard": "N/F",\n    "tag": "N/F",\n    "body": "A105",\n    "ball": "SS316",\n    "stem": "SS316",\n    "seat": "N/F",\n    "seals": "N/F",\n    "min_temperature": "N/F",\n    "max_temperature": "N/F",\n    "units_temperature": "N/F",\n    "service": "hydrocarbon"\n  }',
              type: 'text',
            },
          ],
        },
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: 'flare gas - ball. 14\\" reduced port,  150#RF, body: SS316L (dual certificate), ball: SS316L (dual certificate), API 6D, stellite-6, GRAPHITE packing, fugitive emission BH, bolt: 8m, nuts: 8 galvanized. 350 ºC',
            },
          ],
        },
        {
          role: 'assistant',
          content: [
            {
              text: '{\n    "valve type": "ball valve",\n    "size": "14\\"",\n    "class": "150#",\n    "operation": "N/F",\n    "construction": "N/F",\n    "bore": "reduced port",\n    "ends": "RF",\n    "standard": "API 6D",\n    "tag": "N/F",\n    "body": "SS316L (dual certificate)",\n    "ball": "SS316L (dual certificate)",\n    "stem": "N/F",\n    "seat": "stellite-6",\n    "seals": "graphite packing",\n    "min_temperature": "N/F",\n    "max_temperature": 350,\n    "units_temperature": "ºC",\n    "service": "flare gas"\n  }',
              type: 'text',
            },
          ],
        },
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: 'gate valve. 10 inch full bore, class 300 RF trunnion split body. monel body, monel trim ISO 17292; metal seat GRAPHITE seals; 0-450 ºF. oval lever',
            },
          ],
        },
        {
          role: 'assistant',
          content: [
            {
              text: '{\n    "valve type": "gate valve",\n    "size": "10 inch",\n    "class": "class 300",\n    "operation": "oval lever",\n    "construction": "trunnion",\n    "bore": "full bore",\n    "ends": "RF",\n    "standard": "ISO 17292",\n    "tag": "N/F",\n    "body": "monel",\n    "ball": "monel",\n    "stem": "monel",\n    "seat": "metal",\n    "seals": "graphite seals",\n    "min_temperature": 0,\n    "max_temperature": 450,\n    "units_temperature": "ºF",\n    "service": "N/F"\n  }',
              type: 'text',
            },
          ],
        },
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: 'Ball Valve Description Tag: 096-XV-39436 Size: 3\\" FNPT Class: 2500 Service: Hydrogen, Propane, and Natural Gas Material:+ Body: Forged Stainless Steel (SS316)+ Trim: TRIM 10 Actuation: Electric Features:+ Reduced Bore Design for Improved Flow Characteristics+ Anti-Static Device to Prevent Static Electricity Buildup+ NACE MR0175 Compliant for Sour Gas and Chemical Services',
            },
          ],
        },
        {
          role: 'assistant',
          content: [
            {
              text: '{\n    "valve type": "ball valve",\n    "size": "3\\"",\n    "class": "class 2500",\n    "operation": "electric",\n    "construction": "N/F",\n    "bore": "reduced bore",\n    "ends": "FNPT",\n    "standard": "NACE MR0175",\n    "tag": "096-XV-39436",\n    "body": "forged stainless steel (SS316)",\n    "ball": "TRIM 10",\n    "stem": "TRIM 10",\n    "seat": "N/F",\n    "seals": "N/F",\n    "min_temperature": "N/F",\n    "max_temperature": "N/F",\n    "units_temperature": "N/F",\n    "service": "hydrogen, propane, and natural gas"\n  }',
              type: 'text',
            },
          ],
        },
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: 'Valve Specification Valve Type: Ball Size: 4 inches Socket Welded (SW) Rating: 300 lbs Spec: API 608 Material:+ Body: Carbon Steel (A105)+ Trim: Stainless Steel (SS316L)+ Seat: filled ptfe+ Seals: lip seals Service:+ Fluid: Water, Air, and Steam+ Temperature Range: -20°C to 120°C Actuation: Pneumatic (TAG: 3456) Features:+ Blowout Proof Stem to Prevent Valve from Closing Unexpectedly+ Rugged Construction for High-Pressure Applications+ Internally Cylindrical Body for Smooth Flow and Reduced Turbulence',
            },
          ],
        },
        {
          role: 'assistant',
          content: [
            {
              text: '{\n    "valve type": "ball valve",\n    "size": "4 inches",\n    "class": "300 lbs",\n    "operation": "pneumatic",\n    "construction": "internally cylindrical body",\n    "bore": "N/F",\n    "ends": "Socket Welded (SW)",\n    "standard": "API 608",\n    "tag": "3456",\n    "body": "carbon steel (A105)",\n    "ball": "stainless steel (SS316L)",\n    "stem": "stainless steel (SS316L)",\n    "seat": "filled PTFE",\n    "seals": "lip seals",\n    "min_temperature": -20,\n    "max_temperature": 120,\n    "units_temperature": "ºC",\n    "service": "water, air, and steam"\n}',
              type: 'text',
            },
          ],
        },
        {
          role: 'user',
          content: descriptions,
        },
      ],

      temperature: 1,
      max_tokens: 2048,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    })

    const content = response.choices[0].message.content
    console.log('XXXXXXXXXXXXXX')
    console.log(content)
    return content
  } catch (error) {
    console.error('Error processing valve descriptions:', error)
    throw new Error('Failed to process valve descriptions: ' + error.message)
  }
}

export async function processRfqToJson(descriptions) {
  console.log(descriptions)
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: [
            {
              text: 'Tu tarea es transformar un JSON de entrada que contiene información sobre válvulas a un formato estandarizado y limpio. Aplica las siguientes reglas a cada campo específico.\n\n### Transformaciones del JSON\n\n- **"valve type"**: Mantén el valor original.\n- **"size"**:\n  - Convierte a número entero en milímetros.\n  - Multiplica por 25 si el valor incluye \'"\' o "in".\n  - Mantén el número como está si el valor incluye "DN".\n  - Redondea al entero más cercano.\n\n- **"class"**:\n  - Extrae y conserva solo el número de la cadena si lo hay.\n  - Mantén el valor original si no contiene un número.\n\n- **"operation"**: Convierte a minúsculas.\n- **"construction"**: Mantén el valor original.\n- **"bore"**:\n  - Convierte "full bore" o "full port" a "FB".\n  - Convierte "reduced bore" a "RB".\n  - Mantén el valor original para cualquier otro caso.\n\n- **"ends"**:\n  - Cambia "NPT female connection" a "F-NPT".\n  - Cambia "NPT male connection" a "M-NPT".\n  - Convierte "flanged" o "FL" a "RF".\n  - Mantén el valor original para cualquier otro caso.\n\n- **"standard"**: Mantén el valor original.\n- **"tag"**: Mantén el valor original.\n- **"body"**:\n  - Conviértelo según las reglas dadas (ver enunciado).\n  - Mantén el valor original para cualquier otro caso.\n\n- **"ball"**: Mantén el valor original.\n- **"stem"**: Mantén el valor original.\n- **"seat"**: Convierte a mayúsculas.\n- **"seals"**:\n  - Cambia a "LS" si contiene "lip seal" (sin considerar mayúsculas/minúsculas).\n  - Mantén el valor original en cualquier otro caso.\n\n- **"min_temperature"**: Mantén el valor original.\n- **"max_temperature"**: Mantén el valor original.\n- **"units_temperature"**: Mantén el valor original.\n- **"service"**: Mantén el valor original.\n\nPara cualquier campo no mencionado, mantén el valor original.\n\n# Output Format\n\nDevuelve el JSON modificado con todas las transformaciones aplicadas según se especifica, asegurando que esté limpio y estandarizado.\n\n# Example\n\n**Input JSON:**\n```json\n{\n  "valve type": "Gate Valve",\n  "size": "2 in",\n  "class": "150",\n  "operation": "Manual",\n  "construction": "Welded",\n  "bore": "full bore",\n  "ends": "NPT female connection",\n  "standard": "API 600",\n  "tag": "01-VLV-345",\n  "body": "stainless steel",\n  "ball": "stainless steel",\n  "stem": "stainless steel",\n  "seat": "soft",\n  "seals": "Lip Seal",\n  "min_temperature": "-20",\n  "max_temperature": "100",\n  "units_temperature": "C",\n  "service": "Water"\n}\n```\n\n**Transformed Output JSON:**\n```json\n{\n  "valve type": "Gate Valve",\n  "size": 50,\n  "class": "150",\n  "operation": "manual",\n  "construction": "Welded",\n  "bore": "FB",\n  "ends": "F-NPT",\n  "standard": "API 600",\n  "tag": "01-VLV-345",\n  "body": "SS316",\n  "ball": "stainless steel",\n  "stem": "stainless steel",\n  "seat": "SOFT",\n  "seals": "LS",\n  "min_temperature": "-20",\n  "max_temperature": "100",\n  "units_temperature": "C",\n  "service": "Water"\n}\n```\n\n# Notes\n\n- Si encuentras casos no cubiertos por las reglas, usa criterios similares para garantizar la consistencia del formato de salida.\n- Mantén la limpieza y estandarización en todos los elementos transformados.',
              type: 'text',
            },
          ],
        },
        {
          role: 'user',
          content: [
            {
              text: '{\r\n        "valve type": "ball valve",\r\n        "size": "1\\"",\r\n        "class": "1500 rating",\r\n        "operation": "3/4\\" handle",\r\n        "construction": "trunnion",\r\n        "bore": "full bore",\r\n        "ends": "NPT female connection",\r\n        "standard": "N/F",\r\n        "tag": "N/F",\r\n        "body": "stainless steel",\r\n        "ball": "stainless steel",\r\n        "stem": "stainless steel",\r\n        "seat": "EPDM",\r\n        "seals": "HNBR O-ring seal",\r\n        "min_temperature": -20,\r\n        "max_temperature": 100,\r\n        "units_temperature": "ºC",\r\n        "service": "general-purpose industrial applications",\r \n    },',
              type: 'text',
            },
          ],
        },
        {
          role: 'assistant',
          content: [
            {
              text: '{\n  "valve type": "ball valve",\n  "size": 25,\n  "class": "1500",\n  "operation": "3/4\\" handle",\n  "construction": "trunnion",\n  "bore": "FB",\n  "ends": "F-NPT",\n  "standard": "N/F",\n  "tag": "N/F",\n  "body": "SS316",\n  "ball": "stainless steel",\n  "stem": "stainless steel",\n  "seat": "EPDM",\n  "seals": "HNBR O-ring seal",\n  "min_temperature": -20,\n  "max_temperature": 100,\n  "units_temperature": "ºC",\n  "service": "general-purpose industrial applications"\n}',
              type: 'text',
            },
          ],
        },
        {
          role: 'user',
          content: [
            {
              text: '{\r\n    "valve type": "ball valve",\r\n    "size": "2\\"",\r\n    "class": "Rated to 600 API 6D",\r\n    "operation": "Manual lever-operated ",\r\n    "construction": "floating",\r\n    "bore": "FB",\r\n    "ends": "NPT male connection",\r\n    "standard": "API 6D",\r\n    "tag": "N/A",\r\n    "body": "carbon steel",\r\n    "ball": "stainless steel",\r\n    "stem": "stainless steel",\r\n    "seat": "PTFE",\r\n    "seals": "N/F",\r\n    "min_temperature": -50,\r\n    "max_temperature": 200,\r\n    "units_temperature": "ºC",\r\n    "service": "water, steam, and air",\r \n  },',
              type: 'text',
            },
          ],
        },
        {
          role: 'assistant',
          content: [
            {
              text: '{\n    "valve type": "ball valve",\n    "size": 50,\n    "class": 600,\n    "operation": "manual",\n    "construction": "floating",\n    "bore": "FB",\n    "ends": "M-NPT",\n    "standard": "API 6D",\n    "tag": "N/A",\n    "body": "CS",\n    "ball": "SS316",\n    "stem": "SS316",\n    "seat": "PTFE",\n    "seals": "N/F",\n    "min_temperature": -50,\n    "max_temperature": 200,\n    "units_temperature": "ºC",\n    "service": "water, steam, and air"\n  }',
              type: 'text',
            },
          ],
        },
        {
          role: 'user',
          content: [
            {
              text: '{\r\n    "valve type": "ball valve",\r\n    "size": "2\\"",\r\n    "class": "class900",\r\n    "operation": "electric",\r\n    "construction": "N/F",\r\n    "bore": "FB",\r\n    "ends": "flanged",\r\n    "standard": "API 6D",\r\n    "tag": "N/F",\r\n    "body": "A350 LF2 cl1",\r\n    "ball": "inconel",\r\n    "stem": "inconel",\r\n    "seat": "PEEK",\r\n    "seals": "N/F",\r\n    "min_temperature": -20,\r\n    "max_temperature": 80,\r\n    "units_temperature": "ºF",\r\n    "service": "hydrocarbon fluids, crude oil and gasoline",\r \n  },',
              type: 'text',
            },
          ],
        },
        {
          role: 'assistant',
          content: [
            {
              text: '{\n    "valve type": "ball valve",\n    "size": 50,\n    "class": "900",\n    "operation": "electric",\n    "construction": "N/F",\n    "bore": "FB",\n    "ends": "RF",\n    "standard": "API 6D",\n    "tag": "N/F",\n    "body": "A350 LF2 cl1",\n    "ball": "inconel",\n    "stem": "inconel",\n    "seat": "PEEK",\n    "seals": "N/F",\n    "min_temperature": -20,\n    "max_temperature": 80,\n    "units_temperature": "ºF",\n    "service": "hydrocarbon fluids, crude oil and gasoline"\n}',
              type: 'text',
            },
          ],
        },
        {
          role: 'user',
          content: [
            {
              text: '{\r\n    "valve type": "ball valve",\r\n    "size": "6\\"",\r\n    "class": "300#",\r\n    "operation": "Manual Gearbox-Operated",\r\n    "construction": "trunnion",\r\n    "bore": "RB",\r\n    "ends": "FL",\r\n    "standard": "N/F",\r\n    "tag": "N/F",\r\n    "body": "A216 WCB",\r\n    "ball": "monel",\r\n    "stem": "monel",\r\n    "seat": "PTFE",\r\n    "seals": "o-rings",\r\n    "min_temperature": "N/F",\r\n    "max_temperature": 200,\r\n    "units_temperature": "ºC",\r\n    "service": "water, steam, and air services",\r \n  },',
              type: 'text',
            },
          ],
        },
        {
          role: 'assistant',
          content: [
            {
              text: '{\n    "valve type": "ball valve",\n    "size": 150,\n    "class": 300,\n    "operation": "manual",\n    "construction": "trunnion",\n    "bore": "RB",\n    "ends": "RF",\n    "standard": "N/F",\n    "tag": "N/F",\n    "body": "WCC",\n    "ball": "monel",\n    "stem": "monel",\n    "seat": "PTFE",\n    "seals": "o-rings",\n    "min_temperature": "N/F",\n    "max_temperature": 200,\n    "units_temperature": "ºC",\n    "service": "water, steam, and air services"\n  }',
              type: 'text',
            },
          ],
        },
        {
          role: 'user',
          content: [
            {
              text: '{\r\n    "valve type": "ball valve",\r\n    "size": "200 DN",\r\n    "class": "1500#",\r\n    "operation": "electric",\r\n    "construction": "N/F",\r\n    "bore": "full port",\r\n    "ends": "RTJ",\r\n    "standard": "API 6D",\r\n    "tag": "080-UZV-11032",\r\n    "body": "A182 F51",\r\n    "ball": "inconel",\r\n    "stem": "inconel",\r\n    "seat": "RPTFE",\r\n    "seals": "N/F",\r\n    "min_temperature": -20,\r\n    "max_temperature": 80,\r\n    "units_temperature": "ºF",\r\n    "service": "hydrocarbon fluids, such as crude oil and gasoline",\r \n  }',
              type: 'text',
            },
          ],
        },
        {
          role: 'assistant',
          content: [
            {
              text: '{\n    "valve type": "ball valve",\n    "size": 200,\n    "class": 1500,\n    "operation": "electric",\n    "construction": "N/F",\n    "bore": "FB",\n    "ends": "RTJ",\n    "standard": "API 6D",\n    "tag": "080-UZV-11032",\n    "body": "F51",\n    "ball": "inconel",\n    "stem": "inconel",\n    "seat": "PTFE",\n    "seals": "N/F",\n    "min_temperature": -20,\n    "max_temperature": 80,\n    "units_temperature": "ºF",\n    "service": "hydrocarbon fluids, such as crude oil and gasoline"\n  }',
              type: 'text',
            },
          ],
        },
        {
          role: 'user',
          content: [
            {
              text: '{\r\n    "valve type": "N/F",\r\n    "size": "2 in",\r\n    "class": "150#",\r\n    "operation": "pneumatic",\r\n    "construction": "Fl",\r\n    "bore": "Reduced",\r\n    "ends": "RF",\r\n    "standard": "N/F",\r\n    "tag": "N/F",\r\n    "body": "A105",\r\n    "ball": "SS316",\r\n    "stem": "SS316",\r\n    "seat": "N/F",\r\n    "seals": "N/F",\r\n    "min_temperature": "N/F",\r\n    "max_temperature": "N/F",\r\n    "units_temperature": "N/F",\r\n    "service": "hydrocarbon",\r \n  }',
              type: 'text',
            },
          ],
        },
        {
          role: 'assistant',
          content: [
            {
              text: '{\n    "valve type": "N/F",\n    "size": 50,\n    "class": 150,\n    "operation": "pneumatic",\n    "construction": "Fl",\n    "bore": "RB",\n    "ends": "RF",\n    "standard": "N/F",\n    "tag": "N/F",\n    "body": "A105",\n    "ball": "SS316",\n    "stem": "SS316",\n    "seat": "N/F",\n    "seals": "N/F",\n    "min_temperature": "N/F",\n    "max_temperature": "N/F",\n    "units_temperature": "N/F",\n    "service": "hydrocarbon"\n}',
              type: 'text',
            },
          ],
        },
        {
          role: 'user',
          content: [
            {
              text: '{\r\n    "valve type": "ball valve",\r\n    "size": "14\\"",\r\n    "class": "150#",\r\n    "operation": "N/F",\r\n    "construction": "N/F",\r\n    "bore": "reduced port",\r\n    "ends": "RF",\r\n    "standard": "API 6D",\r\n    "tag": "N/F",\r\n    "body": "SS316L (dual certificate)",\r\n    "ball": "SS316L (dual certificate)",\r\n    "stem": "N/F",\r\n    "seat": "stellite-6",\r\n    "seals": "graphite packing",\r\n    "min_temperature": "N/F",\r\n    "max_temperature": 350,\r\n    "units_temperature": "ºC",\r\n    "service": "flare gas",\r \n  }',
              type: 'text',
            },
          ],
        },
        {
          role: 'assistant',
          content: [
            {
              text: '{\n    "valve type": "ball valve",\n    "size": 350,\n    "class": 150,\n    "operation": "N/F",\n    "construction": "N/F",\n    "bore": "RB",\n    "ends": "RF",\n    "standard": "API 6D",\n    "tag": "N/F",\n    "body": "SS316L",\n    "ball": "SS316L",\n    "stem": "N/F",\n    "seat": "STELLITE-6",\n    "seals": "graphite packing",\n    "min_temperature": "N/F",\n    "max_temperature": 350,\n    "units_temperature": "ºC",\n    "service": "flare gas"\n}',
              type: 'text',
            },
          ],
        },
        {
          role: 'user',
          content: [
            {
              text: '{\r\n    "valve type": "gate valve",\r\n    "size": "10 inch",\r\n    "class": "class 300",\r\n    "operation": "oval lever",\r\n    "construction": "trunnion",\r\n    "bore": "full bore",\r\n    "ends": "RF",\r\n    "standard": "ISO 17292",\r\n    "tag": "N/F",\r\n    "body": "monel",\r\n    "ball": "monel",\r\n    "stem": "monel",\r\n    "seat": "metal",\r\n    "seals": "graphite seals",\r\n    "min_temperature": 0,\r\n    "max_temperature": 450,\r\n    "units_temperature": "ºF",\r\n    "service": "N/F",\r \n  }',
              type: 'text',
            },
          ],
        },
        {
          role: 'assistant',
          content: [
            {
              text: '{\n    "valve type": "gate valve",\n    "size": 250,\n    "class": 300,\n    "operation": "manual",\n    "construction": "trunnion",\n    "bore": "FB",\n    "ends": "RF",\n    "standard": "ISO 17292",\n    "tag": "N/F",\n    "body": "monel",\n    "ball": "monel",\n    "stem": "monel",\n    "seat": "metal",\n    "seals": "N/F",\n    "min_temperature": 0,\n    "max_temperature": 450,\n    "units_temperature": "ºF",\n    "service": "N/F"\n  }',
              type: 'text',
            },
          ],
        },
        {
          role: 'user',
          content: [
            {
              text: '{\r\n    "valve type": "ball valve",\r\n    "size": "3\\"",\r\n    "class": "2500",\r\n    "operation": "Electric",\r\n    "construction": "N/F",\r\n    "bore": "Reduced Bore",\r\n    "ends": "FNPT",\r\n    "standard": "N/F",\r\n    "tag": "096-XV-39436",\r\n    "body": "Forged Stainless Steel (SS316)",\r\n    "ball": "trim 10",\r\n    "stem": "trim 10",\r\n    "seat": "N/F",\r\n    "seals": "N/F",\r\n    "min_temperature": "N/F",\r\n    "max_temperature": "N/F",\r\n    "units_temperature": "N/F",\r\n    "service": "Hydrogen, Propane, and Natural Gas", \n  }',
              type: 'text',
            },
          ],
        },
        {
          role: 'assistant',
          content: [
            {
              text: '{\n    "valve type": "ball valve",\n    "size": 75,\n    "class": 2500,\n    "operation": "electric",\n    "construction": "N/F",\n    "bore": "RB",\n    "ends": "FNPT",\n    "standard": "N/F",\n    "tag": "096-XV-39436",\n    "body": "SS316",\n    "ball": "trim 10",\n    "stem": "trim 10",\n    "seat": "N/F",\n    "seals": "N/F",\n    "min_temperature": "N/F",\n    "max_temperature": "N/F",\n    "units_temperature": "N/F",\n    "service": "Hydrogen, Propane, and Natural Gas"\n}',
              type: 'text',
            },
          ],
        },
        {
          role: 'user',
          content: [
            {
              text: '{\r\n    "valve type": "Valve Type: Ball",\r\n    "size": "4 inches",\r\n    "class": "300 lbs",\r\n    "operation": "Pneumatic",\r\n    "construction": "N/F",\r\n    "bore": "N/F",\r\n    "ends": "Socket Welded (SW)",\r\n    "standard": "API 608",\r\n    "tag": "3456",\r\n    "body": "Carbon Steel (A105)",\r\n    "ball": "Stainless Steel (SS316L)",\r\n    "stem": "Stainless Steel (SS316L)",\r\n    "seat": "filled ptfe",\r\n    "seals": "lip seals",\r\n    "min_temperature": -20,\r\n    "max_temperature": 120,\r\n    "units_temperature": "ºC",\r\n    "service": "Water, Air, and Steam", \n  }',
              type: 'text',
            },
          ],
        },
        {
          role: 'assistant',
          content: [
            {
              text: '{\n    "valve type": "Valve Type: Ball",\n    "size": 100,\n    "class": 300,\n    "operation": "pneumatic",\n    "construction": "N/F",\n    "bore": "N/F",\n    "ends": "Socket Welded (SW)",\n    "standard": "API 608",\n    "tag": "3456",\n    "body": "A105",\n    "ball": "SS316L",\n    "stem": "SS316L",\n    "seat": "FILLED PTFE",\n    "seals": "LS",\n    "min_temperature": -20,\n    "max_temperature": 120,\n    "units_temperature": "ºC",\n    "service": "Water, Air, and Steam"\n}',
              type: 'text',
            },
          ],
        },
        {
          role: 'user',
          content: descriptions,
        },
      ],

      temperature: 1,
      max_tokens: 2048,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    })

    console.log(response)
    const content = response.choices[0].message.content
    console.log(content)
    return JSON.parse(content)
  } catch (error) {
    console.error('Error processing valve descriptions:', error)
    throw new Error('Failed to process valve descriptions: ' + error.message)
  }
}
