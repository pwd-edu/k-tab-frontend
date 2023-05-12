// import { Card, Image, Text, Badge, Button, Group, 
//   ActionIcon,createStyles, } from '@mantine/core';
//   import { IconHeart } from '@tabler/icons-react';
// import { useState} from "react";
// import {PORT} from "./constants"
// import axios from "axios"
// import React from "react";

// // const [title, setTitle] = useState('');
// // const [cover_img, setCoverImg] = useState('');
// // const [abstract, setAbstract] = useState('');
// // const [average_rating, setAverageRating] = useState(5);
// // const [price, setPrice] = useState('');
// // const [edit_date, setEditDate] = useState('');
// // const [publish_date, setPublishDate] = useState('');


// const useStyles = createStyles((theme) => ({
//   card: {
//     backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
//   },

//   section: {
//     borderBottom: `${1} solid ${
//       theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
//     }`,
//     paddingLeft: theme.spacing.md,
//     paddingRight: theme.spacing.md,
//     paddingBottom: theme.spacing.md,
//   },

//   like: {
//     color: theme.colors.red[6],
//   },

//   label: {
//     textTransform: 'uppercase',
//     fontSize: theme.fontSizes.xs,
//     fontWeight: 700,
//   },
// }));


// interface BookProps {
//   title: string
//   cover_img: string
//   abstract: string
//   average_rating : number
//   price: number
  
//   edit_date: Date
//   publish_date : Date
//   tags : string[]
// }

// const baseURL = `http://localhost:${PORT}`;

// // React.useEffect(() => {
// //   axios.get(baseURL).then((response) => {
// //     setTitle(response.data);
// //   });
// // }, []);

// // if (!title) return null;


// function StudentBookInfo({ title, cover_img, abstract, average_rating, price, edit_date, publish_date, tags}: BookProps) {
//   const { classes, theme } = useStyles();

//   // const features = tags.map((tags) => (
//   //   <Badge
//   //     color={theme.colorScheme === 'dark' ? 'dark' : 'gray'}
//   //     key={badge.label}
//   //     leftSection={badge.emoji}
//   //   >
//   //     {badge.label}
//   //   </Badge>
//   // ));

//   return (
//     <Card withBorder radius="md" p="md" className={classes.card}>
//       <Card.Section>
//         <Image src={cover_img} alt={title} height={180} />
//       </Card.Section>

//       <Card.Section className={classes.section} mt="md">
//         <Group position="apart">
//           <Text fz="lg" fw={500}>
//             {title}
//           </Text>
//           <Badge size="sm">{average_rating}</Badge>
//         </Group>
//         <Text fz="sm" mt="xs">
//           {abstract}
//         </Text>
//       </Card.Section>

//       <Card.Section className={classes.section}>
//         <Text mt="md" className={classes.label} c="dimmed">
//           Perfect for you, if you enjoy
//         </Text>
//         <Group spacing={7} mt={5}>
//           {tags}
//         </Group>
//       </Card.Section>

//       <Group mt="xs">
//         <Button radius="md" style={{ flex: 1 }}>
//           Show details
//         </Button>
//         <ActionIcon variant="default" radius="md" size={36}>
//           <IconHeart size="1.1rem" className={classes.like} stroke={1.5} />
//         </ActionIcon>
//       </Group>
//     </Card>
//   );
// }

// export default StudentBookInfo