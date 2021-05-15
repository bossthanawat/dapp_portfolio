import { getWeb3NoAccount } from "utils/web3";
import { BIG_ZERO } from "utils/bigNumber";
import BigNumber from "bignumber.js";
import { getBep20Contract } from "utils/contractHelpers";

export const getTokenBalance = async (account: string, tokenAddress: string) => {

  const web3 = getWeb3NoAccount();
  let balance = BIG_ZERO
  if(!tokenAddress) return balance

  const fetchBalance = async () => {
    const contract = getBep20Contract(tokenAddress, web3);
    const res = await contract.methods.balanceOf(account).call();
    balance = new BigNumber(res)
  };

  await fetchBalance();

  return balance;
};
