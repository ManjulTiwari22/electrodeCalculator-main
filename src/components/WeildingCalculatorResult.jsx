"use client"

import { useState, useEffect } from "react"

// Constants for metal deposition per electrode
const METAL_DEPOSITION = {
  "IS 2062 GR.B": { 3.15: 0.0182, "4.00": 0.0288 },
  "SA 516 GR.60": { 3.15: 0.0182, "4.00": 0.0288 },
  "SA 516 GR.65": { 3.15: 0.0182, "4.00": 0.0288 },
  "SA 516 GR.70": { 3.15: 0.0182, "4.00": 0.0288 },
  "SA 387 GR11 CL2": { 3.15: 0.0182, "4.00": 0.0288 },
  "SA537 CL-1": { 3.15: 0.0182, "4.00": 0.0288 },
  "SA 240 GR.304L": { 3.15: 0.0189, "4.00": 0.0299 },
  "SA 240 GR.304": { 3.15: 0.0189, "4.00": 0.0299 },
  "SA 240 GR.316": { 3.15: 0.0189, "4.00": 0.0299 },
  "SA 240 GR.316L": { 3.15: 0.0189, "4.00": 0.0299 },
  "SA 240 GR.317L": { 3.15: 0.0189, "4.00": 0.0299 },
  "SA 240 GR.321": { 3.15: 0.0189, "4.00": 0.0299 },
  "SA 240 UNS 32205": { 3.15: 0.0181, "4.00": 0.0292 },
  "SA 240 UNS 31803": { 3.15: 0.0181, "4.00": 0.0292 },
  "SB424 UNS NO8825": { 3.15: 0.0188, "4.00": 0.0304 },
  "SA 240 UNS 32750": { 3.15: 0.0182, "4.00": 0.0288 },
  "SB 127 UNS N04400": { 3.15: 0.0204, "4.00": 0.0331 },
  "SB 168 UNS N06600": { 3.15: 0.0196, "4.00": 0.0317 },
}

// Helper functions
const calculateWidth = (bevelAngle, thickness) => Math.tan(((bevelAngle / 2) * Math.PI) / 180) * thickness

const calculateArea = (width, thickness, rootGap, afterBG = 3.14 * 8 * 8) => {
  const A1 = width * thickness
  const A2 = rootGap * thickness
  const A3 = (width * 2 + rootGap) * 3
  return A1 + A2 + A3 + afterBG
}

const calculateVolume = (totalArea, dimension, isCircumference = false) => {
  const factor = isCircumference ? Math.PI : 1
  return (totalArea * dimension * factor) / 1000
}

const calculateWeldDeposition = (volume, density) => (volume * density) / 1000

// Welding calculation functions
const singleVCircSeam = (params) => {
  const { bevelAngle, thickness, rootGap, id, density } = params
  const width = calculateWidth(bevelAngle, thickness)
  const totalArea = calculateArea(width, thickness, rootGap)
  const circumference = (id + thickness) * Math.PI
  const volume = calculateVolume(totalArea, circumference, true)
  return calculateWeldDeposition(volume, density)
}

const singleVLongSeam = (params) => {
  const { bevelAngle, thickness, rootGap, length, density } = params
  const width = calculateWidth(bevelAngle, thickness)
  const totalArea = calculateArea(width, thickness, rootGap)
  const volume = calculateVolume(totalArea, length)
  return calculateWeldDeposition(volume, density)
}

const singleVNozzle = (params) => {
  const { bevelAngle, thickness, rootGap, od, density } = params
  const width = calculateWidth(bevelAngle, thickness)
  const totalArea = calculateArea(width, thickness, rootGap)
  const circumference = od
  const volume = calculateVolume(totalArea, circumference)
  return calculateWeldDeposition(volume, density)
}

