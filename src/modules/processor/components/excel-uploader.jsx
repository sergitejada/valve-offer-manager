'use client'

import React, { useState } from 'react'
import * as XLSX from 'xlsx'
import { processValveDescriptions } from '@modules/offers/actions'
import { Input } from '@modules/commons/ui/input'
import { Button } from '@modules/commons/ui/button'

export default function ExcelValveProcessor() {
  const [file, setFile] = useState(null)
  const [results, setResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    setFile(file)
  }

  const convertInchToDN = (size) => {
    // Eliminar cualquier espacio y convertir a minúsculas
    size = size.toString().trim().toLowerCase()

    // Verificar si el tamaño ya está en DN
    if (size.endsWith('dn') || size.endsWith('nps')) {
      return parseInt(size)
    }

    // Eliminar cualquier unidad ('in', '"', 'inch', 'inches')
    size = size.replace(/(in|"|inch|inches)$/, '').trim()

    // Convertir fracciones a decimales si es necesario
    if (size.includes('/')) {
      const [num, den] = size.split('/').map(Number)
      size = (num / den).toFixed(2)
    }

    // Convertir a número
    const sizeNum = parseFloat(size)

    // Aplicar la conversión basada en rangos
    if (sizeNum <= 0.5) return 15
    if (sizeNum <= 0.75) return 20
    if (sizeNum <= 1) return 25
    if (sizeNum <= 2) return 50
    if (sizeNum <= 3) return 80
    if (sizeNum <= 4) return 100
    if (sizeNum <= 6) return 150

    // Para tamaños > 6 pulgadas, usar la fórmula general
    return Math.round(sizeNum * 25)
  }

  const processResults = (data) => {
    return data.map((item) => {
      // Convertir tamaño a DN y asegurar que sea un entero
      item.size = convertInchToDN(item.size)

      return item
    })
  }

  const processFile = async () => {
    if (!file) {
      setError('Por favor, selecciona un archivo Excel primero.')
      return
    }

    setIsLoading(true)
    setError(null)
    setResults([])

    const reader = new FileReader()
    reader.onload = async (e) => {
      try {
        const data = new Uint8Array(e.target.result)
        const workbook = XLSX.read(data, { type: 'array' })
        const sheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[sheetName]

        // Convertir la hoja a un array de arrays
        const aoa = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: '' })

        // Filtrar filas vacías y extraer las descripciones
        const descriptions = aoa.filter((row) => row.length > 0 && row[0].trim() !== '').map((row) => row[0])

        console.log('Descripciones encontradas:', descriptions)

        const processedResults = []
        for (const description of descriptions) {
          const resultRfq = await processDescriptionsToRfq(description)
          const result = await processRfqToJson(resultRfq)
          processedResults.push(result)
        }

        const finalResults = processResults(processedResults)
        setResults(finalResults)
      } catch (err) {
        setError('Error al procesar el archivo: ' + err.message)
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }
    reader.readAsArrayBuffer(file)
  }

  return (
    <div className="mx-auto max-w-4xl p-4">
      <h1 className="mb-4 text-2xl font-bold">Procesador de Descripciones de Válvulas</h1>
      <div className="mb-4">
        <Input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} className="mb-2" />
        <Button onClick={processFile} disabled={isLoading || !file} className="w-full">
          {isLoading ? 'Procesando...' : 'Procesar Archivo'}
        </Button>
      </div>

      {error && <div className="mt-4 rounded border border-red-400 bg-red-100 p-2 text-red-700">{error}</div>}

      {results.length > 0 && (
        <div className="mt-4">
          <h2 className="mb-2 text-xl font-semibold">Resultados:</h2>
          {results.map((result, index) => (
            <div key={index} className="mb-4 rounded bg-gray-100 p-4">
              <h3 className="font-semibold">Ítem {index + 1}</h3>
              <pre className="overflow-x-auto">{JSON.stringify(result, null, 2)}</pre>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
