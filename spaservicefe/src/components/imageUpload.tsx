import { useState } from 'react'
import { storage } from '../firebaseConfig'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'

const ImageUpload = () => {
  const [image, setImage] = useState<File | null>(null)
  const [progress, setProgress] = useState<number>(0)
  const [downloadURL, setDownloadURL] = useState<string | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImage(event.target.files[0])
    }
  }

  const handleUpload = () => {
    if (!image) return

    const storageRef = ref(storage, `images/${image.name}`)
    const uploadTask = uploadBytesResumable(storageRef, image)

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        setProgress(progress)
      },
      (error) => {
        console.error('Upload failed:', error)
      },
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref)
        setDownloadURL(url)
      }
    )
  }

  return (
    <div>
      <input type='file' onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {progress > 0 && <p>Upload Progress: {progress.toFixed(2)}%</p>}
      {downloadURL && <img src={downloadURL} alt='Uploaded' />}
    </div>
  )
}

export default ImageUpload
