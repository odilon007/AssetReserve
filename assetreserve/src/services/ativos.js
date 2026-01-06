const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const tableName = 'ativos'

export default async function fetchAtivos() {
  const response = await fetch(
    `${supabaseUrl}/rest/v1/${tableName}?select=*`,
    {
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        Accept: 'application/json',
      },
    }
  )

  if (!response.ok) {
    const errorText = await response.text()
    console.error('STATUS:', response.status)
    console.error('ERRO SUPABASE:', errorText)
    throw new Error(`Erro ${response.status}: ${errorText}`)
  }

  const data = await response.json()
  console.log('DADOS:', data)
  return data
}
