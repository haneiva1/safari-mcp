import { execSync, ExecSyncOptionsWithStringEncoding } from 'child_process'
const OPTS: ExecSyncOptionsWithStringEncoding = { encoding: 'utf8', timeout: 10000 }
export function runJXA(script: string): string {
  try {
    const oneLine = script.replace(/\n/g, ' ').replace(/'/g, "'\\''")
    return execSync(`osascript -l JavaScript -e '${oneLine}'`, OPTS).trim()
  } catch (err: any) {
    throw new Error(`JXA: ${err.stderr?.toString().trim() || err.message}`)
  }
}
export function safariJS(code: string): string {
  const escaped = code.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, ' ')
  return runJXA(`String(Application('Safari').doJavaScript('${escaped}', { in: Application('Safari').windows[0].currentTab }))`)
}
export function checkSafari(): void {
  const running = runJXA(`Application('System Events').processes.whose({ name: { _equals: 'Safari' } }).length > 0`)
  if (running !== 'true') throw new Error('Safari is not running. Open Safari first.')
}
export function sleep(ms: number) { execSync(`sleep ${ms / 1000}`) }
