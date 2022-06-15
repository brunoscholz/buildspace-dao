import sdk from "./1-initialize-sdk.js";

const token = sdk.getToken("0x8a85A39De71719f1BF4e4AfA908cDc96F9FD4f94");

(async () => {
  try {
    // Log the current roles.
    const allRoles = await token.roles.getAll();

    console.log("👀 Roles that exist right now:", allRoles);

    // Revoke all the superpowers your wallet had over the ERC-20 contract.
    await token.roles.setAll({ admin: [], minter: ['0x39aFBE2c3B9b057452CED0863Eb817FA7F9a8a8d'] });
    console.log(
      "🎉 Roles after revoking ourselves",
      await token.roles.getAll()
    );
    console.log("✅ Successfully revoked our superpowers from the ERC-20 contract");

  } catch (error) {
    console.error("Failed to revoke ourselves from the DAO trasury", error);
  }
})();