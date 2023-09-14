'use client'

import ReactMarkdown from 'react-markdown'
import Editor from 'react-simple-code-editor'
import { highlight, languages } from 'prismjs'
import { useState } from 'react'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-javascript'
import 'prismjs/themes/prism.css' //Example style, you can use another

export function Content({ children }: { children: any }) {
  const [copied, setCopied] = useState(false)
  return (
    <div className="flex-1 px-1 ml-4 space-y-2">
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
                      await navigator.clipboard.writeText(String(children).replace(/\n$/, ''))
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
                  onValueChange={(v) => {}}
                  value={String(children).replace(/\n$/, '')}
                  highlight={(code) => highlight(code, languages.javascript, 'js')}
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
        {children}
      </ReactMarkdown>
    </div>
  )
}
