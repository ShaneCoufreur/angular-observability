#!/bin/sh

# runs lighthouse. for execution in ci.

echo "Checking ${VARIANT}"

touch ./dist/${VARIANT}/robots.txt 

lhci \
--collect.staticDistDir="./dist/${VARIANT}" \
--collect.isSinglePageApplication=true \
--collect.settings.chromeFlags="--headless --no-sandbox" \
--collect.setttings.throttling.cpuSlowdownMultiplier=1 \
--collect.numberOfRuns=4 \
--upload.target=filesystem --upload.outputDir=./lighthouse/report autorun

# --collect.settings.output=csv is not supported, https://github.com/GoogleChrome/lighthouse-ci/issues/651

cd ./lighthouse/ || exit 1
node extract.js