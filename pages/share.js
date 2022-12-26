import React, {useEffect, useState} from 'react';
import Image from "next/image";
import Logo from "../public/logo.png";
import {Input} from "postcss";
import {QRCodeSVG} from "qrcode.react";
import {useRouter} from "next/router";


function Share(props) {
    const router = useRouter();

    const [link, setLink] = useState("");
    const [name, setName] = useState("");
    const [size, setSize] = useState(54);
    const [buttonText, setButtonText] = useState("Copy Link");

    useEffect(() => {
        setLink(router.query.link)
        setName(router.query.name)
    }, [router.query]);


    const onCopyClick = async (e) => {

        setButtonText("Copied")
            try {
                await navigator.clipboard.writeText(router.query.link);
                console.log('Content copied to clipboard');
            } catch (err) {
                console.error('Failed to copy: ', err);
            }
            setTimeout(() =>{
                setButtonText("Copy Link")
            },2000)
    }

    const onQr = (e) => {
        setSize(150)
    }
    const onQrLeave = (e) => {
        setSize(54)
    }
    const onClickOk = (e) =>{
        router.push('/')
    }

    return (
        <div className={`bg-[#181923] w-full h-screen`}>
            <div className={`flex flex-row w-full md:mx-8 items-center`}>
                <Image src={Logo} alt={"logo"} className={`w-16 md:my-8`}/>
                <p className={`text-white font-bold text-3xl my-8 mx-4`}>Lightly</p>
            </div>

            <div className={`flex flex-row justify-center w-full`}>
                <div className={`border-gray-800 border-2 w-full flex flex-col bg-[#0D0F22] p-6 mx-6 w-full md:w-2/3 h-1/2  rounded-xl `}>

                    <div className={`flex flex-row justify-center`}>
                        <p className={`text-white text-4xl font-bold w-96 text-center`}>Your file is encrypted and ready to send</p>
                    </div>

                    <div className={`flex flex-row justify-center`}>
                        <p className={`text-white text-lg my-8 w-96 text-center`}>Copy the link to share your file with others</p>
                    </div>


                    <div className={`flex flex-row justify-center items-center gap-3 mx-32`}>
                        <input disabled={true} value={link} type="text" id="first_name"
                               className=" hover:cursor-text bg-gray-50 border bg-gray-900 text-white text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                               placeholder="link" required/>

                        <div onMouseOver={onQr} onMouseLeave={onQrLeave}>
                            <QRCodeSVG fgColor={'#000000'} bgColor={'#ffffff'} value={link}
                                       includeMargin={true} level={'Q'} size={size}/>
                        </div>
                    </div>

                    <button onClick={onCopyClick}
                            type="button"
                            className={`mt-12 mx-32 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5`} >{buttonText}
                    </button>
                    <div  className={`flex flex-row justify-center`}>
                        <p onClick={onClickOk} className={`text-lg text-blue-800 hover:cursor-pointer`}>ok</p>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Share;
