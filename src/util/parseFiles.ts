export const parseFiles = (dir: String) => {
    var fs = require('fs');
    const fileNames = fs.readdirSync(dir);
    return fileNames;
}