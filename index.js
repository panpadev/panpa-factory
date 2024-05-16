const fs = require('fs');
const solc = require('solc'); // pragma version of the solidity file has to be same with solc version

async function compile(contract_name = 'StandardToken') {
  // Load the contract source code
  const source_code = fs.readFileSync(
    process.cwd() + '/contracts/' + contract_name + '.sol',
    'utf-8'
  );

  // object to be compiled
  const input = {
    language: 'Solidity',
    sources: { main: { content: source_code } },
    settings: { outputSelection: { '*': { '*': ['abi', 'evm.bytecode'] } } },
  };

  // Parse the compiler output to retrieve the ABI and Bytecode
  const output = solc.compile(JSON.stringify(input));
  const artifact = JSON.parse(output).contracts.main[contract_name];

  // Store the ABI and Bytecode into a JSON file
  const final = JSON.stringify(
    { abi: artifact.abi, bytecode: artifact.evm.bytecode.object },
    null,
    2
  );

  fs.writeFileSync(
    process.cwd() + '/contracts/' + contract_name + '.json',
    final
  );
}

compile('StandardToken');
