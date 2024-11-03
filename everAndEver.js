var forever = require('forever-monitor');

var child = new (forever.Monitor)('server.js', {
  max: 5,
  minUptime: 86400000,
  silent: false,
  logFile: 'logs/foreverLog.log', 
  outFile: 'logs/foreverOut.log',
  errFile: 'logs/foreverErr.log',
  args: []
});

child.on('error ', function (err) {
  console.error(err);
  child.start();
});

child.on('exit', function () {
  console.log('server.js has exited after 5 restarts');
});

child.start();