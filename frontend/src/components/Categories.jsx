import { categories } from "../data";
import CategoryItem from "./CategoryItem";

const Categories = () => {
  return (
    <div className="flex flex-wrap justify-center p-5 lg:p-10">
      {categories.map((item) => (
        <div className="m-2" key={item.id}> {/* Adjusted margin for spacing */}
          <CategoryItem item={item} />
        </div>
      ))}
    </div>
  );
};

export default Categories;
