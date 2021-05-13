import { useEffect, useState } from "react";
import BigNumber from "bignumber.js";
import { BIG_ZERO } from "utils/bigNumber";
import useWeb3 from "./useWeb3";
import useRefresh from "./useRefresh";
import useLastUpdated from "./useLastUpdated";
import { getBep20Contract } from "utils/contractHelpers";

export const useTokenBalance = (account: string, tokenAddress: string) => {
  const [balance, setBalance] = useState(BIG_ZERO);

  const web3 = useWeb3();
  const { fastRefresh } = useRefresh();

  useEffect(() => {
    const fetchBalance = async () => {
      const contract = getBep20Contract(tokenAddress, web3);
      const res = await contract.methods.balanceOf(account).call();
      setBalance(new BigNumber(res));
    };

    if (account) {
      fetchBalance();
    }
  }, [account, tokenAddress, web3, fastRefresh]);

  return balance;
};

export const useGetBnbBalance = (account: string) => {
  const [balance, setBalance] = useState(BIG_ZERO);
  const { lastUpdated } = useLastUpdated();
  const web3 = useWeb3();

  useEffect(() => {
    const fetchBalance = async () => {
      const walletBalance = await web3.eth.getBalance(account);
      setBalance(new BigNumber(walletBalance));
    };

    if (account) {
      fetchBalance();
    }
  }, [account, web3, lastUpdated, setBalance]);

  return balance;
};

export default useTokenBalance
