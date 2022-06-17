import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import { useAddress, useMetamask, useEditionDrop, useNetwork } from '@thirdweb-dev/react'
import { useEffect, useState } from 'react'

import { ChainId } from '@thirdweb-dev/react'
import UserList from './components/UserList'
import Proposals from './components/Proposals'
import Sidebar from './components/Sidebar'

const App = () => {
  const address = useAddress()
  const network = useNetwork()
  const connectWithMetamask = useMetamask()
  console.log('👋 Address:', address)

  const editionDrop = useEditionDrop('0x98D8a8083F5e889434841f10a27b0b4dFaCC1884')

  // State variable for us to know if user has our NFT.
  const [hasClaimedNFT, setHasClaimedNFT] = useState(false)
  const [isClaiming, setIsClaiming] = useState(false)

  useEffect(() => {
    // If they don't have a connected wallet, exit!
    if (!address) {
      return
    }

    const checkBalance = async () => {
      try {
        const balance = await editionDrop.balanceOf(address, 0)
        if (balance.gt(0)) {
          setHasClaimedNFT(true)
          console.log('🌟 this user has a membership NFT!')
        } else {
          setHasClaimedNFT(false)
          console.log("😭 this user doesn't have a membership NFT.")
        }
      } catch (error) {
        setHasClaimedNFT(false)
        console.error('Failed to get balance', error)
      }
    }
    checkBalance()
  }, [address, editionDrop])

  const mintNft = async () => {
    try {
      setIsClaiming(true)
      await editionDrop.claim('0', 1)
      console.log(
        `🌊 Successfully Minted! Check it out on OpenSea: https://testnets.opensea.io/assets/${editionDrop.getAddress()}/0`
      )
      setHasClaimedNFT(true)
    } catch (error) {
      setHasClaimedNFT(false)
      console.error('Failed to mint NFT', error)
    } finally {
      setIsClaiming(false)
    }
  }

  if (address && (network?.[0].data.chain.id !== ChainId.Rinkeby)) {
    return (
      <div className='app-container'>
        <div className="unsupported-network">
          <h2>Please connect to Rinkeby</h2>
          <p>
            This dapp only works on the Rinkeby network, please switch networks
            in your connected wallet.
          </p>
        </div>
      </div>
    );
  }

  if (!address) {
    return (
      <div className='app-container'>
        <div className="unsupported-network">
          <div className="landing">
            <h1>Welcome to CondoDAO</h1>
            <button onClick={connectWithMetamask} className="btn-hero">
              Connect your wallet
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!hasClaimedNFT) {
    return (
      <div className='app-container'>
        <div className="unsupported-network">
          <div className="mint-nft">
            <h1>Mint your free 🍪CondoDAO Membership NFT</h1>
            <button
              disabled={isClaiming}
              onClick={mintNft}
            >
              {isClaiming ? "Minting..." : "Mint your nft (FREE)"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className='app-container'>
        <Sidebar />
        <div className='app-content'>
          <Switch>
            <Route exact path='/members'>
              <UserList hasClaimedNFT={hasClaimedNFT} />
            </Route>
            <Route exact path='/proposals'>
              <Proposals hasClaimedNFT={hasClaimedNFT} />
            </Route>
            <Redirect exact from='/' to='/members' />
            <Route path='*'>{() => <p>404 Page</p>}</Route>
          </Switch>
        </div>
      </div>
    </Router>
  )
}

export default App
