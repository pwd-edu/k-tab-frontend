import {
  Card, Image, Text, Badge, Button, Group,
  ActionIcon, createStyles,
} from '@mantine/core';
import { IconHeart } from '@tabler/icons-react';
import { useState, useEffect } from "react";
import { PORT } from "./constants"
import axios from "axios"



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




function StudentBookInfo({ tags }: BookProps) {
  const { classes, theme } = useStyles();


  const [book, setBook] = useState<BookProps>(Object);

  const bookID = "6c1386b3-96bb-45d0-bb4b-c35a280b44ce";

  const API_URL = `http://localhost:${PORT}/book?bookId=${bookID}`;

  const getBook = async () => {
    try {
      const fetchData = await axios.get(API_URL, {
        headers: {
          authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtYXJpYW1AZ21haWwuY29tIiwidXNlcklkIjoiNmMxMzg2YjMtOTZiYi00NWQwLWJiNGItYzM1YTI4MGI0NGNlIiwidXNlclR5cGUiOiJBRE1JTiIsImlhdCI6MTY4NDc2MzM1MiwiZXhwIjoxNjg1OTE2MDAwfQ.O0AvLmwmqbTweVbNzL2sRvbgBC0sUT9kZtX8z8bX7kw',
        },
      })

      const authorId = fetchData.data.authorId;
      const bookId = fetchData.data.bookId;
      const chaptersTitles = fetchData.data.chaptersTitles;

      const bookData: BookProps = {
        average_rating: fetchData.data.avgRate,
        abstract: fetchData.data.bookAbstract,
        cover_img: fetchData.data.bookCoverPath,
        edit_date: fetchData.data.lastEditDate,
        price: fetchData.data.price,
        publish_date: fetchData.data.publishDate,
        tags: fetchData.data.tags,
        title: fetchData.data.title
      }
      setBook(bookData);
      console.log("book:" + book);
      console.log(bookData)
      console.log(fetchData.data);
      console.log("BookData title: " + bookData.title);

    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    window.addEventListener('load', getBook)
    return () => {
      window.removeEventListener('load', getBook)
    }
  }, [book])
  console.log("book:" + book);

  const bookTags = book.tags
  const features = bookTags.map((tag) => (
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
        <Image src={book.cover_img} alt={book.title} height={180} />
      </Card.Section>

      <Card.Section className={classes.section} mt="md">
        <Group position="apart">
          <Text fz="lg" fw={500}>
            {book.title}
          </Text>
          <Badge size="sm">{book.average_rating}</Badge>
        </Group>
        <Text fz="sm" mt="xs">
          {book.abstract}
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
          Get this Book for {book.price} $
        </Button>
        <ActionIcon variant="default" radius="md" size={36}>
          <IconHeart size="1.1rem" className={classes.like} stroke={1.5} />
        </ActionIcon>
      </Group>
    </Card>
  );
}

export default StudentBookInfo