import json2xml from 'json2xml';
import fs from 'fs';

export default function generateNFO(filePath: string, metadata: any): void {
  const xmlStr = json2xml(metadata, { header: true });
  fs.writeFileSync(`${filePath}.nfo`, xmlStr);
}
