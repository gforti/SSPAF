#!/usr/bin/env node

const copy = require('graceful-copy')
var inquirer = require('inquirer')
var path = require('path')
var program = require('commander')

program
  .usage('[options] <file>')
  .option('-b, --base', 'Base Template')
  .option('-c, --crud', 'Crud Template')  
  .option('-d, --demo', 'Full Demo')
  .option('-j, --json', 'Crud with json server Template')
  .parse(process.argv)

var template = 'spa'

if (program.crud) template = 'spa-crud'
else if (program.json) template = 'spa-json'
else if (program.demo) template = 'spa-demo'

const folderName = program.args.shift() || '.'
const templatesPath = path.join(__dirname, 'templates', template)
const destinationPath = path.resolve(folderName)

 inquirer.prompt([{
            type: "confirm",
            message: "Are you sure you want to create '" + folderName + "' from template '" + template + "'?",
            name: "confirmed",
            default: true
        }])
        .then((answers) => {
            if (answers.confirmed) {
                return finalize()
            }
            return false;
        })
        
function finalize() {
    copy(templatesPath, destinationPath, {clean: false})
        .then(files => {
            console.log('Files Coped to: ', destinationPath)
            console.log(files)
        }).catch(err => {
            console.log(err.stack)
        })
    return true
}