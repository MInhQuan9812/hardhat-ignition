const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const AstonModule = buildModule("AstonModule", (m) => {
  // Khởi tạo một provider

  // Lấy mảng các signers từ provider
  const signersPromise = ethers.getSigners();

  // Xử lý mảng signers khi promise được giải quyết
  signersPromise
    .then((signers) => {
      // Lấy địa chỉ của signer đầu tiên trong mảng
      const ownerAddressPromise = signers[0].getAddress();

      // Xử lý địa chỉ của owner khi promise được giải quyết
      ownerAddressPromise
        .then(async (ownerAddress) => {
          // Sử dụng địa chỉ để triển khai contract Token
          const token = await m.contract("Aston", [ownerAddress]);

          // Trả về contract Token sau khi triển khai
          return { token };
        })
        .catch((error) => {
          console.error("Đã có lỗi xảy ra khi lấy địa chỉ của owner:", error);
          throw error;
        });
    })
    .catch((error) => {
      console.error("Đã có lỗi xảy ra khi lấy signers:", error);
      throw error;
    });
});
module.exports = AstonModule;
