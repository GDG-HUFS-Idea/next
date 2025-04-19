interface data {
  problem: string
  solution: string
}

export async function postIdeaInput(data: data) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/projects/analyses/overview`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_USER_JWT}`,
      },
      body: JSON.stringify(data),
    }
  )
  if (!res.ok) {
    console.log(res)
  }
  return res.json()
}
