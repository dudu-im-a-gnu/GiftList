const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');
const yargs = require("yargs");

const serverUrl = 'http://localhost:1225';

async function main(name) {
  const index = niceList.findIndex(n => n === name);
  const merkleTree = new MerkleTree(niceList);
  const proof = merkleTree.getProof(index);

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    proof,
    name,
  });

  console.log(`${name} ${gift}`);
}

const name = yargs.scriptName("index")
  .usage('$0 [args]')
  .positional('<full_name>', { type: 'string', describe:
    'Person\'s full name and any prefix and suffix in "QUOTES"'})
  .help(true)
  .version(false)
  .argv._[0];

main(name);