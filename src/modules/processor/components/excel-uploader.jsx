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

  const processResults = (data) => {
    return data.map((item) => {
      // Lógica de temperatura
      if (item.temperaturaC === 'N/F') {
        const tempMinC = ((item.temperaturaMinF - 32) * 5) / 9
        const tempMaxC = ((item.temperaturaMaxF - 32) * 5) / 9
        item.temperatura = `${tempMinC.toFixed(2)} ºC / ${tempMaxC.toFixed(2)} ºC`
        item.temperaturaMinC = tempMinC
        item.temperaturaMaxC = tempMaxC
      }

      // Lógica de pintura
      if (item.body.includes('CS') || item.body.includes('A105') || item.body.includes('WC')) {
        item.painting = 'CS VALVES PAINTED ACC. PROJECT SPECS'
      } else {
        item.painting = 'NOT PAINTED'
      }

      // Lógica BALL CONSTRUCTION
      if (item.size > 75 && item.ballConstruction === 'floating') {
        item.ballConstruction = 'trunnion'
      }

      // Lógica MODEL
      if (item.ballConstruction === 'trunnion') {
        if (item.size < 150) {
          item.model = 'APT'
        } else if (item.size > 150) {
          item.model = 'TSB'
        } else if (item.size === 150) {
          if (item.bore === 'RB' || item.bore === 'FB') {
            item.model = 'APT'
          }
        }
      } else if (item.ballConstruction === 'floating') {
        if (item.ends === 'SW') {
          if (item.class === 300) {
            item.model = 'SR8'
          } else if (item.class > 800) {
            item.model = item.end_user === 'ARAMCO' ? 'Q3' : 'SR8'
          } else if (item.class > 300) {
            item.model = 'AP'
          }
        } else if (item.class < 600) {
          item.model = 'FB'
        }
      }

      // Lógica SEAT
      if (item.class < 600) {
        if (item.seat === 'N/F' || item.seat === 'PTFE' || item.seat === 'RPTFE') {
          item.seat = 'PTFE MOD + RCAR'
        }
      } else {
        if (item.seat === 'N/F' || item.seat === 'PTFE' || item.seat === 'RPTFE') {
          item.seat = 'PEEK'
        }
      }

      if (item.seat === 'metal' || item.seat === 'stellite-6') {
        if (item.temperaturaMaxC > 200) {
          item.seat = `${item.ball} + Chromium Carbide Coating`
          item.seals = 'GRAPHITE'
        } else if (item.temperaturaMaxC < 200) {
          item.seat = `${item.ball} + Tungsten Carbide Coating`
          item.seatHousing = 'N/A'
          item.ball = item.seat
        }
      }

      // Lógica TRIM
      if (item.ball === 'N/F') {
        item.ball = 'SS316'
      }
      if (item.stem === 'N/F') {
        item.stem = item.ball
      }

      // Lógica SEAT HOUSING
      item.seatHousing = item.ballConstruction === 'trunnion' ? item.ball : 'N/A'

      // Lógica STANDARD
      if (item.design === 'N/F') {
        item.design = item.ballConstruction === 'floating' ? 'ISO 17292' : 'API 6D'
      }

      // Lógica CLASS
      item.class = `${item.class}#`

      // Lógica INJECTORS
      if (item.size > 150) {
        item.injectors = 'SEAT & STEM INJECTORS'
      }

      // Lógica 9COM
      if (item.end_user !== 'ARAMCO') {
        item['9COM'] = 'N/A'
      } else {
        if (item.ballConstruction === 'trunnion') {
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
