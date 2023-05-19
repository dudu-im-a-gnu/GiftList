# Merkle Tree Gift List

Using [Alchemy University's](https://university.alchemy.com/) [ChainShot/GiftList](https://github.com/ChainShot/GiftList) as the starting point, this project is an application which takes a name as input and gives back a textual gift as output, but only if that name appears on an approval list. The whole application revolves around using a Merkle Tree for efficiently storing a representation of the list at the server's side in only 32 bytes.

It consists of an [Express](https://expressjs.com/) server, a client [node.js](https://nodejs.org/) script, a list of people in a json file and two supporting javascript utility scripts.

To use it, run the server then use the client script from the command line to see if the server responds with a gift.

To get started with the repository, clone it and then run `npm install` in the top-level directory to install the depedencies.

There are three folders in this repository:

## Server

You can run the server from the top-level directory with `node server/index`. The server which will be hosted on port 1225 and respond to the client's request.

The server is the _verifier_ here. It needs to verify that the name passed by the client is in the 32 byte Merkle Tree root that represents the approval list. If it is, a gift is returned to the client script. 

## Client

You can run the client from the top-level directory with `node client/index "FULL NAME"`. This file is a script which will send a suitably formed HTTP request to the server.

The client is the _prover_ here. It needs to prove to the server that `"FULL NAME"` is in the merkle root on the server.

If successful the client echoes the server's response to the user.

## Utils

There are a few files in utils:

- The `niceList.json` which contains all the names of the people who deserve a gift
- The `MerkleTree.js` is a Merkle Tree implementation by Alchemy University and is used by the server and client
- The `verifyProof.js` is also provided by Alchemy University. It contains a function to prove that a name is indeed contained within a merkle root and is used by the server.
