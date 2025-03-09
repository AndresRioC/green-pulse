import { useEffect, useState } from "react";
import WalletAPI from "./WalletAPI";
import { EntryCard } from "@contentful/f36-components";
import moment from "moment";

export default function TransactionList() {
  const [wallet, setWallet] = useState([]);

  async function getCurrentWallet() {
    const currentWallet = await WalletAPI.getWallet();
    setWallet(currentWallet);
    console.log(currentWallet);
  }

  useEffect(() => {
    getCurrentWallet();
  }, []);

  console.log(wallet);

  if (!wallet.length) return <></>;

  return (
    <>
      <div>
        Current balance: {wallet[0].balance + wallet[0].currency}
        <ul>
          {wallet[0].transactions.map((currentTransaction) => (
            <li key={currentTransaction._id}>
              <EntryCard
                status={currentTransaction.type}
                title={currentTransaction.amount + wallet[0].currency}
                contentType={moment(currentTransaction.createdAt)
                  .startOf("day")
                  .fromNow()}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
