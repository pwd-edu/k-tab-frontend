export const PORT = 8080

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
export const EDITOR_JSON_SAMPLE = JSON.stringify(EDITOR_OBJ)
export const EDITOR_PARSED_JSON = JSON.parse(EDITOR_JSON_SAMPLE)
export const VALID_TOKEN = "<REPLACE_WITH_TOKEN_UNTIL_AUTH_IS_DONE>"
