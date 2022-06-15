import sdk from "./1-initialize-sdk.js";

// This is our governance contract.
const vote = sdk.getVote("0x39aFBE2c3B9b057452CED0863Eb817FA7F9a8a8d");

// This is our ERC-20 contract.
const token = sdk.getToken("0x8a85A39De71719f1BF4e4AfA908cDc96F9FD4f94");

(async () => {
  try {
    // Give our treasury the power to mint additional token if needed.
    await token.roles.grant("minter", vote.getAddress());

    console.log(
      "Successfully gave vote contract permissions to act on token contract"
    );
  } catch (error) {
    console.error(
      "failed to grant vote contract permissions on token contract",
      error
    );
    process.exit(1);
  }
})();