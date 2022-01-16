const fs = require('fs');
const path = require('path');

let rawdata = fs.readFileSync(path.resolve(__dirname, 'report/manifest.json'));
let manifest = JSON.parse(rawdata);

manifest.forEach(metric => {
    if(metric.isRepresentativeRun) {
        const summary = metric.summary;
        let out = `LHCI performance:${summary.performance} `;
        out +=`accessibility:${summary.accessibility} `;
        out +=`best-practices:${summary['best-practices']} `;
        out +=`seo:${summary.seo} `;
        out +=`pwa:${summary.pwa} `;
        console.log(out);
    }
});
