// Function to scan the connected Web3 wallet

function scanWallet() {

  if (!window.ethereum) {

    alert('Please install MetaMask or another compatible wallet to connect.');

    return;

  }

  web3.eth.getAccounts(function (error, accounts) {

    if (error) {

      console.error('Error scanning wallet:', error);

      return;

    }

    if (accounts.length === 0) {

      alert('No connected wallet found.');

      return;

    }

    const walletAddress = accounts[0];

    const walletInfoElement = document.getElementById('wallet-info');

    walletInfoElement.innerHTML = `Connected Wallet: ${walletAddress}`;

  });

}

// Function to fetch and display price tickers

async function fetchPriceTickers() {

  try {

    const response = await fetch('https://api.example.com/price-tickers');

