import { useParams } from "react-router-dom";
import { useTokenBalance, useGetBnbBalance } from "hooks/useTokenBalance";
import { formatNumber, getBalanceAmount } from "utils/formatBalance";
import { getCakeAddress, getDopAddress } from "utils/addressHelpers";
import BigNumber from "bignumber.js";
import { addressOBJArr } from "getABI";

const displayAmount = (value: BigNumber): string => {
  return formatNumber(getBalanceAmount(value, 18).toNumber(), 3, 3);
}

const BalanceByAddress = ({ name, address }) => {
  let { accountId } = useParams();
  const balance = useTokenBalance(accountId, address);
  return (
    <>
      <p>
        {name} : {displayAmount(balance)}
      </p>
    </>
  );
};

const Dashboard = () => {
  let { accountId } = useParams();
  const bnbBalance = useGetBnbBalance(accountId);
  const cakeBalance = useTokenBalance(accountId, getCakeAddress());
  const dopBalance = useTokenBalance(accountId, getDopAddress());


  return (
    <>
      Dashboard : {accountId}
      <p>bnbBalance : {displayAmount(bnbBalance)}</p>
      <p>cake : {displayAmount(cakeBalance)}</p>
      <p>dop: {displayAmount(dopBalance)}</p>
      <p>------</p>
      {addressOBJArr.map(({ name, address },index) => 
        address && <BalanceByAddress key={index} name={name} address={address} />
      )}
    </>
  );
};

export default Dashboard;
