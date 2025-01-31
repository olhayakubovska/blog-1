

export const getLastPageFromLinks = (links) => {
  // Проверяем, что 'links' не является null и является строкой
  if (!links || typeof links !== "string") {
    return null;
  }

  // Выполняем поиск с использованием регулярного выражения
  const result = links.match(/_page=(\d{1,4})&_limit=\d{1,3}>; rel="last"/);

  // Проверяем, что регулярное выражение вернуло результат
  if (!result) {
    return null;
  }

  // Возвращаем номер последней страницы, преобразованный в число
  return result ? Number(result[1]) : 1;
};
