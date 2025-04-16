import { replaceMongoId } from "@/lib/convertData";
import { Category } from "@/models/category-model";

// get categories
export async function getCategories() {
  const categories = await Category.find({}).lean();
  return replaceMongoId(categories);
}

// get category details
export async function getCategoryDetails(categoryId) {
  const category = await Category.findById(categoryId).lean();
  return replaceMongoId(category);
}
