export function publicError(error:unknown){
  const message=error instanceof Error?error.message:String(error);
  if(/relation .* does not exist|worker_state|alerts/i.test(message))return{code:'DATABASE_SCHEMA_MISSING',message:'Las tablas de Neon no existen en la base configurada. Ejecuta migrations/001_initial.sql en esa misma DATABASE_URL.'};
  if(/database|connect|fetch failed|password|certificate|ENOTFOUND|ECONN/i.test(message))return{code:'DATABASE_CONNECTION_FAILED',message:'No fue posible conectar con Neon. Revisa DATABASE_URL y vuelve a desplegar.'};
  if(/Missing environment variable/i.test(message))return{code:'ENVIRONMENT_VARIABLE_MISSING',message:'Falta una variable obligatoria en Vercel. Revisa DATABASE_URL, API_TOKEN y CRON_SECRET.'};
  return{code:'INTERNAL_ERROR',message:'La función falló. Revisa Function Logs en Vercel.'};
}
