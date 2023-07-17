const handleUploadPicture = () => {
    let document = ""
    const reader = new FileReader()
    const blobFile = file as Blob
    reader.readAsDataURL(
        "https://fastly.picsum.photos/id/134/300/300.jpg?hmac=b3gMz-pfa737vVp8dKmvrVyW-eLFdbJ6Zju4XLUr62k"
    )
    reader.onload = function () {
        document = reader.result as string
        const base64String = document.replace("data:", "").replace(/^.+,/, "") as string
        console.log("onload " + base64String)
        setFileBase64(base64String)
        console.log("onload base64State " + fileBase64)
    }
    reader.onerror = function (error) {
        console.log("Error: ", error)
        return "error"
    }
    return
}
