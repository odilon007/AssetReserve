const supabaseUrl = '';
const supabaseKey = '';
const tableName = 'ativos';  // O nome da sua tabela no Supabase

async function fetchAtivos() {
  const response = await fetch(`${supabaseUrl}/rest/v1/${tableName}`, {
    method: 'GET',  // Tipo da requisição
    headers: {
      'apikey': supabaseKey,  // Chave de autenticação
      'Authorization': `Bearer ${supabaseKey}`,  // Autorização do Bearer
      'Content-Type': 'application/json',  // Tipo de conteúdo
    },
  });

  if (!response.ok) {
    throw new Error(`Erro ao buscar dados: ${response.statusText}`);
  }

  const data = await response.json();  // Converte a resposta para JSON
  console.log(data);  // Exibe os dados no console ou os usa como necessário
  return data;
}

fetchAtivos();
