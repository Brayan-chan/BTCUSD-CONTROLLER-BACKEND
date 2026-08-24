import{timingSafeEqual}from'node:crypto';import{env}from'./env';
export const cors=env.allowedOrigin?{'Access-Control-Allow-Origin':env.allowedOrigin,Vary:'Origin'}:{};
export const json=(data:unknown,status=200)=>Response.json(data,{status,headers:{...cors,'Cache-Control':'no-store'}});
const equal=(a:string,b:string)=>a.length===b.length&&timingSafeEqual(Buffer.from(a),Buffer.from(b));
export const apiAuthorized=(r:Request)=>equal(r.headers.get('authorization')?.replace(/^Bearer\s+/i,'')??'',env.apiToken);
export const cronAuthorized=(r:Request)=>equal(r.headers.get('x-cron-secret')??'',env.cronSecret);
export const options=()=>env.allowedOrigin?new Response(null,{status:204,headers:{...cors,'Access-Control-Allow-Headers':'Authorization, Content-Type','Access-Control-Allow-Methods':'GET, POST, OPTIONS'}}:new Response(null,{status:403});
