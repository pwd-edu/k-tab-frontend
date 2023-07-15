import _ from "lodash"

export interface Rule {
    id: string
    name: string
    check: (elem: Element) => boolean
    data: (elem: Element) => any
    message: (data?: any) => string
    why: (data?: any) => string
    link: string
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

export const CHECKER_RULES = [IMG_ALT]
