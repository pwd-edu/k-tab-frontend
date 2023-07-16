import { Box, Button, Select, clsx } from "@mantine/core"
import { NodeViewProps, NodeViewWrapper } from "@tiptap/react"
import { LanguageName, langNames, loadLanguage } from "@uiw/codemirror-extensions-langs"
import CodeMirror from "@uiw/react-codemirror"
import axios from "axios"
import { useState } from "react"
import { toast } from "react-toastify"

export const CodeRun = (props: NodeViewProps) => {
    const editable = props.editor.isEditable
    const [code, setCode] = useState(props.node.attrs.code)
    const [language, setLanguage] = useState(props.node.attrs.language)
    const [error, setError] = useState("")
    const [isException, setIsException] = useState(false)
    const [result, setResult] = useState("")

    const runCode = async (code: string, language: string) => {
        const options = {
            method: "POST",
            url: "https://onecompiler-apis.p.rapidapi.com/api/v1/run",
            headers: {
                "content-type": "application/json",
                "X-RapidAPI-Key": import.meta.env.VITE_CODE_API_KEY as string,
                "X-RapidAPI-Host": import.meta.env.VITE_CODE_API_URL as string,
            },
            data: {
                language: language,
                stdin: "Peter",
                files: [
                    {
                        name: `main.${language}`,
                        content: code,
                    },
                ],
            },
        }

        try {
            const response = await axios.request(options)
            setResult(response.data.stdout)
            setError(response.data.stderr)
            if (response.data.exception) {
                setIsException(true)
            } else {
                setIsException(false)
            }
        } catch (error) {
            toast.error("Cannot run code")
        }
    }

    return (
        <NodeViewWrapper contentEditable={false} className="my-4 flex justify-center">
            <Box
                className={clsx(
                    "flex w-3/4 flex-col gap-2 rounded-md border-2 border-gray-200 p-2"
                )}
            >
                <RunCodeBar
                    defaultLanguage={props.node.attrs.language}
                    onRun={() => {
                        runCode(code, language)
                    }}
                    onLanguageChange={(lang) => {
                        setLanguage(lang)
                        props.updateAttributes({
                            language: lang,
                        })
                    }}
                />
                <CodeMirror
                    value={code}
                    minHeight={"100px"}
                    maxHeight={"500px"}
                    extensions={[loadLanguage(language)!].filter(Boolean)}
                    className={clsx("border border-gray-200")}
                    basicSetup={{
                        lineNumbers: true,
                        foldGutter: true,
                        tabSize: 4,
                    }}
                    onChange={(value) => {
                        setCode(value)
                    }}
                    editable={editable}
                    onBlur={() => {
                        props.updateAttributes({
                            code: code,
                        })
                    }}
                />
                <RunCodeResult result={result} error={error} isError={isException} />
            </Box>
        </NodeViewWrapper>
    )
}

interface RunCodeBarProps {
    defaultLanguage: string
    onLanguageChange: (value: string) => void
    onRun: () => void
}

const RunCodeBar = ({ defaultLanguage, onLanguageChange, onRun }: RunCodeBarProps) => {
    return (
        <Box className="flex items-center justify-between">
            <SelectLanguage defaultLanguage={defaultLanguage} onLanguageChange={onLanguageChange} />
            <ButtonRun onRun={onRun} />
        </Box>
    )
}

const LANGUAGES = [
    { value: "python", label: "Python" },
    { value: "javascript", label: "JavaScript" },
    { value: "c", label: "C" },
    { value: "cpp", label: "C++" },
    { value: "java", label: "Java" },
    { value: "go", label: "Go" },
    { value: "rust", label: "Rust" },
]

const SelectLanguage = ({ defaultLanguage, onLanguageChange }: any) => {
    const [language, setLanguage] = useState(defaultLanguage)
    return (
        <Select
            data={LANGUAGES}
            value={language}
            radius="xl"
            onChange={(value) => {
                setLanguage(value)
                onLanguageChange(value)
            }}
        />
    )
}

const ButtonRun = ({ onRun }: any) => {
    return (
        <Button
            color="blue"
            variant="light"
            onClick={() => {
                onRun()
            }}
        >
            Run
        </Button>
    )
}

interface RunCodeResultProps {
    result: string
    error: string
    isError: boolean
}

const RunCodeResult = ({ result, isError, error }: RunCodeResultProps) => {
    return (
        <pre className="m-0 rounded-md border border-gray-200 bg-gray-100 p-2">
            {isError ? (
                <span className="text-red-500">{error}</span>
            ) : (
                <span className="text-green-500">{result}</span>
            )}
        </pre>
    )
}
