import { useState, useRef } from "react";
import { PORT } from "./constants"
import { useToggle, upperFirst } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import {
  TextInput, FileButton, Text, Paper, Group, PaperProps,
  Button, Divider, Anchor, Stack, Textarea
} from '@mantine/core';
// import StudentBookInfo from "./StudentBookInfo";




type BookProps = {
  title: string
  cover_img: string
  abstract: string
  average_rating: DoubleRange
  price: DoubleRange

  edit_date: Date
  publish_date: Date
}

export function BookInfoForm(props: PaperProps) {

  const [type, toggle] = useToggle(['edit', 'view']);
  const [coverPhotoFile, setCoverPhotoFile] = useState<File | null>();
  const resetRef = useRef<() => void>(null);

  const baseURL = `http://localhost:${PORT}/book`;



  const form = useForm({
    initialValues: {
      title: '',
      price: '',
      abstract: '',
      coverImage: ''
    },

    validate: {
      price: (val) => (parseInt(val) <= 500 ? null : 'Invalid price'),
      abstract: (val) => (val.length >= 100 ? 'Abstract should be at least 100 characters' : null),
    },


  });

  const handleUploadImage = async () => {

    let document = "";
    let reader = new FileReader();
    const blobFile = coverPhotoFile as Blob;
    reader.readAsDataURL(blobFile);
    reader.onload = function () {
      document = reader.result as string;
      const base64String = document.replace('data:', '').replace(/^.+,/, '') as string;
      form.setFieldValue('coverImage', base64String);
      console.log("onload base64String " + base64String)
      // console.log("onload base64String " + {form.values.coverImage})
      // setProfilePhotoBase64(base64String);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
      return "error";
    }
  }

  
  const clearFile = () => {
    setCoverPhotoFile(null);
    resetRef.current?.();
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault(); //prevents refresh


    fetch(baseURL,
      {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form.values)
      }).then(() => {
        console.log(JSON.stringify(form.values))
        console.log("added new book")
      })

    console.log(form.values);
  }

  return (
    <Paper radius="md" p="xl" withBorder {...props}>
      <Text size="lg" weight={500}>
        Welcome to Your Library, {type} your {form.values.title} book
      </Text>


      {type == "edit" && <form onSubmit={handleSubmit}>
        <Stack>

          <br></br>
          <div style={{ margin: 'auto' }}>
            <Group position="center" >
              <FileButton resetRef={resetRef} onChange={setCoverPhotoFile}
                accept="image/png,image/jpeg">
                {(props) => <Button {...props}>Upload image</Button >}
              </FileButton>
              <Button disabled={!coverPhotoFile} color="red" onClick={clearFile} size="xs">
                Reset
              </Button>
              <Button disabled={!coverPhotoFile} color="green" onClick={handleUploadImage} size="xs">
                Verify
              </Button>
            </Group>
          </div>


          <Divider my="lg" />

          <TextInput
            required
            label="Book Title"
            placeholder="Title"
            value={form.values.title}
            onChange={(event) => form.setFieldValue('title', event.currentTarget.value)}
            radius="md"
          />


          <Textarea
            required
            label="Abstract"
            placeholder="Write your book abstract here.."
            value={form.values.abstract}
            onChange={(event) => form.setFieldValue('abstract', event.currentTarget.value)}
            error={form.errors.abstract && 'Abstract should be at least 100 characters'}
            radius="md"
            minRows={6}
          />

          <TextInput
            required
            label="Price"
            placeholder="Price in $"
            value={form.values.price}
            onChange={(event) => form.setFieldValue('price', event.currentTarget.value)}
            error={form.errors.price && 'Invalid price'}
            radius="md"
          />

        </Stack>

      </form>}

      {/* {
        type == "view" && <StudentBookInfo title={""} cover_img={""} abstract={""} average_rating={9} price={50.4} edit_date={new Date()} publish_date={new Date()} tags={["AI","Py"]}  />
      } */}

      <Group position="apart" mt="xl">
        <Anchor
          component="button"
          type="button"
          color="dimmed"
          onClick={() => toggle()}
          size="xs"
        >

          {type === 'edit'
            ? 'view the book info'
            : "edit the book info"}
        </Anchor>
        <Button type="submit" radius="xl">
          {upperFirst(type)}
        </Button>
      </Group>

    </Paper>
  )
}

