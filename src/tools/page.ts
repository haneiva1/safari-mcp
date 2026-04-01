import { safariJS, checkSafari, sleep } from '../utils/jxa.js'
import { execSync } from 'child_process'
export class SafariPageTools {
  'safari_get_page'(){checkSafari();return{url:safariJS('location.href'),title:safariJS('document.title'),text:safariJS('document.body?document.body.innerText.slice(0,6000):"" ')}}
  'safari_run_javascript'({code}:{code:string}){checkSafari();return{result:safariJS(code)}}
  'safari_get_element'({selector}:{selector:string}){checkSafari();const e=safariJS("!!document.querySelector('"+selector+"')")==='true';if(!e)return{found:false,selector};return{found:true,selector,text:safariJS("(document.querySelector('"+selector+"')||{}).innerText||''")}  }
  'safari_click'({selector}:{selector:string}){checkSafari();if(safariJS("!!document.querySelector('"+selector+"')")!=='true')throw new Error('Element not found: '+selector);safariJS("document.querySelector('"+selector+"').click()");return{message:'Clicked: '+selector}}
  'safari_fill'({selector,value}:{selector:string;value:string}){checkSafari();const v=value.replace(/'/g,"\'");safariJS("const el=document.querySelector('"+selector+"');if(el){el.focus();el.value='"+v+"';el.dispatchEvent(new Event('input',{bubbles:true}))}");return{message:'Filled: '+selector}}
  'safari_scroll'({direction='down',amount=400}:{direction?:'up'|'down'|'top'|'bottom';amount?:number}={}){checkSafari();const m={up:'window.scrollBy(0,-'+amount+')',down:'window.scrollBy(0,'+amount+')',top:'window.scrollTo(0,0)',bottom:'window.scrollTo(0,document.body.scrollHeight)'};safariJS(m[direction]);return{message:'Scrolled '+direction}}
  'safari_get_links'(){checkSafari();return{links:JSON.parse(safariJS('JSON.stringify(Array.from(document.querySelectorAll("a[href]")).slice(0,40).map(a=>({text:a.innerText.trim().slice(0,80),href:a.href})).filter(l=>l.text&&l.href))')||'[]')}}
  'safari_wait_for_element'({selector,timeout=5000}:{selector:string;timeout?:number}){checkSafari();const d=Date.now()+timeout;while(Date.now()<d){if(safariJS("!!document.querySelector('"+selector+"')")==='true')return{found:true,selector};sleep(300)}return{found:false,selector}}
  'safari_screenshot'(){checkSafari();const tmp='/tmp/safari-'+Date.now()+'.png';execSync('screencapture -l$(osascript -e \'tell app "Safari" to id of window 1\') "'+tmp+'"');const b64=execSync('base64 -i "'+tmp+'"').toString().replace(/\s/g,'');execSync('rm "'+tmp+'"');return{mimeType:'image/png',base64:b64}}
}
