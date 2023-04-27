import { useState, useRef } from 'react';
import { FileButton, Button, Group, Text, ActionIcon } from '@mantine/core';
import { IconArrowBarRight } from '@tabler/icons-react';
import getBase64 from "./services/ConvertFileToBase"

function UploadButtons() {
  const [file, setFile] = useState<File | null>(null);
  const [fileBase64, setFileBase64] = useState('');
  const resetRef = useRef<() => void>(null);

  const clearFile = () => {
    setFile(null);
    resetRef.current?.();
  };

  const photo = {
    pictureFile: file,
    pictureBase64: fileBase64
  }

  // const fileChangedHandler = (file: any) => {
    
  //   const reader = new FileReader();

  //   reader.onloadend = () => {
  //     const result = reader.result as string
  //     setFileBase64(result);
  //   };

  //   reader.readAsDataURL(file);
  // };

  const handleUploadPicture = (e: { preventDefault: () => void; }) => {

        let document = "";
        let reader = new FileReader();
        const blobFile = file as Blob;
        reader.readAsDataURL(blobFile);
        reader.onload = function () {
            document = reader.result as string;
            console.log("onload "+ document)
            setFileBase64(document);
            console.log("onload base64State "+ fileBase64)
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
            return "error";
        };
        console.log("doc outside onload"+document);
        console.log("base64 in fn upload"+fileBase64);
        console.log(photo)
    }

  return (
    <>
      <Group position="center" >
        <FileButton resetRef={resetRef} onChange={setFile} 
        accept="image/png,image/jpeg">
          {(props) => <Button {...props}>Upload image</Button >}
        </FileButton>
        {/* <ActionIcon variant="transparent"><IconArrowBarRight size="1rem" />Reset</ActionIcon> */}
        <Button disabled={!file} color="red" onClick={clearFile} size="xs">
          Reset
        </Button>
        <Button disabled={!file} color="green" onClick={handleUploadPicture} size="xs">
          Verify
        </Button>
      </Group>

      {file && (
        <Text size="sm" align="center" mt="sm">
          Picked file: {file.name}
        </Text>
      )}
    </>
  );
}
export default UploadButtons;