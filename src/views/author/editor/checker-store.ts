import { create } from "zustand"

import { TraverseResult } from "./AccessiblityCheckerDrawer"
import { Rule } from "./extensions/rules"

type CheckerState = {
    errors: TraverseResult<Rule>[]
    current_err_index: number
}

type CheckerAction = {
    setErrors: (errors: CheckerState["errors"]) => void
    setCurrentErrIndex: (index: CheckerState["current_err_index"]) => void
}

export const useCheckerStore = create<CheckerState & CheckerAction>((set) => ({
    errors: [],
    current_err_index: 0,
    setErrors: (errors) => set({ errors: errors }),
    setCurrentErrIndex: (index) => set({ current_err_index: index }),
}))
