import { PublicKey } from "@solana/web3.js";
import {
  FAKE_TOKEN_MINT,
  PoolToken,
  TokenMeta,
  makeHeliusTokenFetcher,
} from "gamba-react-ui-v2";

// Get RPC from the .env file or default to the public RPC.
export const RPC_ENDPOINT = import.meta.env.VITE_RPC_ENDPOINT;

// Solana address that will receive fees when somebody plays on this platform
export const PLATFORM_CREATOR_ADDRESS = new PublicKey(
  "cobw9YgxENUhGCLZ3TsEpXCtyJCBKNWFV72b8K973zx"
);

// Gamba explorer URL - Appears in RecentPlays
export const EXPLORER_URL = "https://explorer.gamba.so";

// Platform URL - Appears in ShareModal
export const PLATFORM_SHARABLE_URL = "play.casinoofbonk.fun";

// Creator fee (in %)
export const PLATFORM_CREATOR_FEE = 0.0125; // 1.25% !!max 5%!!

// Jackpot fee (in %)
export const PLATFORM_JACKPOT_FEE = 0.001; // 0.1%

// Referral fee (in %)
export const PLATFORM_REFERRAL_FEE = 0.0025; // 0.25%

/** If the user should be able to revoke an invite after they've accepted an invite */
export const PLATFORM_ALLOW_REFERRER_REMOVAL = true;

// Just a helper function
const lp = (
  tokenMint: PublicKey | string,
  poolAuthority?: PublicKey | string
): PoolToken => ({
  token: new PublicKey(tokenMint),
  authority:
    poolAuthority !== undefined ? new PublicKey(poolAuthority) : undefined,
});

/**
 * List of pools supported by this platform
 * Make sure the token you want to list has a corresponding pool on https://explorer.gamba.so/pools
 * For private pools, add the creator of the Liquidity Pool as a second argument
 */
export const POOLS = [
  // Fake token:
  lp(FAKE_TOKEN_MINT),
  // SOL:
  lp("So11111111111111111111111111111111111111112"),
  // BONK:
  lp("DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263"),
  // USDC:
  lp("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"),
];

// The default token to be selected
export const DEFAULT_POOL = POOLS[0];

/**
 * List of token metadata for the supported tokens
 * Alternatively, we can provide a fetcher method to automatically fetch metdata. See TOKEN_METADATA_FETCHER below.
 */
export const TOKEN_METADATA: (Partial<TokenMeta> & { mint: PublicKey })[] = [
  {
    mint: FAKE_TOKEN_MINT,
    name: "TCOB",
    symbol: "TCOB",
    image: "/fakemoney.png",
    baseWager: 1e9,
    decimals: 9,
    usdPrice: 0,
  },
  {
    mint: new PublicKey("85VBFQZC9TZkfaptBWjvUw7YbZjy52A6mjtPGjstQAmQ"),
    name: "W",
    symbol: "Wormhole",
    image: "https://wormhole.com/token.png",
    baseWager: 1e6,
    decimals: 6,
    usdPrice: 0,
  },
  {
    mint: new PublicKey("DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263"),
    name: "BONK",
    symbol: "BONK",
    image:
      "https://quei6zhlcfsxdfyes577gy7bkxmuz7qqakyt72xlbkyh7fysmoza.arweave.net/hQiPZOsRZXGXBJd_82PhVdlM_hACsT_q6wqwf5cSY7I",
    baseWager: 1e6,
    decimals: 6,
    usdPrice: 0,
  },
];

/** HTML to display to user that they need to accept in order to continue */
export const TOS_HTML = `
  <p><b>1. Age Requirement:</b> Must be at least 18 years old.</p>
  <p><b>2. Legal Compliance:</b> Follow local laws responsibly.</p>
  <p><b>3. Risk Acknowledgement:</b> Games involve risk; no guaranteed winnings.</p>
  <p><b>4. No Warranty:</b> Games provided "as is"; operate randomly.</p>
  <p><b>5. Limitation of Liability:</b> We're not liable for damages.</p>
  <p><b>6. Licensing Disclaimer:</b> Not a licensed casino.</p>
  <p><b>7. Fair Play:</b> Games are conducted fairly and transparently.</p>
  <p><b>8. Data Privacy:</b> Your privacy is important to us.</p>
  <p><b>9. Responsible Gaming:</b> Play responsibly; seek help if needed.</p>
`;

/**
 * A method for automatically fetching Token Metadata.
 * Here we create a fetcher that uses Helius metadata API, if an API key exists as an environment variable.
 */
export const TOKEN_METADATA_FETCHER = (() => {
  if (import.meta.env.VITE_HELIUS_API_KEY) {
    return makeHeliusTokenFetcher(import.meta.env.VITE_HELIUS_API_KEY, {
      dollarBaseWager: 1,
    });
  }
})();

export const ENABLE_LEADERBOARD = true;
export const ENABLE_TROLLBOX = true; // Requires setup in vercel (check tutorial in discord)
