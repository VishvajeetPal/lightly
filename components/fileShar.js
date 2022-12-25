import React from 'react';
import FileDrop from "./FileDrop";

function FileShare(props) {
    return (
        <div className={`flex flex-row bg-[#0D0F22] mx-52 items-start rounded-lg border-2 border-slate-600`}>
            <FileDrop/>
            <div className={`flex flex-col items-start -mr-14 mt-8`}>
                <p className={`text-white  text-4xl`}>Simple, private file sharing</p>
                <p className={`text-white text-lg w-96 my-6`}>Send lets you share files with end-to-end encryption and a link that automatically expires. So you can keep what you share private and make sure your stuff doesn’t stay online forever</p>
            </div>
        </div>
    );
}

export default FileShare;