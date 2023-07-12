import Blockquote from "@tiptap/extension-blockquote"
import Bold from "@tiptap/extension-bold"
import BulletList from "@tiptap/extension-bullet-list"
import { Color } from "@tiptap/extension-color"
import Document from "@tiptap/extension-document"
import Gapcursor from "@tiptap/extension-gapcursor"
import { Heading } from "@tiptap/extension-heading"
import History from "@tiptap/extension-history"
import Image from "@tiptap/extension-image"
import Italic from "@tiptap/extension-italic"
import ListItem from "@tiptap/extension-list-item"
import OrderedList from "@tiptap/extension-ordered-list"
import Paragraph from "@tiptap/extension-paragraph"
import TextExtension from "@tiptap/extension-text"
import TextStyle from "@tiptap/extension-text-style"
import Underline from "@tiptap/extension-underline"

import { LineFocusExtension } from "./views/author/editor/LineFocusExtension"
import { McqExtension } from "./views/author/editor/McqExtenstion"

export const PORT = 8080
export const URL = `http://localhost:${PORT}/`

export const EDITOR_SAMPLE = `
    <h1>Typography should be easy</h1>
    <p></p>
    <p>So that's a header for you — with any luck if we've done our job correctly that will look pretty reasonable.</p>
    <p></p>
    <p><strong>Something a wise person once told me about typography is:</strong></p>
    <p></p>

    Typography is pretty important if you don't want your stuff to look like trash. Make it good then it won't be bad.

    It's probably important that images look okay here by default as well:
`
export const EDITOR_OBJ = {
    type: "doc",
    content: [
        {
            type: "heading",
            attrs: { level: 1 },
            content: [{ type: "text", text: "Typography should be easy" }],
        },
        { type: "paragraph" },
        {
            type: "paragraph",
            content: [
                {
                    type: "text",
                    text: "So that's a header for you — with any luck if we've done our job correctly that will look pretty reasonable.",
                },
            ],
        },
        { type: "paragraph" },
        {
            type: "paragraph",
            content: [
                {
                    type: "text",
                    marks: [{ type: "bold" }],
                    text: "Something a wise person once told me about typography is:",
                },
            ],
        },
        { type: "paragraph" },
        {
            type: "paragraph",
            content: [
                {
                    type: "text",
                    text: " Typography is pretty important if you don't want your stuff to look like trash. Make it good then it won't be bad. It's probably important that images look okay here by default as well:",
                },
            ],
        },
    ],
}

export const DISABILITIES = [
    { code: "BLND", name: "Blind" },
    { code: "DYSLX", name: "Dyslexia" },
    { code: "PRTSIG", name: "Partially Sighted" },
]

export const EDITOR_JSON_SAMPLE = JSON.stringify(EDITOR_OBJ)
export const EDITOR_PARSED_JSON = JSON.parse(EDITOR_JSON_SAMPLE)

export const JWT_TOKEN = "jwt_token"
export const TYPE = "type"
export const USE_STATIC_JWT = import.meta.env.VITE_USE_STATIC_JWT
export const AUTHOR_JWT = import.meta.env.VITE_AUTHOR_JWT
export const STUDENT_JWT = import.meta.env.VITE_STUDENT_JWT
export const SAMPLE_BOOK_ID = import.meta.env.VITE_SAMPLE_BOOK_ID
export const SAMPLE_CHAPTER_ID = import.meta.env.VITE_SAMPLE_CHAPTER_ID

export const BASE_EDITOR_EXTENSIONS = [
    Document,
    Paragraph,
    TextExtension,
    Bold,
    Heading,
    Italic,
    Underline,
    History,
    BulletList,
    ListItem,
    OrderedList,
    Blockquote,
    Gapcursor,
    Color,
    TextStyle,
    Image,
    McqExtension,
    LineFocusExtension,
]
