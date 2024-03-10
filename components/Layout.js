import React from "react";
import styles from "../styles/layout.module.css";
import { Header } from "./Header";
import { Footer } from "./Footer";

export default function layout(props) {
    const { children } = props
    return (
        <div className={`${styles.layout}`}>
            <Header/>
            <main className={`${styles.main}`}>
                {children}
            </main>
            <Footer/>
        </div>
       
    )
}

