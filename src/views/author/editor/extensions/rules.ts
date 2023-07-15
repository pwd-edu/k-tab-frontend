import _ from "lodash"

export interface Rule {
    id: string
    name: string
    link: string
    check: (elem: Element) => boolean
    data?: (elem: Element) => any
    message: (data?: any) => string
    why: (data?: any) => string
    linkText: (data?: any) => string
}

const IMG_ALT = {
    id: "img-alt",
    name: "Image Alt Text",
    check: (elem: Element) => {
        if (elem.tagName !== "IMG") {
            return true
        }

        const alt = elem.hasAttribute("alt") ? elem.getAttribute("alt") : null
        return alt !== null && _.isEmpty(alt) === false
    },

    data: (elem: Element) => {
        const alt = elem.hasAttribute("alt") ? elem.getAttribute("alt") : null
        return {
            alt: alt || "",
        }
    },

    message: () => "Images should include an alt attribute describing the image content.",

    why: () =>
        "Screen readers cannot determine what is displayed in an image without alternative text, which describes the content and meaning of the image.",

    link: "https://www.w3.org/TR/WCAG20-TECHS/H37.html",
    linkText: () => "Learn more about using alt text for images",
}
const orderedChars = ["[A-Z]", "[a-z]", "[0-9]"].map((pattern) => pattern + "{1,4}").join("|")
const bulletMarkers = ["*", "-"].map((c) => "\\" + c).join("|")
const orderedMarkers = [".", ")"].map((c) => "\\" + c).join("|")

const listLikeRegex = new RegExp(
    `^\\s*(?:(?:[${bulletMarkers}])|(?:(${orderedChars})[${orderedMarkers}]))\\s+`
)

const isTextList = (elem: Element) =>
    elem.tagName === "P" && listLikeRegex.test(elem.textContent || "")

const LIST_STRUCTURE: Rule = {
    id: "list-structure",
    name: "List Structure",
    check: function (elem: Element) {
        const isList = isTextList(elem)
        console.log("isList", isList)
        const isFirst = elem.previousElementSibling
            ? !isTextList(elem.previousElementSibling)
            : true

        return !(isList && isFirst)
    },

    message: () => "Lists should be formatted as lists.",

    why: () =>
        "When markup is used that visually formats items as a list but does not indicate the list relationship, users may have difficulty in navigating the information.",

    link: "https://www.w3.org/TR/2016/NOTE-WCAG20-TECHS-20161007/H48",
    linkText: () => "Learn more about using lists",
}

const isHtag = (elem: Element) => {
    const allHTags: { [key: string]: boolean } = {
        H1: true,
        H2: true,
        H3: true,
        H4: true,
        H5: true,
        H6: true,
    }
    return elem && allHTags[elem.tagName] === true
}

// gets the H tag that is furthest down in the tree from elem(inclusive)
const getHighestOrderHForElem = (elem: Element) => {
    const allHForElem = Array.prototype.slice.call(elem.querySelectorAll("H1,H2,H3,H4,H5,H6"))
    if (allHForElem.length > 0) {
        return allHForElem.reverse()[0]
    }
    if (isHtag(elem)) {
        return elem
    }
    return undefined
}

// gets all siblings of elem that come before the elem ordered by nearest to
// elem
const getPrevSiblings = (elem: Element) => {
    const ret: Element[] = []
    if (!elem || !elem.parentElement || !elem.parentElement.children) {
        return ret
    }
    const sibs = elem.parentElement.children
    for (let i = 0; i < sibs.length; i++) {
        if (sibs[i] === elem) {
            break
        }
        ret.unshift(sibs[i])
    }
    return ret
}

const searchPrevSiblings = (elem: Element) => {
    const sibs = getPrevSiblings(elem)
    let ret
    for (let i = 0; i < sibs.length; i++) {
        ret = getHighestOrderHForElem(sibs[i])
        if (ret) {
            break
        }
    }
    return ret
}

const _walkUpTree = (elem: Element | null): Element | undefined => {
    let ret: Element | undefined
    if (!elem || elem.tagName === "BODY") {
        return undefined
    }
    if (isHtag(elem)) {
        return elem
    }
    ret = searchPrevSiblings(elem)
    if (!ret) {
        ret = _walkUpTree(elem.parentElement)
    }
    return ret
}

const walkUpTree = (elem: Element) => {
    let ret = searchPrevSiblings(elem)
    if (!ret) {
        ret = _walkUpTree(elem.parentElement)
    }
    return ret
}

const getPriorHeading = (elem: Element) => {
    return walkUpTree(elem)
}

// a valid prior H tag is greater or equal to one less than current
const getValidHeadings = (elem: Element) => {
    const hNum = +elem.tagName.substring(1)
    const ret: { [key: string]: boolean } = {}
    for (let i = hNum - 1; i <= 6; i++) {
        ret[`H${i}`] = true
    }
    return ret
}

const HEADINGS_SEQUENCE: Rule = {
    id: "headings-sequence",
    name: "Headings Sequence",
    check: (elem) => {
        const testTags: { [key: string]: boolean } = {
            H2: true,
            H3: true,
            H4: true,
            H5: true,
            H6: true,
        }
        if (testTags[elem.tagName] !== true) {
            return true
        }
        const validHeadings = getValidHeadings(elem)
        const priorHeading = getPriorHeading(elem)
        if (priorHeading) {
            return validHeadings[priorHeading.tagName]
        }
        return true
    },

    message: () => "Heading levels should not be skipped.",

    why: () =>
        "Sighted users browse web pages quickly, looking for large or bolded headings. Screen reader users rely on headers for contextual understanding. Headers should use the proper structure.",

    link: "https://www.w3.org/TR/WCAG20-TECHS/G141.html",
    linkText: () => "Learn more about organizing page headings",
}

export const CHECKER_RULES: Rule[] = [IMG_ALT, LIST_STRUCTURE, HEADINGS_SEQUENCE]
