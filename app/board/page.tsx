import { fetchCategories } from '@lib/services';
import Board from '@ui/categories';

export default async function BoardPage() {
  const categories = await fetchCategories();

  return (
    <Board categories={categories} />
  );
}
