import json2xml from 'json2xml';
import fs from 'fs';
export default function generateNFO(filePath: string, metadata: JSON): void {
    const xmlStr = json2xml(metadata)
    fs.writeFileSync(filePath + '.NFO', xmlStr)
}