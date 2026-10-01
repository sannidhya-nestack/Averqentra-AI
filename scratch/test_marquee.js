const { spawn } = require('child_process');
const http = require('http');

async function test() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const chromeProc = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9222',
    '--disable-gpu',
    'http://localhost:3022'
  ]);

  await new Promise(r => setTimeout(r, 2500));

  http.get('http://127.0.0.1:9222/json', (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', async () => {
      try {
        const pages = JSON.parse(data);
        console.log('Pages:', pages.map(p => ({ title: p.title, url: p.url })));
        const wsUrl = pages[0].webSocketDebuggerUrl;
        
        const WebSocket = require('ws'); // let's check if ws is available
      } catch(e) {
        console.error(e);
      } finally {
        chromeProc.kill();
      }
    });
  }).on('error', e => {
    console.error(e);
    chromeProc.kill();
  });
}

test();
