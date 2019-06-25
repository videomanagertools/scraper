// import * as R from 'ramda';
import fs from 'fs-extra';
import path from 'path';
import { message } from 'antd';
export const generateFileTree = (paths: Array<string>) => {
    const result = []
    let fileCount = 0
    function walk(wpath, key) {
        let walkRes = {
            title: '',
            isDir: false,
            key,
            children: []
        }
        if (isDir(wpath)) {
            walkRes.title = path.basename(wpath)
            walkRes.isDir = true
            let wpaths = fs.readdirSync(wpath)
            wpaths.map((dpath, index) => {
                dpath = path.join(wpath, dpath)
                let child = walk(dpath, `${key}-${index}`)
                if (child) {
                    walkRes.children.push(child)
                }
            })
        } else {
            if (/(.mp4|.rmvb|.avi|.wmv)$/.test(wpath)) {
                walkRes = {
                    title: path.basename(wpath),
                    key,
                    isDir: false,
                    children: null
                }
                fileCount++
            } else {
                walkRes = null
            }
        }

        return walkRes
    }
    paths.forEach((spath, index) => {
        result.push(walk(spath, `0-${index}`))
    })
    if (fileCount === 0) {
        message.error('no media file')
        throw new Error('no media file')
    }
    return result
}
export function isDir(spath: string) {
    let stats = fs.statSync(spath)
    return stats.isDirectory()
}

export function flatTrees(trees: Object[]): Object {
    const result = {}
    function walk(arr) {
        arr.forEach(node => {
            result[node.key] = node
            if (node.children) {
                walk(node.children)
            }
        });
    }
    walk(trees)
    return result
}

