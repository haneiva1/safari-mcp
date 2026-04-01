import { runJXA, safariJS, checkSafari, sleep } from '../utils/jxa.js'
export class SafariBrowserTools {
  'safari_status'() {
    const running = (() => { try { return runJXA(`Application('System Events').processes.whose({ name: { _equals: 'Safari' } }).length > 0`) === 'true' } catch { return false } })()
    if (!running) return { running: false }
    return { running: true, url: runJXA(`Application('Safari').windows[0].currentTab.url()`), title: runJXA(`Application('Safari').windows[0].currentTab.name()`) }
  }
  'safari_open'({url}:{url?:string}={}) { runJXA(`Application('Safari').activate()`); if(url){const t=url.startsWith('http')?url:`https://${url}`;runJXA(`Application('Safari').windows[0].currentTab.url = '${t}'`);sleep(1000)} return {message:'Safari opened'} }
  'safari_navigate'({url}:{arl:string}) {
    checkSafari(); const t=url.startsWith('http')?url:`https://${url}`
    runJXA(`Application('Safari').windows[0].currentTab.url = '${t}'`)
    let attempts=0; while(attempts++<30){sleep(500);try{if(runJXA(`Application('Safari').windows[0].currentTab.loading()`)==='false')break}catch{}}
    return {url:runJXA(`Application('Safari').windows[0].currentTab.url()`),title:runJXA(`Application('Safari').windows[0].currentTab.name()`)}
  }
  'safari_go_back'({}){checkSafari();safariJS('history.back()');return {message:'Navigated back'}}
  'safari_go_forward'({}){checkSafari();safariJS('history.forward()');return {message:'Navigated forward'}}
  'safari_reload'({}){checkSafari();safariJS('location.reload()');return {message:'Page reloaded'}}
}
