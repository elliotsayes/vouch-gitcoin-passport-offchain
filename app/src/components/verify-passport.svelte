<script>
  export let arAddress = "";
  export let signingMessage = {
    message: "",
    nonce: "",
  };

  const SERVER_ADDRESS = import.meta.env.VITE_SERVER_ADDRESS;
  import Onboard from "@web3-onboard/core";
  import injectedModule from "@web3-onboard/injected-wallets";
  import walletConnectModule from "@web3-onboard/walletconnect";
  import { ethers } from "ethers";

  const MAINNET_RPC_URL = "https://mainnet.infura.io/v3/<INFURA_KEY>";

  const injected = injectedModule();

  const wcInitOptions = {
    projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID,
    requiredChains: [1],
    dappUrl: import.meta.env.VITE_CLIENT_ADDRESS,
  };

  // initialize the module with options
  const walletConnect = walletConnectModule(wcInitOptions);

  const onboard = Onboard({
    wallets: [injected, walletConnect],
    chains: [
      {
        id: "0x1",
        token: "ETH",
        label: "Ethereum Mainnet",
        // rpcUrl: MAINNET_RPC_URL,
      },
    ],
  });

  let isProcessing = false;

  async function handleConnectEthereum() {
    isProcessing = true;

    const wallets = await onboard.connectWallet();
    const wallet = wallets[0];

    if (!wallet) return alert("No wallet selected");
    const ethAddress = wallet.accounts[0].address;

    // create an ethers provider with the last connected wallet provider
    const ethersProvider = new ethers.BrowserProvider(wallet.provider, "any");

    const signer = await ethersProvider.getSigner();

    // sign the message
    console.log(signer);
    const signature = await signer.signMessage(signingMessage.message);
    const signingSignature = {
      signature: signature,
      nonce: signingMessage.nonce,
    };
    console.log("signingSignature: ", signingSignature);
    handleNextStep(ethAddress, signingSignature);
  }

  function handleNextStep(ethAddress, signingSignature) {
    isProcessing = true;
    console.log("address: ", arAddress);
    const redirect = `${SERVER_ADDRESS}/vouch?arAddress=${arAddress}&ethAddress=${ethAddress}&signingSignature=${encodeURIComponent(
      JSON.stringify(signingSignature)
    )}&callback=${encodeURI(globalThis.location.href)}`;
    console.log("redirect: ", redirect);
    globalThis.location.href = redirect;
  }
</script>

