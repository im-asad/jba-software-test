const fs = require('fs');

const { precipitation: Precipitation } = require('./models');

const openFile = () => {
  try {
    return fs.readFileSync(`./${process.argv[2]}.pre`, 'utf8');
  } catch (e) {
    console.error('error: ', e.message)
  }
};

const bulkWriteToDb = async (data) => {
  try {
    await Precipitation.bulkCreate(data);
  } catch (e) {
    console.log('❌ e: ', e.message);
  }
};

const main = async () => {
  const data = openFile();
  if (data) {
    const yearsIdentifier = 'Years=';
    const gridIdentifier = 'Grid-ref=';
    let encounteredFirstGrid = false;
    const years = { start: null, end: null };
    const refs = { x: null, y: null };
    let currentYear;
    const dataPoints = [];
    data.split(/\r?\n/).forEach(async line =>  {
      const yearsIndex = line.indexOf(yearsIdentifier);
      if (yearsIndex > -1) {
        const yearStart = yearsIndex + yearsIdentifier.length;
        years.start = line.substring(yearStart, yearStart + 4);
        years.end = line.substring(yearStart + 5, yearStart + 9);
      }
      if (line.includes(gridIdentifier)) {
        const gridRefs = line.substring(gridIdentifier.length).split(',').map(ref => ref.trim());
        refs.x = gridRefs[0];
        refs.y = gridRefs[1];

        currentYear = years.start;

        if (!encounteredFirstGrid) encounteredFirstGrid = true;
      } else if (encounteredFirstGrid) {
        const points = line.trim().split(/\s+/).map(point => parseInt(point.trim()));
        for (let i = 0; i < points.length; i++) {
          const dataPoint = {
            Xref: parseInt(refs.x),
            Yref: parseInt(refs.y),
            Date: `${i+1}/1/${currentYear}`,
            Value: points[i]
          };
          dataPoints.push(dataPoint);
        }
        currentYear++;
      }
    });

    await bulkWriteToDb(dataPoints);

    console.log('✅ Write complete!');
  }
};

main();