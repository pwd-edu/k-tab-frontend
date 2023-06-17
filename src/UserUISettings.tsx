import { useState } from 'react';
import { createStyles, Card, Group, Switch, Text, rem, TextInput, Slider, UnstyledButton,Center,
    useMantineColorScheme } from '@mantine/core';
import { IconAccessible, IconMoon, IconSun } from '@tabler/icons-react';
import { upperFirst } from '@mantine/hooks';
import { FontPicker } from './FontPicker';
import { QuantityInput } from './NumberInputComponent';
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

    control: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 1000,
        paddingLeft: theme.spacing.sm,
        paddingRight: rem(4),
        width: rem(136),
        height: rem(36),
      },
    
      iconWrapper: {
        height: rem(28),
        width: rem(28),
        borderRadius: rem(28),
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.yellow[4] : theme.colors.dark[4],
        color: theme.colorScheme === 'dark' ? theme.black : theme.colors.blue[2],
      },
    
      value: {
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




export function UIsettings({ data }: SwitchesCardProps) {
    
    const { classes } = useStyles();
    const stylesSlider = { thumb: { borderWidth: 2, height: 26, width: 26, padding: 3 } };
    // const [invertColor, setInvertColorValue] = useState<number | ''>(100);
    // const { classesDarkModeSwitch } = useStylesDarkModeSwitch();
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const Icon = colorScheme === 'dark' ? IconSun : IconMoon;

    

    



    const items = data.map(item => {
        if (item.type === "Boolean") {
            console.log(item.value)
            return (<Group position="apart" className={classes.item} noWrap spacing="xl">
                <div>
                    <Text>{camelCaseToWord(item.name)}</Text>
                </div>
                <Switch onLabel="ON" offLabel="OFF" className={classes.switch} size="lg" 
                checked={item.value === true}
                />
            </Group>)
        }
        if (item.type === "String") {
            if (item.name === "fontStyle") {
                return <Group position="apart" className={classes.item} noWrap spacing="xl">
                    <div>
                        <Text>{camelCaseToWord(item.name)}</Text>

                    </div>
                    <FontPicker defaultValue={item.value}  onChange={(e: any) => item.value = (e.valueOf)}/>
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
                    <QuantityInput defaultValue={item.value} min={8} max={120} onChange={(e: any) => item.value = (e.valueOf)}/>
                </Group>

            }
            if (item.name === "darkMode"){
                return (
                    <Group position="center" my="xl">
                      <UnstyledButton
                        aria-label="Toggle theme"
                        className={classes.control}
                        onClick={() => toggleColorScheme()}
                        title="Ctrl + J"
                      >
                        <Text size="sm" className={classes.value}>
                          {upperFirst(colorScheme === 'light' ? 'dark' : 'light')} theme
                        </Text>
                
                        <Center className={classes.iconWrapper}>
                          <Icon size="1.05rem" stroke={1.5} />
                        </Center>
                      </UnstyledButton>
                    </Group>
                  );

            }
            else {
                console.log(item.value)
                return <div>
                    <Group position="apart" className={classes.item} noWrap spacing="xl">
                        <div>
                            <Text>{camelCaseToWord(item.name)}</Text>

                        </div>

                    </Group>
                    <br></br>
                    <Slider
                        thumbChildren={<IconAccessible size="1rem" stroke={1.5} />}
                        color="blue"
                        label={null}
                        defaultValue={item.value}
                        min={0}
                        max={100}
                        onChange={(e) => item.value = (e.valueOf) }
                        styles={stylesSlider}
                      
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