const fs = require('fs');
const path = require('path');
const https = require('https');

async function download(url, dest) {
  return new Promise((resolve, reject) => {
    console.log(`Downloading: ${url} -> ${dest}`);
    const file = fs.createWriteStream(dest);
    const request = https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    }, (response) => {
      // Handle redirects
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        let redirectUrl = response.headers.location;
        if (!redirectUrl.startsWith('http')) {
          const u = new URL(url);
          redirectUrl = `${u.origin}${redirectUrl}`;
        }
        console.log(`Redirecting to: ${redirectUrl}`);
        file.close();
        fs.unlinkSync(dest);
        return download(redirectUrl, dest).then(resolve).catch(reject);
      }

      if (response.statusCode !== 200) {
        file.close();
        if (fs.existsSync(dest)) fs.unlinkSync(dest);
        return reject(new Error(`Failed with status code: ${response.statusCode} for ${url}`));
      }

      response.pipe(file);
      file.on('finish', () => {
        file.close(() => {
          const stats = fs.statSync(dest);
          console.log(`Downloaded successfully: ${dest} (${stats.size} bytes)`);
          resolve(dest);
        });
      });
    });

    request.on('error', (err) => {
      file.close();
      if (fs.existsSync(dest)) fs.unlinkSync(dest);
      reject(err);
    });
  });
}

async function main() {
  const assetsDir = path.join(__dirname, '..', 'public', 'assets');
  if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir, { recursive: true });
  }

  // Candidates for Qevarynth
  const qevarynthCandidates = [
    'https://qevarynth.nestack.ai/assets/photo-home-care.jpeg',
    'https://qevarynth.nestack.ai/assets/photo-coordinator.jpg',
    'https://qevarynth.nestack.ai/assets/photo-walker.jpg',
  ];

  // Candidates for Serevance
  const serevanceCandidates = [
    'https://serevance.nestack.ai/assets/pam.jpeg',
    'https://serevance.nestack.ai/assets/face.jpg',
    'https://serevance.nestack.ai/assets/hot.jpg',
  ];

  // Candidates for Tamvoriq
  const tamvoriqCandidates = [
    'https://tamvoriq.nestack.ai/assets/back.jpg',
    'https://tamvoriq.nestack.ai/assets/old.jpg',
    'https://tamvoriq.nestack.ai/assets/pulse.jpg',
  ];

  console.log('--- Starting downloads ---');

  // Download Qevarynth
  let qevSuccess = false;
  for (const url of qevarynthCandidates) {
    try {
      const ext = path.extname(url);
      const target = path.join(assetsDir, `suite-qevarynth${ext}`);
      await download(url, target);
      qevSuccess = true;
      break;
    } catch (e) {
      console.warn(`Failed candidate ${url}: ${e.message}`);
    }
  }

  // Download Serevance
  let serSuccess = false;
  for (const url of serevanceCandidates) {
    try {
      const ext = path.extname(url);
      const target = path.join(assetsDir, `suite-serevance${ext}`);
      await download(url, target);
      serSuccess = true;
      break;
    } catch (e) {
      console.warn(`Failed candidate ${url}: ${e.message}`);
    }
  }

  // Download Tamvoriq
  let tamSuccess = false;
  for (const url of tamvoriqCandidates) {
    try {
      const ext = path.extname(url);
      const target = path.join(assetsDir, `suite-tamvoriq${ext}`);
      await download(url, target);
      tamSuccess = true;
      break;
    } catch (e) {
      console.warn(`Failed candidate ${url}: ${e.message}`);
    }
  }

  // For Elyqentra itself (Senior Living), use photo-care.jpg from public/assets
  const careSrc = path.join(assetsDir, 'photo-care.jpg');
  const elyTarget = path.join(assetsDir, 'suite-elyqentra.jpg');
  if (fs.existsSync(careSrc)) {
    fs.copyFileSync(careSrc, elyTarget);
    console.log(`Copied local photo-care.jpg to ${elyTarget} (${fs.statSync(elyTarget).size} bytes)`);
  } else {
    console.warn(`photo-care.jpg not found at ${careSrc}`);
  }

  console.log('--- Finished downloads ---');
  console.log('Qevarynth:', qevSuccess);
  console.log('Serevance:', serSuccess);
  console.log('Tamvoriq:', tamSuccess);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
