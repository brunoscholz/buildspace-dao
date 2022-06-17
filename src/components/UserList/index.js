import { useEditionDrop, useToken } from "@thirdweb-dev/react";
import { useEffect, useMemo, useState } from "react";
import { shortenAddress } from "../../helpers";
import ContentHeader from "../ContentHeader";
import Spinner from "../Spinner";

const UserList = ({hasClaimedNFT}) => {
  const [memberTokenAmounts, setMemberTokenAmounts] = useState([])
  const [memberAddresses, setMemberAddresses] = useState([])

  const editionDrop = useEditionDrop('0x98D8a8083F5e889434841f10a27b0b4dFaCC1884')
  const token = useToken('0x8a85A39De71719f1BF4e4AfA908cDc96F9FD4f94')

  // This useEffect grabs all the addresses of our members holding our NFT.
  useEffect(() => {
    if (!hasClaimedNFT) {
      return;
    }

    // Just like we did in the 7-airdrop-token.js file! Grab the users who hold our NFT
    // with tokenId 0.
    const getAllAddresses = async () => {
      try {
        const memberAddresses = await editionDrop.history.getAllClaimerAddresses(0);
        setMemberAddresses(memberAddresses);
        console.log("🚀 Members addresses", memberAddresses);
      } catch (error) {
        console.error("failed to get member list", error);
      }

    };
    getAllAddresses();
  }, [hasClaimedNFT, editionDrop.history]);

  // This useEffect grabs the # of token each member holds.
  useEffect(() => {
    if (!hasClaimedNFT) {
      return;
    }

    const getAllBalances = async () => {
      try {
        const amounts = await token.history.getAllHolderBalances();
        setMemberTokenAmounts(amounts);
        console.log("👜 Amounts", amounts);
      } catch (error) {
        console.error("failed to get member balances", error);
      }
    };
    getAllBalances();
  }, [hasClaimedNFT, token.history]);

  // Now, we combine the memberAddresses and memberTokenAmounts into a single array
  const memberList = useMemo(() => {
    return memberAddresses.map(address => {
      // We're checking if we are finding the address in the memberTokenAmounts array.
      // If we are, we'll return the amount of token the user has.
      // Otherwise, return 0.
      const member = memberTokenAmounts?.find(({ holder }) => holder === address)

      return {
        address,
        tokenAmount: member?.balance.displayValue || '0'
      }
    })
  }, [memberAddresses, memberTokenAmounts])

  return (
    <>
      <ContentHeader title='Members' />
      <div className='products-area-wrapper tableView'>
        <div className='products-header'>
          <div className='product-cell image'>
            Address
            <button className='sort-button'>
              <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 512 512'>
                <path
                  fill='currentColor'
                  d='M496.1 138.3L375.7 17.9c-7.9-7.9-20.6-7.9-28.5 0L226.9 138.3c-7.9 7.9-7.9 20.6 0 28.5 7.9 7.9 20.6 7.9 28.5 0l85.7-85.7v352.8c0 11.3 9.1 20.4 20.4 20.4 11.3 0 20.4-9.1 20.4-20.4V81.1l85.7 85.7c7.9 7.9 20.6 7.9 28.5 0 7.9-7.8 7.9-20.6 0-28.5zM287.1 347.2c-7.9-7.9-20.6-7.9-28.5 0l-85.7 85.7V80.1c0-11.3-9.1-20.4-20.4-20.4-11.3 0-20.4 9.1-20.4 20.4v352.8l-85.7-85.7c-7.9-7.9-20.6-7.9-28.5 0-7.9 7.9-7.9 20.6 0 28.5l120.4 120.4c7.9 7.9 20.6 7.9 28.5 0l120.4-120.4c7.8-7.9 7.8-20.7-.1-28.5z'
                />
              </svg>
            </button>
          </div>
          <div className='product-cell category'>
            Token Amount
            <button className='sort-button'>
              <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 512 512'>
                <path
                  fill='currentColor'
                  d='M496.1 138.3L375.7 17.9c-7.9-7.9-20.6-7.9-28.5 0L226.9 138.3c-7.9 7.9-7.9 20.6 0 28.5 7.9 7.9 20.6 7.9 28.5 0l85.7-85.7v352.8c0 11.3 9.1 20.4 20.4 20.4 11.3 0 20.4-9.1 20.4-20.4V81.1l85.7 85.7c7.9 7.9 20.6 7.9 28.5 0 7.9-7.8 7.9-20.6 0-28.5zM287.1 347.2c-7.9-7.9-20.6-7.9-28.5 0l-85.7 85.7V80.1c0-11.3-9.1-20.4-20.4-20.4-11.3 0-20.4 9.1-20.4 20.4v352.8l-85.7-85.7c-7.9-7.9-20.6-7.9-28.5 0-7.9 7.9-7.9 20.6 0 28.5l120.4 120.4c7.9 7.9 20.6 7.9 28.5 0l120.4-120.4c7.8-7.9 7.8-20.7-.1-28.5z'
                />
              </svg>
            </button>
          </div>
        </div>
        {hasClaimedNFT ? memberList.map((member) => {
          return (
            <div className='products-row' key={member.address}>
              <button className='cell-more-button'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='18'
                  height='18'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className='feather feather-more-vertical'
                >
                  <circle cx='12' cy='12' r='1' />
                  <circle cx='12' cy='5' r='1' />
                  <circle cx='12' cy='19' r='1' />
                </svg>
              </button>
              <div className='product-cell sales'>
                <span className='cell-label'>Address:</span>{shortenAddress(member.address)}
              </div>
              <div className='product-cell stock'>
                <span className='cell-label'>Amount:</span>{member.tokenAmount}
              </div>
            </div>
          );
        }) : <Spinner />}
      </div>
    </>
  )
}

export default UserList