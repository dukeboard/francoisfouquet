var mustache = require('mustache');
var fs = require('fs');
var path = require('path');
const { exec } = require('child_process');

var layout = fs.readFileSync('layout.html', "utf8");
var resumeObject = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'resume.json'), 'utf8'));
for(var subResumeElem in resumeObject){
    if(resumeObject[subResumeElem].length !== undefined){
        resumeObject[subResumeElem][resumeObject[subResumeElem].length-1].last = true;
    }
}
var payload = mustache.to_html(layout, resumeObject);
fs.writeFile('resume.html', payload, function(err) {
    if(err) {
        return console.log(err);
    } else {
        exec('open resume.html', (err, stdout, stderr) => {
          if (err) {
            return console.log(err);
          }
        });

    }
}); 