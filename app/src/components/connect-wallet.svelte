<script>
  const SERVER_ADDRESS = import.meta.env.VITE_SERVER_ADDRESS;

  import { ArweaveWebWallet } from "arweave-wallet-connector";
  import { connect, getActiveKey } from "@othent/kms";
  import { router } from "tinro";

  async function arConnect() {
    if (!globalThis.arweaveWallet) {
      alert("ArConnect is not installed. goto https://arconnect.io");
      return;
    }
    await globalThis.arweaveWallet.connect(["ACCESS_ADDRESS"]);
    const address = await globalThis.arweaveWallet.getActiveAddress();
    handleNextStep(address);
  }

  async function arweaveApp() {
    const wallet = new ArweaveWebWallet({
      name: "VouchGitcoinPassport",
    });
    wallet.setUrl("arweave.app");
    await wallet.connect();
    const address = await globalThis.arweaveWallet.getActiveAddress();
    handleNextStep(address);
  }

  async function othentConnect() {
    const result = await connect();
    //console.log("result: ", result);
    const address = result.walletAddress;
    handleNextStep(address);
  }

  let isProcessing = false;

  function handleNextStep(arAddress) {
    isProcessing = true;
    const redirect = `${SERVER_ADDRESS}/signing-message?arAddress=${arAddress}&callback=${encodeURI(
      globalThis.location.href
    )}`;
    console.log("redirect: ", redirect);
    globalThis.location.href = redirect;
  }
</script>