const doubleVCircSeam = (params) => {
  const { bevelAngle, thickness, rootGap, id, density } = params
  const th1 = (2 / 3) * thickness
  const th2 = (1 / 3) * thickness
  const width1 = calculateWidth(bevelAngle, th1)
  const width2 = calculateWidth(bevelAngle, th2)
  const A1 = th1 * width1
  const A2 = th2 * width2
  const A3 = rootGap * thickness
  const A4 = 3.14 * 8 * 8
  const A5 = (width1 + width2 + rootGap + 6) * 2 * 3
  const totalArea = A1 + A2 + A3 + A4 + A5
  const circumference = (id + thickness) * Math.PI
  const volume = calculateVolume(totalArea, circumference, true)
  return calculateWeldDeposition(volume, density)
}

const doubleVLongSeam = (params) => {
  const { bevelAngle, thickness, rootGap, length, density } = params
  const th1 = (2 / 3) * thickness
  const th2 = (1 / 3) * thickness
  const width1 = calculateWidth(bevelAngle, th1)
  const width2 = calculateWidth(bevelAngle, th2)
  const A1 = th1 * width1
  const A2 = th2 * width2
  const A3 = rootGap * thickness
  const A4 = 3.14 * 8 * 8
  const A5 = (width1 + width2 + rootGap + 6) * 2 * 3
  const totalArea = A1 + A2 + A3 + A4 + A5
  const volume = calculateVolume(totalArea, length)
  return calculateWeldDeposition(volume, density)
}

const doubleVNozzle = (params) => {
  const { bevelAngle, thickness, rootGap, od, density } = params
  const th1 = (2 / 3) * thickness
  const th2 = (1 / 3) * thickness
  const width1 = calculateWidth(bevelAngle, th1)
  const width2 = calculateWidth(bevelAngle, th2)
  const A1 = th1 * width1
  const A2 = th2 * width2
  const A3 = rootGap * thickness
  const A4 = 3.14 * 8 * 8
  const A5 = (width1 + width2 + rootGap + 6) * 2 * 3
  const totalArea = A1 + A2 + A3 + A4 + A5
  const circumference = od
  const volume = calculateVolume(totalArea, circumference)
  return calculateWeldDeposition(volume, density)
}

const jCircSeam = (params) => {
  const { bevelAngle, thickness, rootGap, rootFace, radius, id, density } = params
  const A1 = (Math.PI * radius * radius) / 2
  const height = thickness - radius - rootFace
  const width = calculateWidth(bevelAngle, height)
  const A2 = width * height
  const A3 = height * radius * 2
  const A4 = rootGap * thickness
  const A5 = (radius * 2 + width * 2 + 2 + 6) * 3
  const A6 = 3.14 * 10 * 10
  const totalArea = A1 + A2 + A3 + A4 + A5 + A6
  const circumference = (id + thickness) * Math.PI
  const volume = calculateVolume(totalArea, circumference, true)
  return calculateWeldDeposition(volume, density)
}

const jLongSeam = (params) => {
  const { bevelAngle, thickness, rootGap, rootFace, radius, length, density } = params
  const A1 = (Math.PI * radius * radius) / 2
  const height = thickness - radius - rootFace
  const width = calculateWidth(bevelAngle, height)
  const A2 = width * height
  const A3 = height * radius * 2
  const A4 = rootGap * thickness
  const A5 = (radius * 2 + width * 2 + 2 + 6) * 3
  const A6 = 3.14 * 10 * 10
  const totalArea = A1 + A2 + A3 + A4 + A5 + A6
  const volume = calculateVolume(totalArea, length)
  return calculateWeldDeposition(volume, density)
}

const jNozzle = (params) => {
  const { bevelAngle, thickness, rootGap, rootFace, radius, od, density } = params
  const A1 = (Math.PI * radius * radius) / 2
  const height = thickness - radius - rootFace
  const width = calculateWidth(bevelAngle, height)
  const A2 = width * height
  const A3 = height * radius * 2
  const A4 = rootGap * thickness
  const A5 = (radius * 2 + width * 2 + 2 + 6) * 3
  const A6 = 3.14 * 10 * 10
  const totalArea = A1 + A2 + A3 + A4 + A5 + A6
  const circumference = od
  const volume = calculateVolume(totalArea, circumference)
  return calculateWeldDeposition(volume, density)
}

