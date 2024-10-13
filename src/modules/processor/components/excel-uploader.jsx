'use client'

import React, { useState } from 'react'
import * as XLSX from 'xlsx'
import { Input } from '@modules/commons/ui/input'
import { Button } from '@modules/commons/ui/button'
import { processDescriptionsToRfq, processRfqToJson } from '@modules/offers/actions'

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

      // Aplicar la lógica 9COM
      if (item.end_user !== 'ARAMCO') {
        item['9COM'] = 'N/A'
      } else {
        if (item.construction === 'trunnion') {
          if (item.seat !== 'metal') {
            item['9COM'] = 6000000250
          } else {
            item.available = false
          }
        } else {
          if (item.size < 50) {
            item['9COM'] = 6000000240
          } else {
            item['9COM'] = 6000000239
          }
        }
      }

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

    try {
      // Read the uploaded file
      const uploadedData = await readUploadedFile(file)

      // Process the descriptions
      const processedResults = await processDescriptions(uploadedData)

      // Generate Excel file from processed results
      generateExcelFile(processedResults)

      setResults(processedResults)
    } catch (err) {
      setError('Error al procesar el archivo: ' + err.message)
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const readUploadedFile = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target.result)
          const workbook = XLSX.read(data, { type: 'array' })
          const sheetName = workbook.SheetNames[0]
          const worksheet = workbook.Sheets[sheetName]
          const aoa = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: '' })

          // Find the headers row (row with "DESCRIPTION" in it)
          const headersRow = aoa.findIndex((row) => row.includes('DESCRIPTION'))
          if (headersRow === -1) throw new Error('Headers row not found')

          // Extract descriptions from the "DESCRIPTION" column
          const descriptionColumnIndex = aoa[headersRow].indexOf('DESCRIPTION')
          if (descriptionColumnIndex === -1) throw new Error('DESCRIPTION column not found')

          const descriptions = aoa
            .slice(headersRow + 1)
            .map((row) => row[descriptionColumnIndex])
            .filter((desc) => desc && desc.trim() !== '')

          resolve(descriptions)
        } catch (err) {
          reject(err)
        }
      }
      reader.onerror = (err) => reject(err)
      reader.readAsArrayBuffer(file)
    })
  }

  const processDescriptions = async (descriptions) => {
    const processedResults = []
    for (const description of descriptions) {
      const resultRfq = await processDescriptionsToRfq(description)
      const result = await processRfqToJson(resultRfq)
      processedResults.push(result)
    }
    return processResults(processedResults)
  }

  const generateExcelFile = (processedResults) => {
    // Define the headers
    const headers = [
      'ITEM',
      'DESCRIPTION',
      'SIZE',
      'CLASS',
      'OPERATION',
      'BODY CONSTRUCTION',
      'BALL CONSTRUCTION',
      'VALVE ENDS',
      'DESIGN',
      'TAG',
      'BODY',
      'BALL',
      'STEM',
      'SERVICE',
    ]

    // Create the worksheet data
    const wsData = [
      headers,
      ...processedResults.map((item, index) => [
        index + 1,
        item['valve type'],
        item.size,
        item.class,
        item.operation,
        item.construction,
        item.bore,
        item.ends,
        item.standard,
        item.tag,
        item.body,
        item.ball,
        item.stem,
        item.service,
      ]),
    ]

    // Create a new workbook and add the worksheet
    const wb = XLSX.utils.book_new()
    const ws = XLSX.utils.aoa_to_sheet(wsData)

    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Processed Valves')

    // Generate Excel file
    XLSX.writeFile(wb, 'processed_valve_data.xlsx')
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
