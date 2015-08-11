var app = module.exports = require('appjs');

app.serveFilesFrom(__dirname + '/content');

var window = app.createWindow({
	autoResize: false,
	resizable: false,
	width  : 400,
	height : 460,
	icons  : __dirname + '/content/icons'
});

window.on('create', function(){
  window.frame.show();
  window.frame.center();
});

window.on('ready', function(){
  window.process = process;
  window.module = module;
});

window.on('close', function(){ });