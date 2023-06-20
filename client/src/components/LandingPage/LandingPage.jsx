import React from "react";
import { Link } from "react-router-dom";
import styles from "./LandingPage.css"

export default function LandingPage(){
    
    return(
        <div className= "main">
            <h1>Are you ready for cook? </h1>
            <Link to ='/home' className={styles.link}>
                
                <button className="cta-btn"> I born ready :D </button>
            </Link>
        </div>
    )
}