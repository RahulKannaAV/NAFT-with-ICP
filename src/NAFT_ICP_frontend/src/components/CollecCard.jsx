// components/Card.js
import React, {useState, useEffect} from 'react';
import styles from '../../public/newProduct.module.css'; // Import CSS module for styling
import { locStore } from '../pages/UserReg';


const ColleCard = ({ imgSrc, title,description, price, onBuy ,left, nftID, ownerID }) => {
  const [full, setFull] = useState(false);
  const [ownersID, setOwnerID] = useState(ownerID);
  const [auth, setAuth] = useState(false);
  const [seller,setSeller] = useState(false);

  async function checkOwnership() {
    let authUser = await locStore.get("walletID");
    let authStatus = await locStore.get("authenticated");
    setAuth(authStatus);
    console.log(authUser, ownerID);
    if(authUser === ownerID) {
      setSeller(true);
    } else {
      setSeller(false);
    }
  }

  useEffect(() => {
      checkOwnership();      
  });

  return (
    <div className={styles.card}>
      <div className={styles.cardBanner}>
      <img src={imgSrc || "/images/explore-product-1.jpg"} alt={title} className={styles.cardImg} />

      </div>
      <div className={styles.cardBody}>
        <h4 className={styles.cardTitle}>{title}</h4>
        <div className={styles.nftIDBody}>
          <p className={styles.cardNFTLabel}>NFT ID</p>
          <h6 className={`${styles.cardTitle} ${styles.nftID}`}>{nftID}</h6>
        </div>

        <div className={styles.row}>
        <h5>Token Price</h5>
        <p className={styles.cardPrice}>{price} <span className='heroTitleSpan'>ICP</span></p>
        </div>
        <div className={styles.row}>
        <p>{left} Tokens Offered </p>
        </div>
         <div className={`${styles.buttonRow}`}>
          <button disabled={auth == true ? true : false} className={`${styles.buttonSize} ${styles.buyButton}`} onClick={onBuy}>{seller ? "Sell": "Buy"}</button>
        </div>
        <div className={styles.nftIDBody}>
          <p className={styles.cardNFTLabel}>Owned By</p>
          <h6 style={{color: "red"}} className={`${styles.cardTitle} ${styles.nftID}`}>{ownerID}<a hidden={!full} onClick={() => setFull(true)}>...</a></h6>
        </div>
        </div>
    </div>
  );
}

export default ColleCard;
