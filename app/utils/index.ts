// import * as R from 'ramda';
import fs from 'fs-extra';
import path from 'path';
export const generateFileTree = (paths: Array<string>) => {
    const result = {
        title: 'res',
        key: "0",
        children: []
    }
    function walk(wpath, key) {
        let walkRes = {
            title: '',
            key,
            children: []
        }
        if (isDir(wpath)) {
            walkRes.title = path.basename(wpath)
            let wpaths = fs.readdirSync(wpath)
            wpaths.map((dpath, index) => {
                dpath = path.join(wpath, dpath)
                walkRes.children.push(walk(dpath, `${key}-${index}`))
            })
        } else {
            walkRes = {
                title: path.basename(wpath),
                key,
                children: null
            }
        }

        return walkRes
    }
    paths.forEach((spath, index) => {
        result.children.push(walk(spath, `0-${index}`))
    })
    return result
}
export function isDir(spath: string) {
    let stats = fs.statSync(spath)
    return stats.isDirectory()
}

