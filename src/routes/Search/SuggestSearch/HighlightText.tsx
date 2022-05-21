import { v4 } from 'uuid'

interface Props {
  query: string
  text: string
}

const HighlightText = ({ text, query }: Props) => {
  if (!query.trim()) return <span>text</span>

  const regex = new RegExp(query, 'gi')
  const splitedText = text.split(regex)
  const highlightedText = splitedText.reduce((acc: (string | JSX.Element)[], cur, i) => {
    if (i === 0) {
      acc.push(cur)

      return acc
    }
    acc.push(
      <strong key={v4()} style={{ fontWeight: 900 }}>
        {query}
      </strong>
    )
    acc.push(cur)

    return acc
  }, [])

  return <span>{highlightedText}</span>
}

export default HighlightText
