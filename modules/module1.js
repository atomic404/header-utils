const LBL = require('line-by-line');
const fs = require('fs');

module.exports = (qt = "'") => {
    var file = new LBL(`./headers.txt`);
    var fileLength = fs.readFileSync(`./headers.txt`).toString().split("\n").length;
    var currentLength = 0;
    var output = "";
    
    file.on("line", function (line) {
        currentLength++;
        if (line.startsWith(":")) {
            let a = line.split(":").filter((e) => { return e != null && e != "" });
            a[0] = `:${a[0]}`;
            a[1] = a[1].replace(/^( )/g, "");
            a[1] = a[1].replace(/( )$/g, "");
            output += `${qt}${a[0]}${qt}: ${qt}${a[1].replace(`${qt}`, '\\'+qt+'')}${qt},\n`;
        } else {
            let a = line.split(/:(.*)/s).filter((e) => { return e != null && e != "" });
            a[1] = a[1].replace(/^( )/g, "");
            a[1] = a[1].replace(/( )$/g, "");
            if (!(currentLength === fileLength)) output += `${qt}${a[0]}${qt}: ${qt}${a[1]}${qt},\n`;
            else output += `${qt}${a[0]}${qt}: ${qt}${a[1].replace(`${qt}`, '\\'+qt+'')}${qt}\n`;
        }
    });
    
    file.on("end", function () {
        console.clear();
        return console.log(output)
    })
};
