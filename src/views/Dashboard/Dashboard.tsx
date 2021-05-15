import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTokenBalance, useGetBnbBalance } from "hooks/useTokenBalance";
import { formatNumber, getBalanceAmount } from "utils/formatBalance";
import { getCakeAddress, getDopAddress } from "utils/addressHelpers";
import { getTokenBalance } from "utils/getTokenBalance";
import BigNumber from "bignumber.js";
import { addressOBJArr } from "getABI";

const displayAmount = (value: BigNumber): string => {
  return formatNumber(getBalanceAmount(value, 18).toNumber(), 3, 3);
};

// const BalanceByAddress = ({ name, address }) => {
//   let { accountId } = useParams();
//   const balance = useTokenBalance(accountId, address);
//   return (
//     <>
//       <p>
//         {name} : {displayAmount(balance)}
//       </p>
//     </>
//   );
// };

const Dashboard = () => {
  let { accountId } = useParams<{ accountId: string }>();
  const bnbBalance = useGetBnbBalance(accountId);
  const cakeBalance = useTokenBalance(accountId, getCakeAddress());
  const dopBalance = useTokenBalance(accountId, getDopAddress());
  const [listBalanceByAddress, setListBalanceByAddress] = useState([]);
  useEffect(() => {
    const gellAllTokenBalance = async () => {
      const promises = addressOBJArr.map(async ({ name, address }) => {
        const item = await getTokenBalance(accountId, address);
        return {
          name,
          balance: displayAmount(item),
        };
      });
      return await Promise.all(promises);
    };
    gellAllTokenBalance().then((result)=>setListBalanceByAddress(result))
  }, [accountId]);

  return (
    <>
      Dashboard : {accountId}
      <p>bnbBalance : {displayAmount(bnbBalance)}</p>
      <p>cake : {displayAmount(cakeBalance)}</p>
      <p>dop: {displayAmount(dopBalance)}</p>
      <p>------</p>
      {listBalanceByAddress.map(({ name, balance }, index) => (
        // address && <BalanceByAddress key={index} name={name} address={address} />
        <p key={index}>
          {name} : {balance}
        </p>
      ))}
    </>
  );
};

export default Dashboard;
