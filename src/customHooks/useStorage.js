import { useState, useEffect } from "react";
import { storage } from '../firebase/config'
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

const useStorage = (file) => {

    const [uplodingProgress, setUplodingProgress] = useState(0)
    const [error, setError] = useState(null)
    const [imageUrl, setImageUrl] = useState(null)

    useEffect(() => {
    
        if (file) {
            const storageRef = ref(storage, `images/${file.name}`)
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on("state_changed",
                (snapshot) => {
                    const progress =
                        Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                    setUplodingProgress(progress);
                },
                (error) => {
                    setError(error);
                },
                () => {

                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setImageUrl(downloadURL)
                    });
                }
            );

        }

    }, [file])

    return { uplodingProgress, error, imageUrl }
}

export default useStorage;