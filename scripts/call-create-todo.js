const hre = require("hardhat");

async function main() {
    
    let todoItem = "Clean the dishes";
    const API_KEY = "zBLrVH80ht6JoXSyM9j31EgNH-aIkA7q";
    const provider = hre.ethers.getDefaultProvider("ropsten", {alchemy: API_KEY});
    
    const PRIVATE_KEY = "0x701510b077cb0fade63f92243669f62b94c38633990ccbfd17fdf547a4e0a2e2";
    const signer = new hre.ethers.Wallet(PRIVATE_KEY, provider);

    const contractAddress = "0x6616D6bD9e08f7440678fd65f207D36763B8959e";
    const artifact = await hre.artifacts.readArtifact("TodoList");
    const contract = new hre.ethers.Contract(contractAddress, artifact.abi, signer);

    const todo = await contract.deployed();
    const transaction = await todo.createTodo(todoItem);
    console.log(transaction);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
