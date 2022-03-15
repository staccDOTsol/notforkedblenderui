import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Provider } from "@project-serum/anchor";
import {
  AnchorWallet,
  useAnchorWallet,
  useConnection,
  useWallet,
} from "@solana/wallet-adapter-react";
import React from "react";
import { useEffect } from "react";
import Link from "@material-ui/core/Link";
import { PublicKey } from "@solana/web3.js";
import { fetchPools } from "../services/service.pool";

export interface Pool {
  key: PublicKey;
  poolName: string;
  poolBump: number;
  iouMintBump: number;
  iouMint: PublicKey;
  admin: PublicKey;
  mangoAccount: PublicKey;
}

function Pools() {
  const connection = useConnection().connection;
  const wallet = useWallet();
  const anchorWallet = useAnchorWallet() as AnchorWallet;
  const provider = new Provider(connection, anchorWallet, {});

  // useState here
  const [pools, setPools] = React.useState<Pool[]>([]);

  const refreshPools = () => {
    fetchPools(provider).then((pools: Pool[]) => {
      setPools(pools);
    });
  };

  useEffect(() => {
    // refreshTrader();
    refreshPools();
  }, [wallet?.connected]);

  return (
    <>
      <div className="row">
        <h2>Pool Here</h2>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Pool Name</TableCell>
                <TableCell>Mango Account</TableCell>
                <TableCell>Admin</TableCell>
                <TableCell>View Mango Account</TableCell>
                <TableCell>Buy Into/Redeem From Pool</TableCell>
                {/* <TableCell>Current Value</TableCell>
                  <TableCell>Ownership Share</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {pools.length > 0
                ? pools.map((pool: Pool) => {
                    return (
                      <TableRow key={pool.key.toString()}>
                        <TableCell>{pool.poolName}</TableCell>
                        <TableCell>{pool.key.toBase58()}</TableCell>
                        <TableCell>{pool.admin.toBase58()}</TableCell>
                        <TableCell>
                          {/* TODO: mainnet (when it's time) */}
                          <a
                            href={
                              "https://devnet.mango.markets/account?pubkey=" +
                              pool.mangoAccount.toBase58()
                            }
                            target="_blank"
                            rel="noreferrer"
                          > 
                            {pool.mangoAccount.toBase58()}
                          </a>
                        </TableCell>
                        <TableCell>
                          <Button
                            onClick={() => console.log("devs do something")}
                          >
                            GOTO buy/withdraw
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })
                : null}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}

export default Pools;