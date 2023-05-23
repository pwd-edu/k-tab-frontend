import { createStyles, Card, Group, Switch, Text, rem, TextInput, Slider } from '@mantine/core';
import { IconAccessible } from '@tabler/icons-react';
import { FontPicker } from './FontPicker';
import { QuantityInput } from './NumberInputComponent';
import { useHover } from '@mantine/hooks';
import { camelCaseToWord } from './CamelCaseToWord';

const useStyles = createStyles((theme) => ({
    card: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    },

    item: {
        '& + &': {
            paddingTop: theme.spacing.sm,
            marginTop: theme.spacing.sm,
            borderTop: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
                }`,
        },
    },

    switch: {
        '& *': {
            cursor: 'pointer',
        },
    },

    title: {
        lineHeight: 1,
    },
}));

export interface SwitchesCardProps {
    data: {
        name: string;
        type: string;
        value: any;
    }[];
}



// const useStylesSlider = createStyles((theme) => ({
//     thumb: {
//         border: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[3]
//             }`,
//         width: rem(28),
//         height: rem(22),
//         color: theme.colors.gray[5],
//         backgroundColor: theme.white,
//         borderRadius: theme.radius.sm,
//     },
// }));






export function UIsettings({ data }: SwitchesCardProps) {
    const { hovered, ref } = useHover();
    const { classes } = useStyles();
    const stylesSlider = { thumb: { borderWidth: 2, height: 26, width: 26, padding: 3 } };



    const items = data.map(item => {
        if (item.type === "Boolean") {
            return (<Group position="apart" className={classes.item} noWrap spacing="xl">
                <div>
                    <Text>{camelCaseToWord(item.name)}</Text>
                </div>
                <Switch onLabel="ON" offLabel="OFF" value={item.value} className={classes.switch} size="lg" />
            </Group>)
        }
        if (item.type === "String") {
            if (item.name === "fontStyle") {
                return <Group position="apart" className={classes.item} noWrap spacing="xl">
                    <div>
                        <Text>{camelCaseToWord(item.name)}</Text>

                    </div>
                    <FontPicker defaultValue={item.value} />
                </Group>

            }
            else {
                return <Group position="apart" className={classes.item} noWrap spacing="xl">
                    <div>
                        <Text>{camelCaseToWord(item.name)}</Text>

                    </div>
                    <TextInput value={item.value} size="lg" />
                </Group>
            }

        }
        if (item.type === "Integer") {
            if (item.name === "fontSize") {
                return <Group position="apart" className={classes.item} noWrap spacing="xl">
                    <div>
                        <Text>{camelCaseToWord(item.name)}</Text>

                    </div>
                    <QuantityInput defaultValue={item.value} />
                </Group>

            }
            else {
                return <div>
                    <Group position="apart" className={classes.item} noWrap spacing="xl">
                        <div>
                            <Text>{camelCaseToWord(item.name)}</Text>

                        </div>

                    </Group>
                    {/* <Slider
                            defaultValue={40}
                            min={10}
                            max={90}
                            ref={ref}
                            label={null}
                            styles={{
                                thumb: {
                                    transition: 'opacity 150ms ease',
                                    opacity: hovered ? 1 : 0,
                                },

                                dragging: {
                                    opacity: 1,
                                },
                            }}
                        /> */}
                    <br></br>

                    <Slider
                        thumbChildren={<IconAccessible size="1rem" stroke={1.5} />}
                        color="blue"
                        label={null}
                        defaultValue={40}
                        min={10}
                        max={90}
                        ref={ref}
                        styles={stylesSlider}
                        value={item.value}
                      
                    />
                    <br></br>
                </div>
            }

        }
    }

    );

    return (
        <Card withBorder radius="md" p="xl" className={classes.card}>
            <Text fz="lg" className={classes.title} fw={500} color="blue">
                <b>Configure UI Preferences</b>
            </Text>
            <Text fz="xs" c="dimmed" mt={3} mb="xl">
                Choose what preferences you want to display
            </Text>
            {items}
        </Card>
    );
}

export default UIsettings