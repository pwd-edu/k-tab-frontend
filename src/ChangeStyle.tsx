// // export function invertColors(className: string, value: string){
// //     document.getElementsByClassName(className)[0].style.filter =  grayscale(1); 
// // }

// import { MantineProvider } from '@mantine/core';
// import App from './App';

// function Demo() {
//   return (
//     <MantineProvider
//       theme={{
//         globalStyles: (theme) => ({
//           '*, *::before, *::after': {
//             boxSizing: 'border-box',
//           },

//           body: {
//             ...theme.fn.fontStyles(),
//             backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
//             color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
//             lineHeight: theme.lineHeight,
//           },

//           '.your-class': {
//             backgroundColor: 'red',
//           },

//           '#your-id > [data-active]': {
//             backgroundColor: 'pink',
//           },
//         }),
//       }}
//     >
//       <App />
//     </MantineProvider>
//   );
// }