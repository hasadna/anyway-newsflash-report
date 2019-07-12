const NEWS_FLASH_API = "/api/news-flash";

export async function getNewsFlashes() {
  const res = await fetch(NEWS_FLASH_API);
  return await res.json();
}

export async function getNewsFlash(id: number) {
  const url = `${NEWS_FLASH_API}?id=${id}`;
  const res = await fetch(url);
  return await res.json();
}
