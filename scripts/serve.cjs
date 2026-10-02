const http=require('node:http');
const fs=require('node:fs');
const path=require('node:path');
const root=path.resolve(__dirname,'..');
const port=Number(process.env.PORT)||4173;
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.json':'application/json'};
http.createServer((req,res)=>{
  let url;try{url=decodeURIComponent(new URL(req.url,'http://localhost').pathname);}catch{res.writeHead(400);return res.end();}
  if(url==='/__test/mobile'){
    res.writeHead(200,{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store'});
    return res.end('<!doctype html><html><head><title>Starpath responsive check</title></head><body style="margin:0;padding:24px;background:#e8e9e8;font:16px sans-serif"><p>390 px · mobile layout check</p><iframe title="Mobile game" src="/?mode=practice&difficulty=deep&p=44" style="border:0;width:390px;height:960px"></iframe></body></html>');
  }
  const target=path.resolve(root,'.'+(url==='/'?'/index.html':url));
  if(!target.startsWith(root+path.sep)){res.writeHead(403);return res.end();}
  fs.readFile(target,(err,data)=>{if(err){res.writeHead(404);return res.end('Not found');}res.writeHead(200,{'Content-Type':mime[path.extname(target)]||'application/octet-stream','Cache-Control':'no-store'});res.end(data);});
}).listen(port,'127.0.0.1',()=>console.log(`Starpath: http://127.0.0.1:${port}`));
