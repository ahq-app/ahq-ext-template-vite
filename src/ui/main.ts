import './style.scss'
import refreshIcon from '~icons/lucide/refresh-cw?raw'

interface Project {
  name: string
  path: string
}

const app = document.querySelector<HTMLDivElement>('#app')!
app.innerHTML = `
  <div class="page">
    <h1 class="title">My Extension</h1>
    <button class="button" type="button">${refreshIcon} Get the current project</button>
    <p class="result"></p>
  </div>
`

const result = app.querySelector<HTMLParagraphElement>('.result')!
app.querySelector('button')!.addEventListener('click', async () => {
  const project = (await window.ahq.call('project.getCurrent')) as Project | null
  result.textContent = project ? `${project.name} (${project.path})` : 'No project is selected'
})
