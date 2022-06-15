import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

const editionDrop = sdk.getEditionDrop("0x98D8a8083F5e889434841f10a27b0b4dFaCC1884");

(async () => {
  try {
    await editionDrop.createBatch([
      {
        name: "Condo Membership",
        description: "This NFT will give you access to CondoDAO!",
        image: readFileSync("scripts/assets/member.jpeg"),
      },
    ]);
    console.log("✅ Successfully created a new NFT in the drop!");
  } catch (error) {
    console.error("failed to create the new NFT", error);
  }
})();