<div class="flex-col justify-start items-start gap-[37px] flex">
  <div class="flex-col justify-start items-start gap-[25px] flex">
    <div class="w-[912px] pb-[23px] justify-center items-center inline-flex">
      <div
        class="w-[912px] text-zinc-400 text-[17px] font-normal font-['Satoshi'] tracking-tight"
      >
        Now that you connected your Arweave wallet, verify your Gitcoin Passport
        to prove your credibility on the permaweb.
      </div>
    </div>
  </div>
  <div
    class="w-[701px] h-[175px] px-6 bg-gradient-to-b from-violet-50 to-white rounded-[18px] shadow-inner border-2 border-indigo-500 border-opacity-50 flex-col justify-center items-start gap-[49px] flex"
  >
    <div class="justify-center items-start gap-2.5 inline-flex">
      <div
        class="text-zinc-900 text-[19px] font-medium font-['Satoshi'] tracking-tight"
      >
        Verify your Gitcoin Passport.
      </div>
    </div>
    <button
      on:click={isProcessing ? null : handleConnectEthereum}
      class={`flex-col justify-center items-start gap-[7px] flex ${
        isProcessing ? "cursor-wait animate-pulse" : "cursor-pointer"
      }`}
    >
      <div
        class="px-[22px] py-3 bg-indigo-500 rounded-xl shadow border justify-start items-start inline-flex"
      >
        <div class="justify-start items-center gap-1.5 flex">
          <svg
            fill="none"
            height="25"
            viewBox="0 0 128 146"
            width="25"
            xmlns="http://www.w3.org/2000/svg"
            ><g fill="#fff"
              ><path
                d="m61.6349 145.42-59.47037-34.335c-1.339304-.774-2.16453-2.203-2.16453-3.75v-68.6698c0-1.5476.825226-2.9762 2.16453-3.75l59.47037-34.334836c1.3393-.773818 2.9897-.773818 4.329 0l59.4701 34.334836c1.34.7738 2.165 2.2024 2.165 3.75v68.6698c0 1.547-.825 2.976-2.165 3.75l-59.4701 34.335c-1.3393.773-2.9897.773-4.329 0zm-48.6477-40.583 48.6477 28.088c1.3393.774 2.9897.774 4.329 0l48.6481-28.088c1.339-.773 2.164-2.202 2.164-3.75v-56.1717c0-1.5477-.825-2.9763-2.164-3.7501l-48.6481-28.0874c-1.3393-.7738-2.9897-.7738-4.329 0l-48.6477 28.0874c-1.3393.7738-2.1646 2.2024-2.1646 3.7501v56.1717c0 1.548.8253 2.977 2.1646 3.75z"
              /><path
                d="m61.6345 23.0133-40.0437 23.1198c-1.3393.7738-2.1645 2.2024-2.1645 3.7501v43.7396c0 3.0926 1.6504 5.9525 4.329 7.4972l4.8702 2.811c.7224.417 1.6234-.102 1.6234-.936v-46.8617c0-1.5477.8252-2.9763 2.1645-3.7501l29.2211-16.8698c1.3393-.7738 2.9898-.7738 4.3291 0l29.2211 16.8698c1.3393.7738 2.1645 2.2024 2.1645 3.7501v33.7422c0 1.5476-.8252 2.9762-2.1645 3.75l-29.2211 16.8695c-1.3393.774-2.9898.774-4.3291 0l-9.7403-5.622c-1.3393-.774-2.1646-2.202-2.1646-3.75v-33.7423c0-1.5477.8253-2.9763 2.1646-3.7501l9.7403-5.6223c1.3393-.7739 2.9898-.7739 4.3291 0l9.7404 5.6223c1.3393.7738 2.1645 2.2024 2.1645 3.7501v11.2474c0 1.5476-.8252 2.9762-2.1645 3.75l-4.8702 2.8112c-.7224.4167-1.6234-.1028-1.6234-.9362v-6.9183-4.8783c0-1.5477-.8252-2.9762-2.1645-3.7501l-2.1646-1.25c-.671-.3869-1.4935-.3869-2.1645 0l-2.7057 1.5612c-1.0038.579-1.6233 1.6531-1.6233 2.8112v1.1715 23.1686c0 1.553.8333 2.987 2.1807 3.7581l1.0444.595c1.3366.763 2.9789.761 4.3128-.011l20.6009-11.8936c1.3393-.7738 2.1645-2.2024 2.1645-3.7501v-23.7448c0-1.5477-.8252-2.9762-2.1645-3.7501l-20.563-11.8724c-1.3393-.7738-2.9898-.7738-4.3291 0l-20.563 11.8724c-1.3393.7739-2.1645 2.2024-2.1645 3.7501v46.2365c0 1.548.8252 2.977 2.1645 3.751l20.563 11.872c1.3393.774 2.9898.774 4.3291 0l40.0434-23.1199c1.34-.7738 2.165-2.2024 2.165-3.7501v-46.2369c0-1.5477-.825-2.9763-2.165-3.7501l-40.0434-23.1198c-1.3393-.7738-2.9898-.7738-4.3291 0z"
              /></g
            ></svg
          >
          <div class="text-white text-[17px] font-medium font-['Satoshi']">
            Connect
          </div>
          <div class="w-[25px] h-[25px] relative">
            <svg
              width="25"
              height="26"
              viewBox="0 0 25 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.94788 17.7708L13.7187 13L8.94788 8.21875L10.4166 6.75L16.6666 13L10.4166 19.25L8.94788 17.7708Z"
                fill="white"
              />
            </svg>
          </div>
        </div>
      </div>
    </button>
  </div>
</div>
