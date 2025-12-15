console.log('URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log('KEY:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const tableName = 'ativos';  // O nome da sua tabela no Supabase

export default async function fetchAtivos() {
  const response = await fetch(`${supabaseUrl}/rest/v1/${tableName}`, {
    method: 'GET',  // Tipo da requisição
    headers: {
      'apikey': supabaseKey,  // Chave de autenticação
      'Authorization': `Bearer ${supabaseKey}`,  // Autorização do Bearer
      'Content-Type': 'application/json',  // Tipo de conteúdo
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Erro ao buscar dados: ${response.statusText}`);
  }

  const data = await response.json();  // Converte a resposta para JSON
  console.log(data);  // Exibe os dados no console ou os usa como necessário
  return data;
}

