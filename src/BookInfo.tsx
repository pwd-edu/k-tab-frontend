import { useState } from "react";
import { PORT } from "./constants"
import axios from "axios"
import React from "react";
import { useToggle, upperFirst } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import {
  Card, Image, TextInput, PasswordInput, Text, Paper, Group, PaperProps,
  Button, Divider, Checkbox, Anchor, Stack, Textarea, Title, useMantineTheme
} from '@mantine/core';
import { InsertImagePlaceHolder } from "./ImagePlaceHolder"
import { FileWithPath } from "@mantine/dropzone"
import aofm from "./assets/aofm.jpg"



// const [bookInfo, setBookInfo] = useState("");



type BookProps = {
  title: string
  cover_img: string
  abstract: string
  average_rating: DoubleRange
  price: DoubleRange

  edit_date: Date
  publish_date: Date
}

// const baseURL = `http://localhost:${PORT}/book`;

// React.useEffect(() => {
//   axios.post(baseURL).then((response) => {
//     setBookInfo(response.data);
//   });
// }, []);

// function createBookInfo() {
//   axios
//     .post(baseURL, {
//       // title: title
//     })
//     .then((response) => {
//       setBookInfo(response.data);
//     });
// }

// if (!title) return null;


export function BookInfoForm(props: PaperProps) {

  const [type, toggle] = useToggle(['view', 'edit']);
  const [coverPhotoFile, setCoverPhotoFile] = useState<FileWithPath[]>();

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
    const blobFile = coverPhotoFile as unknown as Blob;
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

  const setImageAndUpload = async (files:FileWithPath[]) => {
    setCoverPhotoFile(files);
    console.log(coverPhotoFile);
    handleUploadImage()

    
  }

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

      
        <div style={{ margin: 'auto' }}>
          <InsertImagePlaceHolder onUpload={setImageAndUpload}  radius={"lg"}/>
        </div>
      

      <Divider my="lg" />

      <form onSubmit={handleSubmit}>
        <Stack>
          {type === 'edit' && (
            <TextInput
              required
              label="Book Title"
              placeholder="Title"
              value={form.values.title}
              onChange={(event) => form.setFieldValue('title', event.currentTarget.value)}
              radius="md"
            />
          )}

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

          {/* <BubbleInput data = ['input1', 'input2'] /> */}


          {/* {type === 'edit' && (
            <Checkbox
              label="I accept terms and conditions"
              checked={form.values.terms}
              onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
            />
          )} */}
        </Stack>

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
      </form>
    </Paper>
  )
}

