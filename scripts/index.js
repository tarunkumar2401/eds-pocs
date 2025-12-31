export default function generateIndex(context) {
  const { document, url } = context;

  const courseElements = [...document.querySelectorAll('.courses-list > div')];
  const data = [];

  for (let i = 2; i < courseElements.length; i += 1) {
    const columns = courseElements[i].querySelectorAll('div');
    if (columns.length >= 8) {
      data.push({
        path: url.pathname,
        code: columns[0]?.textContent.trim(),
        title: columns[1]?.textContent.trim(),
        description: columns[2]?.textContent.trim(),
        type: columns[3]?.textContent.trim(),
        mode: columns[4]?.textContent.trim(),
        campus: columns[5]?.textContent.trim(),
        duration: columns[6]?.textContent.trim(),
        area: columns[7]?.textContent.replace(/["\n]/g, '').trim(),
      });
    }
  }

  return { data };
}