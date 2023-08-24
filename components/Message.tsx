import ReactMarkdown from 'react-markdown'
import Editor from 'react-simple-code-editor'
import { highlight, languages } from 'prismjs'
import { useState } from 'react'
import { User } from 'lucide-react'
import Image from 'next/image'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-javascript'
import 'prismjs/themes/prism.css' //Example style, you can use another

export default function Message({ m }) {
  if (m.role === 'user') {
    return <><User width={24} />{m.content}</>
  } else {
    return <><Image src="/remix.svg" width="24" height="24" alt="remix logo" /><MessageRender>{m.content}</MessageRender></>
  }
}

function MessageRender({ children }: { children: any }) {
  const [copied, setCopied] = useState(false)
  return (
    <div className="flex-1 relative overflow-auto">
      <ReactMarkdown
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '')
            return !inline && match ? (
              <div className="rounded-md overflow-hidden border border-black">
                <div className="flex justify-between items-center py-2 px-4 bg-black text-white">
                  <span className="text-sm">{match[1]}</span>
                  <button
                    type="button"
                    onClick={async () => {
                      await navigator.clipboard.writeText(
                        String(children).replace(/\n$/, '')
                      )
                      setCopied(true)
                      setTimeout(() => {
                        setCopied(false)
                      }, 2000)
                    }}
                  >
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <Editor
                  disabled={true}
                  value={String(children).replace(/\n$/, '')}
                  highlight={(code) =>
                    highlight(code, languages.javascript, 'js')
                  }
                  padding={10}
                  placeholder="Generated code will appear here"
                  style={{
                    fontFamily: '"Fira code", "Fira Mono", monospace',
                    fontSize: 12,
                    width: '100%',
                    height: '100%',
                  }}
                />
              </div>
            ) : (
              <code {...props} className={className}>
                {children}
              </code>
            )
          },
        }}
      >
        {children || 'Hey...'}
      </ReactMarkdown>
    </div>
  )
}
