import { useStatusBarItem } from 'reactive-vscode'

const bar = useStatusBarItem({
  text: `markdown translator:    `,
})

export default bar