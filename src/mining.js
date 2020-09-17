const runQuery = require('./querry');
const runExportation = require('./csvExport');
const formatToCsv = require('./formatToCsv');

let count = 0;
let after = null;

module.exports = async () => {
    while(count < 100){
        try {
            const res = await runQuery(after)
            count++
            after = `"${res.search.pageInfo.endCursor}"`;
            await runExportation(formatToCsv(res.search.nodes))
        }
        catch (error) {
            console.warn('ERROR: Trying to run the query again...')
        }
    }
}