const filletCircSeam = (params) => {
  const { bevelAngle, thickness, rootGap, filletSize, id, density } = params
  const A1 = (thickness * calculateWidth(bevelAngle, thickness) * thickness) / 2
  const A2 = rootGap * thickness
  const A3 = filletSize * filletSize * 0.5
  const A4 = 3.14 * 10 * 10
  const totalArea = A1 + A2 + A3 + A4
  const circumference = (id + thickness) * Math.PI
  const volume = calculateVolume(totalArea, circumference, true)
  return calculateWeldDeposition(volume, density)
}

const filletLongSeam = (params) => {
  const { bevelAngle, thickness, rootGap, filletSize, length, density } = params
  const A1 = (thickness * calculateWidth(bevelAngle, thickness) * thickness) / 2
  const A2 = rootGap * thickness
  const A3 = filletSize * filletSize * 0.5
  const A4 = 3.14 * 10 * 10
  const totalArea = A1 + A2 + A3 + A4
  const volume = calculateVolume(totalArea, length)
  return calculateWeldDeposition(volume, density)
}

const filletNozzle = (params) => {
  const { bevelAngle, thickness, rootGap, filletSize, od, density } = params
  const A1 = (thickness * calculateWidth(bevelAngle, thickness) * thickness) / 2
  const A2 = rootGap * thickness
  const A3 = filletSize * filletSize * 0.5
  const A4 = 3.14 * 10 * 10
  const totalArea = A1 + A2 + A3 + A4
  const circumference = od
  const volume = calculateVolume(totalArea, circumference)
  return calculateWeldDeposition(volume, density)
}

