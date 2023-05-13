import {
  Card, Image, Text, Badge, Button, Group,
  ActionIcon, createStyles,
} from '@mantine/core';
import { IconHeart } from '@tabler/icons-react';
import { useState, useEffect } from "react";
import { PORT } from "./constants"
import axios from "axios"
import React from "react";

// const [title, setTitle] = useState('');
// const [cover_img, setCoverImg] = useState('');
// const [abstract, setAbstract] = useState('');
// const [average_rating, setAverageRating] = useState(5);
// const [price, setPrice] = useState('');
// const [edit_date, setEditDate] = useState('');
// const [publish_date, setPublishDate] = useState('');


const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },

  section: {
    borderBottom: `${1} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
      }`,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    paddingBottom: theme.spacing.md,
  },

  like: {
    color: theme.colors.red[6],
  },

  label: {
    textTransform: 'uppercase',
    fontSize: theme.fontSizes.xs,
    fontWeight: 700,
  },
}));


interface BookProps {
  title: string
  cover_img: string
  abstract: string
  average_rating: number
  price: number

  edit_date: Date
  publish_date: Date
  tags: string[]
}




function StudentBookInfo({ title, cover_img, abstract, average_rating, price, edit_date, publish_date, tags }: BookProps) {
  const { classes, theme } = useStyles();


  const [book, setBook] = useState<BookProps | null>();

  const API_URL = `http://localhost:${PORT}/book?bookId=c5b8c713-5b8b-4e17-a07a-7731a7c263c2`;

  const getBook = async () => {
    try {
      const fetchData = await axios.get(API_URL, {
        // headers: {
        //   authorization: 'Bearer JWT Token',
        // },
      })

      const authorId = fetchData.data.authorId;
      const bookId = fetchData.data.bookId;
      const chaptersTitles = fetchData.data.chaptersTitles;

      const bookData:BookProps = {
        average_rating: fetchData.data.avgRate,
        abstract:fetchData.data.bookAbstract,
        cover_img:fetchData.data.bookCoverPath,
        // chaptersTitles:fetchData.data.chaptersTitles,
        edit_date:fetchData.data.lastEditDate,
        price:fetchData.data.price,
        publish_date:fetchData.data.publishDate,
        tags:fetchData.data.tags,
        title:fetchData.data.title
      }
      setBook(bookData);
      console.log("book:" + book);
      console.log(bookData)
      console.log(fetchData.data);

    } catch (error) {
      console.log(error)
    }
  }

{/*  */}
  useEffect(() => {
    window.addEventListener('load', getBook)
    return () => {
      window.removeEventListener('load', getBook)
    }
  }, [book])
  console.log("book:" + book);

  const features = tags.map((tag) => (
    <Badge
      color={theme.colorScheme === 'dark' ? 'dark' : 'gray'}
      key={tag}
    // leftSection={badge.emoji}
    >
      {tag}
    </Badge>
  ));

  return (
    <Card withBorder radius="md" p="md" className={classes.card}>
      <Card.Section>
        <Image src={cover_img} alt={title} height={180} />
      </Card.Section>

      <Card.Section className={classes.section} mt="md">
        <Group position="apart">
          <Text fz="lg" fw={500}>
            {title}
          </Text>
          <Badge size="sm">{average_rating}</Badge>
        </Group>
        <Text fz="sm" mt="xs">
          {abstract}
        </Text>
      </Card.Section>

      <Card.Section className={classes.section}>
        <Text mt="md" className={classes.label} c="dimmed">
          Perfect for you, if you enjoy
        </Text>
        <Group spacing={7} mt={5}>
          {features}
        </Group>
      </Card.Section>

      <Group mt="xs">
        <Button radius="md" style={{ flex: 1 }}>
          Get this Book !
        </Button>
        <ActionIcon variant="default" radius="md" size={36}>
          <IconHeart size="1.1rem" className={classes.like} stroke={1.5} />
        </ActionIcon>
      </Group>
    </Card>
  );
}

export default StudentBookInfo