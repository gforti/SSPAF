var generator = require('custom-template-generator');
var program = require('commander');

program
  .arguments('<file>')
  .parse(process.argv);

var destinationPath = program.args.shift() || '.';

generator({
    componentName: destinationPath,
    customTemplatesUrl: './templates/',
    templateName: 'spa',
    dest: './',    
    autoIndent: true
});
