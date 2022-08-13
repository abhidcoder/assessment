const express = require("express");
const fs = require("fs");
const app = express();
const path = require('path')
var PDFParser = require('pdf2json');
var browser= require("browser")
const PDFDocument = require('pdfkit');
var pdf = require('html-pdf');

app.use(express.json());







  const middleware2= async(req, res, next)=>{
      const sourceFile="./views/expe.pdf";
      var pdfFilePath = sourceFile;
      var ee=""

      if (fs.existsSync(pdfFilePath)) {
        
        var pdfParser = new PDFParser(browser, 1);
     
      pdfParser.on("pdfParser_dataReady", async function(pdfData) {

       ee= pdfParser.getRawTextContent().replace(/^Date:([0-9A-Za-z_ ,])*/,"")
       ee=ee.replace(/th.*/,"")
       ee=ee.replace(/,[0-9 ]*/,"Date: 27th, December 2024")
       fs.writeFileSync("./views/ee.html",ee);
       
      
      } )
    }
      else 
      {
          console.log('OOPs file not present in the downloaded folder');
          
      }
     await pdfParser.loadPDF(pdfFilePath); 
 
   next()
    }


app.get("/",middleware2,async(req, res,next) => {

  await new Promise(resolve => setTimeout(resolve, 5000));
  var html =  fs.readFileSync('./views/ee.html', 'utf8');
  console.log(html)
  var options = { format: 'Letter' };
  pdf.create(html, options).toFile('./views/ee.pdf', function(err, res) {
   if (err) return console.log(err);
   console.log(res); 
 });

 res.send("hello")
   
})


app.listen(process.env.PORT || 8005, () => {
    console.log("Runing on port","http://localhost:"+8005);
    });
