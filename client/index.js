const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');
const verifyProof = require('../utils/verifyProof');

const serverUrl = 'http://localhost:1225';

async function main() {
  // TODO: how do we prove to the server we're on the nice list?
  // Get a name from the user
  const name = prompt("Enter your name:")

  // Create a Merkle tree from the nice list
  const tree = new MerkleTree(niceList);

  // Generate a Merkle proof for the name
  const proof = tree.getProof(name);

  // Check if the name is on the nice list
  if (verifyProof(proof, name, tree.getRoot())) {
  // send a POST request to the server with the name and proof

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    // TODO: add request body parameters here!
    name: name,
    proof: proof
  });
  
  // Display the gift on the console
  console.log({ gift });
 } else {
  // Display a message that the name is not on the nice list
  console.log("Sorry, you are not on the nice list.")
 }
}

main();