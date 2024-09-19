import { useTheme } from "next-themes";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  oneDark,
  oneLight,
} from "react-syntax-highlighter/dist/cjs/styles/prism";

export function CodeBlock({
  code,
  language,
}: {
  code: string;
  language: string;
}) {
  const { resolvedTheme } = useTheme();

  const baseTheme = resolvedTheme === "dark" ? oneDark : oneLight;

  // Create a custom theme by removing the background
  const customTheme = {
    ...baseTheme,
    'pre[class*="language-"]': {
      ...baseTheme['pre[class*="language-"]'],
      background: "transparent",
    },
    'code[class*="language-"]': {
      ...baseTheme['code[class*="language-"]'],
      background: "transparent",
    },
  };

  return (
    <SyntaxHighlighter
      language={language}
      style={customTheme}
      customStyle={{
        background: "transparent",
        padding: "0",
        margin: "0",
      }}
    >
      {code}
    </SyntaxHighlighter>
  );
}
