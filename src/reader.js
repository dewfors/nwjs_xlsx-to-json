// const XlsxPopulate = require('xlsx-populate');

// import XlsxPopulate from 'xlsx-populate';

// var fileinput = document.querySelector('input[type=file]');
// var files = fileinput.files;
//
// console.log(files[0].pathname);


const fileNameElement = document.querySelector('#upload-file');



const loadFile = () => {
    const file = fileNameElement.files[0];
    const fileName = file.name;
    const filePath = file.path;

    const path = filePath.replace(fileName,'');

    console.log(fileName);
    console.log(filePath);
    console.log(path);

    // const matches = FILE_TYPES.some((it) => {
    //     return fileName.endsWith(it);
    // });
    //
    // if (matches) {
    //     const reader = new FileReader();
    //
    //     reader.addEventListener('load', () => {
    //         preview.src = reader.result;
    //     });
    //
    //     reader.readAsDataURL(file);
    // }

    const fs = nw.require('fs');
// const fs = require('fs');


    // const outputFile = path + "data.json";
    const outputFile = path + "data.txt";

    /* set up XMLHttpRequest */
    var url = filePath;
    var oReq = new XMLHttpRequest();
    oReq.open("GET", url, true);
    oReq.responseType = "arraybuffer";

    oReq.onload = function (e) {
        var arraybuffer = oReq.response;

        /* convert data to binary string */
        var data = new Uint8Array(arraybuffer);
        var arr = new Array();
        for (var i = 0; i !== data.length; ++i) arr[i] = String.fromCharCode(data[i]);
        var bstr = arr.join("");

        /* Call XLSX */
        var workbook = XLSX.read(bstr, {type: "binary"});

        /* DO SOMETHING WITH workbook HERE */
        var first_sheet_name = workbook.SheetNames[0];
        /* Get worksheet */
        var worksheet = workbook.Sheets[first_sheet_name];
        // console.log(XLSX.utils.sheet_to_json(worksheet,{raw:true}));
        console.log(XLSX.utils.sheet_to_json(worksheet, {header: "A"}));
        // console.log(XLSX.utils.sheet_to_json(worksheet,{header:"A", cellDates: false}));

        const sportmens = XLSX.utils.sheet_to_json(worksheet, {header: "A"});
        const jsonSportmens = JSON.stringify(sportmens)
        //
        // // запись в файл
        fs.writeFileSync(outputFile, jsonSportmens, "utf8");

    }

    oReq.send();




};

fileNameElement.addEventListener('change', loadFile);





// const fs = nw.require('fs');
// // const fs = require('fs');
//
//
// const outputFile = "./data.json";
//
// /* set up XMLHttpRequest */
// var url = "test.xlsx";
// var oReq = new XMLHttpRequest();
// oReq.open("GET", url, true);
// oReq.responseType = "arraybuffer";
//
// oReq.onload = function(e) {
//     var arraybuffer = oReq.response;
//
//     /* convert data to binary string */
//     var data = new Uint8Array(arraybuffer);
//     var arr = new Array();
//     for(var i = 0; i !== data.length; ++i) arr[i] = String.fromCharCode(data[i]);
//     var bstr = arr.join("");
//
//     /* Call XLSX */
//     var workbook = XLSX.read(bstr, {type:"binary"});
//
//     /* DO SOMETHING WITH workbook HERE */
//     var first_sheet_name = workbook.SheetNames[0];
//     /* Get worksheet */
//     var worksheet = workbook.Sheets[first_sheet_name];
//     // console.log(XLSX.utils.sheet_to_json(worksheet,{raw:true}));
//     console.log(XLSX.utils.sheet_to_json(worksheet,{header:"A"}));
//     // console.log(XLSX.utils.sheet_to_json(worksheet,{header:"A", cellDates: false}));
//
//     const sportmens = XLSX.utils.sheet_to_json(worksheet,{header:"A"});
//     const jsonSportmens = JSON.stringify(sportmens)
//     //
//     // // запись в файл
//     fs.writeFileSync(outputFile, jsonSportmens, "utf8");
//
// }
//
// oReq.send();








// console.log(XlsxPopulate);

// const openFile = () => {
//     const input = document.createElement('input');
//     input.type = 'file';
//
//     input.onchange = function () {
//         console.log(this.files[0]);
//     }
//
//     // input.addEventListener('onchange', () => {
//     //     console.log(input);
//     // })
//
//     input.click();
// }
//
// const saveFileAs = () => {
//     const input = document.createElement('input');
//     input.type = 'file';
//     input.nwsaveas = '*.txt';
//
//     input.onchange = function () {
//         fs.writeFile('message.txt', 'Hello', () => {
//             console.log('yes');
//         })
//     }
//
//
// }
//

