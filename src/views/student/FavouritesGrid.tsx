import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd"
import { Text, createStyles, rem } from "@mantine/core"
import { useListState } from "@mantine/hooks"

const useStyles = createStyles((theme) => ({
    item: {
        ...theme.fn.focusStyles(),
        display: "flex",
        alignItems: "center",
        borderRadius: theme.radius.md,
        border: `${rem(1)} solid ${
            theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
        }`,
        padding: `${theme.spacing.sm} ${theme.spacing.xl}`,
        backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.white,
        marginBottom: theme.spacing.sm,
    },

    itemDragging: {
        boxShadow: theme.shadows.sm,
    },

    symbol: {
        fontSize: rem(30),
        fontWeight: 700,
        width: rem(60),
    },
}))

interface DndListProps {
    data: {
        position: number
        mass: number
        symbol: string
        name: string
    }[]
}

export function DndList({ data }: DndListProps) {
    const { classes, cx } = useStyles()
    const [state, handlers] = useListState(data)

    const items = state.map((item, index) => (
        <Draggable key={item.symbol} index={index} draggableId={item.symbol}>
            {(provided: any, snapshot: any) => (
                <div
                    className={cx(classes.item, { [classes.itemDragging]: snapshot.isDragging })}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    <Text className={classes.symbol}>{item.symbol}</Text>
                    <div>
                        <Text>{item.name}</Text>
                        <Text color="dimmed" size="sm">
                            Position: {item.position} • Mass: {item.mass}
                        </Text>
                    </div>
                </div>
            )}
        </Draggable>
    ))

    return (
        <DragDropContext
            onDragEnd={({ destination, source }: any) =>
                handlers.reorder({ from: source.index, to: destination?.index || 0 })
            }
        >
            <Droppable droppableId="dnd-list" direction="vertical">
                {(provided: any) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                        {items}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    )
}
