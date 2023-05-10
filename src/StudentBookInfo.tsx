import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';
import { useState} from "react";
import {PORT} from "./constants"
import axios from "axios"
import React from "react";

const [title, setTitle] = useState('');
const [cover_img, setCoverImg] = useState('');
const [abstract, setAbstract] = useState('');
const [average_rating, setAverageRating] = useState(null);
const [price, setPrice] = useState('');
const [edit_date, setEditDate] = useState('');
const [publish_date, setPublishDate] = useState('');


type BookProps = {
  title: string
  cover_img: string
  abstract: string
  average_rating : DoubleRange
  price: DoubleRange
  
  edit_date: Date
  publish_date : Date
}

const baseURL = `http://localhost:${PORT}`;

React.useEffect(() => {
  axios.get(baseURL).then((response) => {
    setTitle(response.data);
  });
}, []);

// if (!title) return null;


function Demo({ title, cover_img, abstract, average_rating, price, edit_date, publish_date}: BookProps) {
  return (
    <Card shadow="sm" radius="md" withBorder>
      <Card.Section component="a" href="https://mantine.dev/">
        <Image
          src={cover_img}
          height={160}
          alt=""
        />
      </Card.Section>

      <Group position="apart" mt="md" mb="xs">
        <Text weight={500}>{title}</Text>
        <Badge color="pink" variant="light">
          On Sale
        </Badge>
      </Group>

      <Text size="sm" color="dimmed">
        {abstract}
      </Text>

      <Button variant="light" color="blue" fullWidth mt="md" radius="md">
        Book classic tour now
      </Button>
    </Card>
  );
}

export default Demo