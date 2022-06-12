import React from "react";
import { ICategory } from "../../features/products/categorySlice";
import ButtonOrLink from "../ui/ButtonOrLink";

const Categories: React.FC<{ categories: ICategory[] | null }> = ({ categories }) => {
  console.log(categories);
  return (
    <div className="flex flex-col items-start justify-start">
      <p className="pb-1 text-lg tracking-wide text-white text-bold leading">All Categories</p>
      {categories?.map((category, index) => (
        <ButtonOrLink
          className="inline-flex pb-2 font-thin leading-6 align-middle opacity-70 hover:opacity-100"
          key={index}
          href={`category/${category.id}`}
        >
          {category.name}
        </ButtonOrLink>
      ))}
    </div>
  );
};

export default Categories;
