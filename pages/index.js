import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Logo from "../public/logo.png"
import FileDrop from "../components/FileDrop";
import FileShare from "../components/fileShar";


export default function Home() {
    return (
        <div className={`bg-[#181923] w-full h-screen`}>
            <div className={`flex flex-row w-full md:mx-2 md:mx-8 items-center`}>
                <Image src={Logo} alt={"logo"} className={`w-16 my-8`}/>
                <p className={`text-white font-bold text-3xl my-8 md:mx-4`}>Lightly</p>
            </div>
{/*
            <FileDrop/>
*/}
            <FileShare/>
        </div>
    )
}