const WeldingCalculator = () => {
  const [results, setResults] = useState({})

  useEffect(() => {
    // Example form data (Replace with your data fetching logic)
    const formData = {
      material: "SA 516 GR.70",
      weldType: "singleV",
      seam: "all",
      bevelAngle: 30,
      thickness: 10,
      rootGap: 2,
      id: 1000,
      od: 50,
      length: 2000,
      density: 7.85,
      rootFace: 1,
      radius: 5,
      filletSize: 5,
      numCircSeams: 2,
      numLongSeams: 1,
      numNozzles: 4,
    }

    // Calculate weld depositions
    let totalCircDeposition = 0
    let totalLongDeposition = 0
    let totalNozzleDeposition = 0

    switch (formData.weldType) {
      case "singleV":
        if (formData.seam === "all" || formData.seam === "circ") {
          totalCircDeposition = singleVCircSeam(formData) * formData.numCircSeams
        }
        if (formData.seam === "all" || formData.seam === "long") {
          totalLongDeposition = singleVLongSeam(formData) * formData.numLongSeams
        }
        if (formData.seam === "all" || formData.seam === "nozzle") {
          totalNozzleDeposition = singleVNozzle(formData) * formData.numNozzles
        }
        break
      case "doubleV":
        if (formData.seam === "all" || formData.seam === "circ") {
          totalCircDeposition = doubleVCircSeam(formData) * formData.numCircSeams
        }
        if (formData.seam === "all" || formData.seam === "long") {
          totalLongDeposition = doubleVLongSeam(formData) * formData.numLongSeams
        }
        if (formData.seam === "all" || formData.seam === "nozzle") {
          totalNozzleDeposition = doubleVNozzle(formData) * formData.numNozzles
        }
        break
      case "j":
        if (formData.seam === "all" || formData.seam === "circ") {
          totalCircDeposition = jCircSeam(formData) * formData.numCircSeams
        }
        if (formData.seam === "all" || formData.seam === "long") {
          totalLongDeposition = jLongSeam(formData) * formData.numLongSeams
        }
        if (formData.seam === "all" || formData.seam === "nozzle") {
          totalNozzleDeposition = jNozzle(formData) * formData.numNozzles
        }
        break
      case "fillet":
        if (formData.seam === "all" || formData.seam === "circ") {
          totalCircDeposition = filletCircSeam(formData) * formData.numCircSeams
        }
        if (formData.seam === "all" || formData.seam === "long") {
          totalLongDeposition = filletLongSeam(formData) * formData.numLongSeams
        }
        if (formData.seam === "all" || formData.seam === "nozzle") {
          totalNozzleDeposition = filletNozzle(formData) * formData.numNozzles
        }
        break
    }

    const totalWeldDeposition = totalCircDeposition + totalLongDeposition + totalNozzleDeposition

    // Calculate electrode consumption
    const electrodeConsumption = {
      "3.15mm": Math.ceil(totalWeldDeposition / METAL_DEPOSITION[formData.material]["3.15"]),
      "4mm": Math.ceil(totalWeldDeposition / METAL_DEPOSITION[formData.material]["4.00"]),
    }

    // Calculate SAW consumption (10% more than total weld deposition)
    const sawConsumption = totalWeldDeposition * 1.1

    setResults({
      totalWeldDeposition,
      totalCircDeposition,
      totalLongDeposition,
      totalNozzleDeposition,
      electrodeConsumption,
      sawConsumption,
    })
  }, [])

  return (
<div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
  <div className="max-w-4xl w-full">
    {/* Header */}
    <div className="bg-white rounded-lg shadow-sm mb-6">
      <div className="bg-blue-600 text-white p-5 rounded-t-lg">
        <h3 className="text-2xl font-semibold text-center">Weld Deposition Calculator</h3>
      </div>
    </div>

    {/* Main Content */}
    <div className="space-y-6">
      {/* Weld Deposition Overview */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h4 className="text-xl font-semibold text-gray-800 mb-4">Weld Deposition Overview</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="font-medium text-gray-700">Total Weld Deposition (in kg):</p>
            <p className="text-lg font-bold text-blue-700 mt-1">
              {results?.totalWeldDeposition?.toFixed(2) || "--"}
            </p>
          </div>
          <div>
            <p className="font-medium text-gray-700">Longitudinal Weld Deposition:</p>
            <p className="text-lg font-bold text-blue-700 mt-1">
              {results?.totalLongDeposition?.toFixed(2) || "--"}
            </p>
          </div>
          <div>
            <p className="font-medium text-gray-700">Circumferential Weld Deposition:</p>
            <p className="text-lg font-bold text-blue-700 mt-1">
              {results?.totalCircDeposition?.toFixed(2) || "--"}
            </p>
          </div>
          <div>
            <p className="font-medium text-gray-700">Total Nozzles Weld Deposition:</p>
            <p className="text-lg font-bold text-blue-700 mt-1">
              {results?.totalNozzleDeposition?.toFixed(2) || "--"}
            </p>
          </div>
        </div>
      </div>

      {/* Electrode Consumption */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h4 className="text-xl font-semibold text-gray-800 mb-4">Electrode Consumption</h4>
        <table className="w-full border border-gray-300 text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 font-medium text-gray-700">Size</th>
              <th className="p-3 font-medium text-gray-700">Quantity</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-3">Φ 3.15 mm</td>
              <td className="p-3">{results?.electrodeConsumption?.["3.15mm"] || "--"}</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="p-3">Φ 4.00 mm</td>
              <td className="p-3">{results?.electrodeConsumption?.["4mm"] || "--"}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* SAW Consumption */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h4 className="text-xl font-semibold text-gray-800 mb-4">SAW Consumption</h4>
        <p className="text-lg font-bold text-blue-700">
          {results?.sawConsumption?.toFixed(2) || "--"} kg
        </p>
      </div>
    </div>
  </div>
</div>


  
    
  )
}

export default WeldingCalculator

