import Image from "next/image"
import styles from "../styles/Home.module.css"
import { useMoralis, useMoralisQuery } from "react-moralis"
import NFTBox from "../components/NFTBox"

export default function Home() {
    // How do we show the recently listed NFT => We don't want to much change our protocol for just the website.
    //We will read from a database that has all the mappings in an easier way to read data structure
    // We will index the events off-chain and then read from our database
    // Setup a server to listen for those events to be fired, and we will add them to a database to query
    // Isn't that centralized?
    // TheGraph does this in a decentralized way
    // Moralis does it in a centralized way and cames with a ton of other features

    const { isWeb3Enabled } = useMoralis()
    const { data: listedNfts, isFetching: fetchingListedNfts } = useMoralisQuery(
        // TableName
        // Function for the query
        "ActiveItem",
        (query) => query.limit(10).descending("tokenId")
        // To make pages: (query) => query.limit(10).descending("tokenId").skip(pageNumbers)
    )

    // console.log(listedNfts)

    return (
        <div className="container mx-auto">
            <h1 className="py-4 px-3 font-bold text-2xl">Recently Listed</h1>
            <div className="flex flex-wrap">
                {isWeb3Enabled ? (
                    fetchingListedNfts ? (
                        <div>Loading...</div>
                    ) : (
                        listedNfts.map((nft) => {
                            // console.log(nft.attributes)
                            const { price, nftAddress, tokenId, marketplaceAddress, seller } =
                                nft.attributes
                            return (
                                <div>
                                    <NFTBox
                                        price={price}
                                        nftAddress={nftAddress}
                                        tokenId={tokenId}
                                        markeplaceAddress={marketplaceAddress}
                                        seller={seller}
                                        key={`${nftAddress}${tokenId}`}
                                    />
                                </div>
                            )
                        })
                    )
                ) : (
                    <div>Web3 Currently Not Enabled</div>
                )}
            </div>
        </div>
    )
}
