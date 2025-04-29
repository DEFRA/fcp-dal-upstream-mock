import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

export function loadFromFixtures(filePath) {
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = path.dirname(__filename)
  const fullPath = path.join(__dirname, '../../fixtures', filePath)

  try {
    return JSON.parse(fs.readFileSync(fullPath, 'utf8'))
  } catch {
    return null
  }
}
