#!/usr/bin/env node

const copy = require('graceful-copy')
var inquirer = require('inquirer');
var path = require('path')
var program = require('commander')

program
  .arguments('<file>')
  .parse(process.argv)

const folderName = program.args.shift() || '.'
const destinationPath = path.join(__dirname, folderName)

 inquirer.prompt([{
            type: "confirm",
            message: "Are you sure you want to create '" + folderName + "'?",
            name: "confirmed",
            default: true
        }]).then((answers) => {
            if (answers.confirmed) {
                return finalize();
            }
            return false;
        })
        
function finalize(){
    copy('./templates/spa', destinationPath, {clean: false})
        .then(files => {
            console.log('Files Coped to: ', destinationPath)
            console.log(files)
        }).catch(err => {
            console.log(err.stack)
        })
    return true;
}