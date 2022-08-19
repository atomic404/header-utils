const LBL = require('line-by-line');
const fs = require('fs');

module.exports = () => {
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
            output += `Req.AddHeader("${a[0]}", "${a[1].replace(/"/g, '\\"')}");\n`;
        } else {
            let a = line.split(/:(.*)/s).filter((e) => { return e != null && e != "" });
            a[1] = a[1].replace(/^( )/g, "");
            a[1] = a[1].replace(/( )$/g, "");
            output += `Req.AddHeader("${a[0]}", "${a[1].replace(/"/g, '\\"')}");\n`;
        }
    });
    
    file.on("end", function () {
        console.clear();
        return console.log(output)
    })
};
