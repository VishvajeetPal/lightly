import React from 'react';
import FileDrop from "./FileDrop";

function FileShare(props) {
    return (
        <div className={`flex flex-col md:flex-row bg-[#0D0F22] md:mx-52 w-full md:w-3/4 items-start rounded-lg border-2 border-slate-600`}>
            <FileDrop/>
            <div className={`flex flex-col items-start md:-mr-14 md:mt-8`}>
                <p className={`text-white mx-2  text-4xl`}>Simple, private file sharing</p>
                <p className={`text-white mx-2 my-4  text-lg md:w-96 md:my-6`}>Send lets you share files with end-to-end encryption and a link that automatically expires. So you can keep what you share private and make sure your stuff doesn’t stay online forever</p>
            </div>
        </div>
    );
}

export default FileShare;