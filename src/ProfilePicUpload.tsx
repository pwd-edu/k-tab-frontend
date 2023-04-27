import { useState, useRef } from 'react';
import { FileButton, Button, Group, Text } from '@mantine/core';
import getBase64 from "./services/ConvertFileToBase"

function UploadButtons() {
  const [file, setFile] = useState<File | null>(null);
  const [fileBase64, setFileBase64] = useState("");
  const resetRef = useRef<() => void>(null);

  const clearFile = () => {
    setFile(null);
    resetRef.current?.();
  };

  const handleUploadPicture = (e: { preventDefault: () => void; }) => {
        e.preventDefault(); //prevents refresh
        console.log(file);
        setFileBase64(getBase64(file));
        console.log(fileBase64);

    }

  return (
    <>
      <Group position="center" >
        <FileButton resetRef={resetRef} onChange={setFile} accept="image/png,image/jpeg">
          {(props) => <Button {...props}>Upload image</Button >}
        </FileButton>
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