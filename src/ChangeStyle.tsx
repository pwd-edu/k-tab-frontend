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

import { MantineProvider, useMantineTheme, MantineTheme } from "@mantine/core"
import App from "./App"

interface ReactCompProps {
    component: React.ReactNode | React.ReactNode[]
}

export default function DarkMode({
    component,
}: {
    component: React.ReactNode | React.ReactNode[]
}) {
    return <MantineProvider theme={{ colorScheme: "dark" }}>{component}</MantineProvider>
}

function getColor(theme: MantineTheme) {
    return theme.colors.blue[5]
}

export function changeBackground({
    component,
}: {
    component: React.ReactNode | React.ReactNode[]
}) {
    const theme = useMantineTheme()
    return <div style={{ background: getColor(theme) }}> {component}</div>
}

function AppDarkMode() {
    return (
        <MantineProvider theme={{ colorScheme: "dark" }}>
            <App />
        </MantineProvider>
    )
}

function AppDarkMode() {
    return (
        <MantineProvider theme={{ colorScheme: "dark" }}>
            <App />
        </MantineProvider>
    )
}
