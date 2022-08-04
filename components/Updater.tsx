import { Metaplex, walletAdapterIdentity } from "@metaplex-foundation/js";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { useWallet } from "@solana/wallet-adapter-react";
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { XIcon } from "@heroicons/react/solid";

export default function Updater() {
  const network = WalletAdapterNetwork.Mainnet;
  const wallet = useWallet();
  const connection = new Connection(clusterApiUrl(network));
  //const metaplex = new Metaplex(connection);
  //metaplex.use(walletAdapterIdentity(wallet));
  const [popUpVisible, setPopUpVisible] = useState(false);
  const [currentText, setCurrentText] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    toast.warning("Updating NFT...");
    e.preventDefault();
    // get metadata from form
    /*const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries()) as any;

    const nft = await metaplex
      .nfts()
      .findByMint(new PublicKey(data["mint"]))
      .run();
    const newCreators = nft.creators.map((creator) => {
      if (creator.address.toString() === wallet.publicKey?.toString()) {
        return {
          address: new PublicKey(data["updateAuth"]),
          verified: false,
          share: creator.share,
        };
      } else return creator;
    });

    if (isValid(data["updateAuth"])) {
      try {
        const res = await metaplex
          .nfts()
          .update(nft, {
            newUpdateAuthority: new PublicKey(data["updateAuth"]),
            creators: newCreators,
          })
          .run();
        if (res.nft.updateAuthorityAddress.toString() === data["updateAuth"]) {
          toast.success("NFT successfully updated");
        } else {
          toast.error("An error occurred. Please open a ticket in the Discord");
        }
      } catch (err) {
        console.log(err);
        toast.error("An error occurred. Please open a ticket in the Discord");
      }
    } else {
      toast.error("New update authority is invalid");
    }*/
  }

  function isValid(address: string) {
    try {
      let key = new PublicKey(address);
      return PublicKey.isOnCurve(address);
    } catch {
      return false;
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6 md:w-2/3 relative">
      {popUpVisible ? (
        <PopUp currentText={currentText} setPopUpVisible={setPopUpVisible} />
      ) : null}
      <h1 className="text-5xl font-bold">Auth Updater</h1>
      <div>
        <div className="flex justify-between">
          <p>Mint Address</p>
          <p
            onClick={() => {
              setCurrentText(
                'This is the mint address of the NFT you are trying to modify. You can find this address by locating the NFT in your wallet, clicking the menu (usually 3 dots) and clicking on "View in explorer", "View on Solscan" or something similar. From here, you should find an address next to the label "Token Address", and this should correspond to the token address in the URL of the page you are currently on. This is the mint address of your NFT.'
              );
              setPopUpVisible(true);
            }}
            className="cursor-pointer"
          >
            (?)
          </p>
        </div>
        <input
          name="mint"
          className="w-full p-2 my-2 rounded-lg bg-[#3b3b3b]"
        />
      </div>
      <div>
        <div className="flex justify-between">
          <p>New Update Authority</p>
          <p
            onClick={() => {
              setCurrentText(
                "This is the address of the new wallet you wish to use as the Update Authority and creator of your NFT. "
              );
              setPopUpVisible(true);
            }}
            className="cursor-pointer"
          >
            (?)
          </p>
        </div>
        <input
          name="updateAuth"
          className="w-full p-2 my-2 rounded-lg bg-[#3b3b3b]"
        />
      </div>
      <button
        className="border-white border rounded-lg w-4/5 p-2 mx-auto"
        type="submit"
      >
        Update!
      </button>
    </form>
  );
}

function PopUp(props: { setPopUpVisible: any; currentText: string }) {
  return (
    <div className="absolute w-full h-full bg-black opacity-90 flex justify-center items-center rounded-lg md:p-10">
      <XIcon
        onClick={() => props.setPopUpVisible(false)}
        className="w-6 absolute top-4 right-0 cursor-pointer"
      />
      <p className="max-w-[60ch] pt-10">{props.currentText}</p>
    </div>
  );
}
