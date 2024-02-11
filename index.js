const fs = require("fs");
const fetch = require("node-fetch");

async function readEthereumData() {
  try {
    const response = await fetch(
      "https://raw.githubusercontent.com/web3projectlinks/web3projectlinks/main/src/app/database/ethereum.json"
    );
    const ethereumData = await response.json();
    return ethereumData;
  } catch (error) {
    console.error("Error reading Ethereum JSON data:", error);
    throw error;
  }
}

function getPolygonData(ethereumData) {
  const polygonData = {
    official_links: ethereumData.official_links,
    social_platforms: ethereumData.social_platforms,
    data_aggregator: ethereumData.data_aggregator.filter((item) =>
      item.url.includes("polygon")
    ),
    explorers: ethereumData.explorers.filter((item) =>
      item.url.includes("polygon")
    ),
    bridges: ethereumData.bridges.filter((item) =>
      item.url.includes("polygon")
    ),
    bounty: ethereumData.bounty.filter((item) => item.url.includes("polygon")),
    grants: ethereumData.grants.filter((item) => item.url.includes("polygon")),
    faucets: ethereumData.faucets.filter((item) =>
      item.url.includes("polygon")
    ),
    rpcs: ethereumData.rpcs.filter((item) => item.url.includes("polygon")),
    wallets: ethereumData.wallets.filter((item) =>
      item.url.includes("polygon")
    ),
    oracles: ethereumData.oracles.filter((item) =>
      item.url.includes("polygon")
    ),
  };
  return polygonData;
}

async function createJSON(polygonData) {
  try {
    fs.writeFileSync("polygon.json", JSON.stringify(polygonData, null, 2));
    console.log("polygon.json file created successfully.");
  } catch (error) {
    console.error("Error creating polygon.json file:", error);
    throw error;
  }
}

async function main() {
  try {
    const ethereumData = await readEthereumData();
    const polygonData = getPolygonData(ethereumData);
    await createJSON(polygonData);
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

main();