<div class="flex-col justify-start items-start gap-[37px] flex">
  <div
    class="flex-col justify-start items-start gap-[25px] flex max-w-screen-sm text-lg"
  >
    <h1 class="text-2xl text-gray-900/90">Vouching with Gitcoin Passport</h1>
    <p>
      Gitcoin Passport is a proof-of-humanity service for Ethereum that can use
      blockchain activity, social accounts, and KYC or government IDs to prove
      humanity.
    </p>
    <p>
      If you haven't done so already, you'll need to set up your Ethereum
      wallet's passport at
      <a
        href="https://passport.gitcoin.co/"
        target="_blank"
        referrerpolicy="no-referrer"
        class="underline text-blue-800">passport.gitcoin.co</a
      > and earn at least 10 points.
    </p>
  </div>

  <div
    class="w-[701px] h-[175px] px-6 bg-gradient-to-b from-violet-50 to-white rounded-[18px] shadow-inner border-2 border-indigo-500 border-opacity-50 flex-col justify-center items-start gap-[49px] flex"
  >
    <div class="justify-center items-start gap-2.5 inline-flex">
      <div
        class="text-zinc-900 text-[19px] font-medium font-['Satoshi'] tracking-tight"
      >
        Choose your AR Wallet App to connect.
      </div>
    </div>
    <div class="flex space-x-4">
      <button
        class="flex-col justify-center items-start gap-[7px] flex"
        on:click={arConnect}
      >
        <div
          class="px-[22px] py-3 bg-indigo-500 rounded-xl shadow border justify-start items-start inline-flex"
        >
          <div class="justify-start items-center gap-1.5 flex">
            <svg
              width="26"
              height="26"
              viewBox="0 0 26 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.8077 7H2.19231C1.61087 7 1.05325 7.22125 0.642112 7.61508C0.230975 8.0089 0 8.54305 0 9.1V18.9C0 19.457 0.230975 19.9911 0.642112 20.3849C1.05325 20.7788 1.61087 21 2.19231 21H16.8077C17.3891 21 17.9468 20.7788 18.3579 20.3849C18.769 19.9911 19 19.457 19 18.9V9.1C19 8.54305 18.769 8.0089 18.3579 7.61508C17.9468 7.22125 17.3891 7 16.8077 7ZM1.46154 11.2H17.5385V12.6H13.0799C12.743 12.6002 12.4165 12.7118 12.1556 12.9161C11.8948 13.1203 11.7156 13.4046 11.6485 13.7209C11.5461 14.1937 11.2767 14.6183 10.8857 14.9232C10.4947 15.228 10.006 15.3945 9.50183 15.3945C8.99768 15.3945 8.50895 15.228 8.11794 14.9232C7.72694 14.6183 7.45756 14.1937 7.35519 13.7209C7.2879 13.404 7.1082 13.1193 6.84661 12.915C6.58502 12.7107 6.25767 12.5994 5.92014 12.6H1.46154V11.2ZM2.19231 8.4H16.8077C17.0015 8.4 17.1874 8.47375 17.3244 8.60503C17.4615 8.7363 17.5385 8.91435 17.5385 9.1V9.8H1.46154V9.1C1.46154 8.91435 1.53853 8.7363 1.67558 8.60503C1.81262 8.47375 1.9985 8.4 2.19231 8.4ZM16.8077 19.6H2.19231C1.9985 19.6 1.81262 19.5263 1.67558 19.395C1.53853 19.2637 1.46154 19.0857 1.46154 18.9V14H5.91923C6.08739 14.7907 6.53564 15.5015 7.18809 16.012C7.84054 16.5225 8.6571 16.8014 9.49954 16.8014C10.342 16.8014 11.1585 16.5225 11.811 16.012C12.4634 15.5015 12.9117 14.7907 13.0799 14H17.5385V18.9C17.5385 19.0857 17.4615 19.2637 17.3244 19.395C17.1874 19.5263 17.0015 19.6 16.8077 19.6Z"
                fill="white"
              />
              <path
                d="M24.0705 17.7944L21.4537 19.9813C21.3263 20.0874 21.2316 20.2247 21.1797 20.3785C21.1277 20.5323 21.1206 20.6968 21.1589 20.8542L21.9452 24.1123L18.9819 22.3899C18.8374 22.3056 18.6713 22.261 18.5021 22.261C18.3328 22.261 18.1668 22.3056 18.0222 22.3899L15.063 24.1123L15.844 20.8564C15.8824 20.699 15.8753 20.5345 15.8233 20.3807C15.7714 20.2269 15.6766 20.0896 15.5493 19.9835L12.9313 17.7977C12.9311 17.796 12.9311 17.7943 12.9313 17.7927L16.3802 17.5071C16.5486 17.4929 16.7097 17.4349 16.8462 17.3394C16.9827 17.244 17.0894 17.1146 17.1548 16.9654L18.5015 13.8933L19.8476 16.9654C19.913 17.1146 20.0197 17.244 20.1562 17.3394C20.2927 17.4349 20.4538 17.4929 20.6222 17.5071L24.0717 17.7927V17.7966L24.0705 17.7944Z"
                fill="#FCC500"
              />
            </svg>

            <div class="text-white text-[17px] font-medium font-['Satoshi']">
              ArConnect
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
      <button
        class="flex-col justify-center items-start gap-[7px] flex"
        on:click={arweaveApp}
      >
        <div
          class="px-[22px] py-3 bg-indigo-500 rounded-xl shadow border justify-start items-start inline-flex"
        >
          <div class="justify-start items-center gap-1.5 flex">
            <svg
              width="26"
              height="26"
              viewBox="0 0 26 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.8077 7H2.19231C1.61087 7 1.05325 7.22125 0.642112 7.61508C0.230975 8.0089 0 8.54305 0 9.1V18.9C0 19.457 0.230975 19.9911 0.642112 20.3849C1.05325 20.7788 1.61087 21 2.19231 21H16.8077C17.3891 21 17.9468 20.7788 18.3579 20.3849C18.769 19.9911 19 19.457 19 18.9V9.1C19 8.54305 18.769 8.0089 18.3579 7.61508C17.9468 7.22125 17.3891 7 16.8077 7ZM1.46154 11.2H17.5385V12.6H13.0799C12.743 12.6002 12.4165 12.7118 12.1556 12.9161C11.8948 13.1203 11.7156 13.4046 11.6485 13.7209C11.5461 14.1937 11.2767 14.6183 10.8857 14.9232C10.4947 15.228 10.006 15.3945 9.50183 15.3945C8.99768 15.3945 8.50895 15.228 8.11794 14.9232C7.72694 14.6183 7.45756 14.1937 7.35519 13.7209C7.2879 13.404 7.1082 13.1193 6.84661 12.915C6.58502 12.7107 6.25767 12.5994 5.92014 12.6H1.46154V11.2ZM2.19231 8.4H16.8077C17.0015 8.4 17.1874 8.47375 17.3244 8.60503C17.4615 8.7363 17.5385 8.91435 17.5385 9.1V9.8H1.46154V9.1C1.46154 8.91435 1.53853 8.7363 1.67558 8.60503C1.81262 8.47375 1.9985 8.4 2.19231 8.4ZM16.8077 19.6H2.19231C1.9985 19.6 1.81262 19.5263 1.67558 19.395C1.53853 19.2637 1.46154 19.0857 1.46154 18.9V14H5.91923C6.08739 14.7907 6.53564 15.5015 7.18809 16.012C7.84054 16.5225 8.6571 16.8014 9.49954 16.8014C10.342 16.8014 11.1585 16.5225 11.811 16.012C12.4634 15.5015 12.9117 14.7907 13.0799 14H17.5385V18.9C17.5385 19.0857 17.4615 19.2637 17.3244 19.395C17.1874 19.5263 17.0015 19.6 16.8077 19.6Z"
                fill="white"
              />
              <path
                d="M24.0705 17.7944L21.4537 19.9813C21.3263 20.0874 21.2316 20.2247 21.1797 20.3785C21.1277 20.5323 21.1206 20.6968 21.1589 20.8542L21.9452 24.1123L18.9819 22.3899C18.8374 22.3056 18.6713 22.261 18.5021 22.261C18.3328 22.261 18.1668 22.3056 18.0222 22.3899L15.063 24.1123L15.844 20.8564C15.8824 20.699 15.8753 20.5345 15.8233 20.3807C15.7714 20.2269 15.6766 20.0896 15.5493 19.9835L12.9313 17.7977C12.9311 17.796 12.9311 17.7943 12.9313 17.7927L16.3802 17.5071C16.5486 17.4929 16.7097 17.4349 16.8462 17.3394C16.9827 17.244 17.0894 17.1146 17.1548 16.9654L18.5015 13.8933L19.8476 16.9654C19.913 17.1146 20.0197 17.244 20.1562 17.3394C20.2927 17.4349 20.4538 17.4929 20.6222 17.5071L24.0717 17.7927V17.7966L24.0705 17.7944Z"
                fill="#FCC500"
              />
            </svg>

            <div class="text-white text-[17px] font-medium font-['Satoshi']">
              Arweave Wallet
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
      {#if true}
        <button
          class="flex-col justify-center items-start gap-[7px] flex"
          on:click={othentConnect}
        >
          <div
            class="px-[22px] py-3 bg-indigo-500 rounded-xl shadow border justify-start items-start inline-flex"
          >
            <div class="justify-start items-center gap-1.5 flex">
              <svg
                width="26"
                height="26"
                viewBox="0 0 26 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.8077 7H2.19231C1.61087 7 1.05325 7.22125 0.642112 7.61508C0.230975 8.0089 0 8.54305 0 9.1V18.9C0 19.457 0.230975 19.9911 0.642112 20.3849C1.05325 20.7788 1.61087 21 2.19231 21H16.8077C17.3891 21 17.9468 20.7788 18.3579 20.3849C18.769 19.9911 19 19.457 19 18.9V9.1C19 8.54305 18.769 8.0089 18.3579 7.61508C17.9468 7.22125 17.3891 7 16.8077 7ZM1.46154 11.2H17.5385V12.6H13.0799C12.743 12.6002 12.4165 12.7118 12.1556 12.9161C11.8948 13.1203 11.7156 13.4046 11.6485 13.7209C11.5461 14.1937 11.2767 14.6183 10.8857 14.9232C10.4947 15.228 10.006 15.3945 9.50183 15.3945C8.99768 15.3945 8.50895 15.228 8.11794 14.9232C7.72694 14.6183 7.45756 14.1937 7.35519 13.7209C7.2879 13.404 7.1082 13.1193 6.84661 12.915C6.58502 12.7107 6.25767 12.5994 5.92014 12.6H1.46154V11.2ZM2.19231 8.4H16.8077C17.0015 8.4 17.1874 8.47375 17.3244 8.60503C17.4615 8.7363 17.5385 8.91435 17.5385 9.1V9.8H1.46154V9.1C1.46154 8.91435 1.53853 8.7363 1.67558 8.60503C1.81262 8.47375 1.9985 8.4 2.19231 8.4ZM16.8077 19.6H2.19231C1.9985 19.6 1.81262 19.5263 1.67558 19.395C1.53853 19.2637 1.46154 19.0857 1.46154 18.9V14H5.91923C6.08739 14.7907 6.53564 15.5015 7.18809 16.012C7.84054 16.5225 8.6571 16.8014 9.49954 16.8014C10.342 16.8014 11.1585 16.5225 11.811 16.012C12.4634 15.5015 12.9117 14.7907 13.0799 14H17.5385V18.9C17.5385 19.0857 17.4615 19.2637 17.3244 19.395C17.1874 19.5263 17.0015 19.6 16.8077 19.6Z"
                  fill="white"
                />
                <path
                  d="M24.0705 17.7944L21.4537 19.9813C21.3263 20.0874 21.2316 20.2247 21.1797 20.3785C21.1277 20.5323 21.1206 20.6968 21.1589 20.8542L21.9452 24.1123L18.9819 22.3899C18.8374 22.3056 18.6713 22.261 18.5021 22.261C18.3328 22.261 18.1668 22.3056 18.0222 22.3899L15.063 24.1123L15.844 20.8564C15.8824 20.699 15.8753 20.5345 15.8233 20.3807C15.7714 20.2269 15.6766 20.0896 15.5493 19.9835L12.9313 17.7977C12.9311 17.796 12.9311 17.7943 12.9313 17.7927L16.3802 17.5071C16.5486 17.4929 16.7097 17.4349 16.8462 17.3394C16.9827 17.244 17.0894 17.1146 17.1548 16.9654L18.5015 13.8933L19.8476 16.9654C19.913 17.1146 20.0197 17.244 20.1562 17.3394C20.2927 17.4349 20.4538 17.4929 20.6222 17.5071L24.0717 17.7927V17.7966L24.0705 17.7944Z"
                  fill="#FCC500"
                />
              </svg>

              <div class="text-white text-[17px] font-medium font-['Satoshi']">
                Othent
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
      {/if}
    </div>
  </div>
</div>
