import React, {useEffect, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import AddPhoto from "../public/addPhoto.svg"
import Image from "next/image";
import {AiOutlineFile} from 'react-icons/ai'
import {UploadFile} from "../networkCalls/lightlyApis";
import { useRouter } from 'next/router'


function FileDrop(props) {

    const [time, setTime] = useState(0);
    const [disableUpload, setDisableUpload] = useState(false);
    const [warning, setWarning] = useState("");
    const [buttonText, setButtonText] = useState("Upload File");
    const router = useRouter()


    useEffect(() => {

        setTimeout(()=>{
            setWarning("")

        },5000)
    }, [warning]);



    const {
        acceptedFiles,
        fileRejections,
        getRootProps,
        getInputProps,} = useDropzone({
        maxFiles:1,

        onDrop: acceptedFiles => {
            console.log(acceptedFiles)

        }
    });

    const onExpireClick = (e) =>{
        if (e.currentTarget.id === "5min"){
            setTime(5)
        }else if (e.currentTarget.id === "10min"){
            setTime(10)
        }else if (e.currentTarget.id === "25min"){
            setTime(25)
        }
        else setTime(10)
    }


    const OnUploadCLick = (e) => {
        console.log("clicked")
        console.log(acceptedFiles[0].size/ 1024 / 1024)
        setButtonText("Uploading...")
        if (acceptedFiles[0].size/ 1024 / 1024 >150){
            console.log("Exceeded")
            setWarning("File size is more than 10 mb.")
            setButtonText("Upload File")
            return
        }

        setDisableUpload(true)
        if (acceptedFiles.length === 0){
            setWarning("Error : Select a file first.")
            setButtonText("Upload File")
            setDisableUpload(false)
        }else  {
            UploadFile(acceptedFiles[0],time,(res) => {
                console.log(res)

                if (res === undefined) {
                    setWarning("Error : some error happened")
                    setDisableUpload(false)
                    setButtonText("Upload File")

                }else if(res.status === 200){
                    console.log(res.data.data)
                    setDisableUpload(false)
                    router.push({
                        pathname: '/share',
                        query: { link: res.data.data,name : acceptedFiles[0].name }
                    })
                    setButtonText("Upload File")
                }
            })
        }
    }




    const acceptedFileItems = acceptedFiles.map(file => (
        <div key={file.path} className="border-2 rounded-lg p-2 my-2 mr-14 w-full">
            <div className="flex flex-row items-center">
                <AiOutlineFile size='1.8rem' className={`text-white`}/>
                <p className="text-white font-space text-lg text-clip">
                    {file.name}
                </p>
            </div>

        </div>
    ));

    const fileRejectionItems = fileRejections.map(({ file, errors  }) => {
        return (
            <li key={file.path}>
                {file.path} - {file.size} bytes
                <ul>
                    {errors.map(e => <li key={e.code}>{e.message}</li>)}
                </ul>

            </li>
        )
    });

    return (
        <div className={`w-full flex flex-col bg-[#0D0F22] p-3 md:p-6 md:mx-6 w-full md:w-1/2 h-1/2`}>
            <section className="">
                <div className="flex flex-col">
                    <div {...getRootProps({ className: 'h-60  flex flex-col dropzone border-2 border-dashed p-4 md:p-10 my-2 items-center rounded-lg' })}>
                        <input {...getInputProps()} />

                        <p className={`text-white`}>Drag and drop some files here, or click to select files</p>
                        <Image src={AddPhoto} alt={"Add Photo"} className="m-4"/>
                        <em className="font-semibold text-base text-center font-space">{props.msg}</em>
                    </div>
                    <aside>
                        <ul>{acceptedFileItems}</ul>
                    </aside>
                </div>
            </section>

            <h3 className="mt-4 mb-1 font-semibold text-gray-900 dark:text-white">Expire After</h3>
            <div className="flex flex-row items-center gap-4">
                <ul className="items-center w-full text-sm font-medium rounded-lg border  sm:flex bg-gray-700 border-gray-600 text-white">
                    <li className="w-full border-b sm:border-b-0 sm:border-r border-gray-600">
                        <div className="flex items-center pl-3">
                            <input onClick={onExpireClick} id="5min" type="radio" value="" name="list-radio"
                                   className="w-4 h-4 bg-gray-600 border-gray-500"/>
                                <label htmlFor="horizontal-list-radio-license"
                                       className="py-3 ml-2 w-full text-sm font-medium text-gray-300">5 Mins</label>
                        </div>
                    </li>
                    <li  className="w-full border-b sm:border-b-0 sm:border-r border-gray-600">
                        <div className="flex items-center pl-3">
                            <input onClick={onExpireClick} id="10min" type="radio" value="" name="list-radio"
                                   className="w-4 h-4 bg-gray-600 border-gray-500"/>
                            <label htmlFor="horizontal-list-radio-license"
                                   className="py-3 ml-2 w-full text-sm font-medium text-gray-300">10 Mins</label>
                        </div>
                    </li>
                    <li className="w-full border-b sm:border-b-0 sm:border-r border-gray-600">
                        <div className="flex items-center pl-3">
                            <input onClick={onExpireClick}  id="25min" type="radio" value="" name="list-radio"
                                   className="w-4 h-4 bg-gray-600 border-gray-500"/>
                            <label htmlFor="horizontal-list-radio-license"
                                   className="py-3 ml-2 w-full text-sm font-medium text-gray-300">25 Mins</label>
                        </div>
                    </li>
                </ul>

            </div>

            <button onClick={OnUploadCLick} type="button"
                    className={` text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-4 mb-2`} disabled={disableUpload}>{buttonText}
            </button>
            <p className={`text-red-500 font-bold text-lg`}> {warning}</p>

        </div>

    );
}

export default FileDrop;