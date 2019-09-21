import xmljs from 'xml-js';

export const js2xml = data => xmljs.js2xml(data, { compact: true, spaces: 4 });
export const xml2js = xml => xmljs.xml2js(xml, { compact: true });
