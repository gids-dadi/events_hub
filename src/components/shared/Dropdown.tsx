import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { startTransition, useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "../ui/input";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createCategory, getAllCategories } from "@/api/category";
import { toast } from "sonner";

type DropdownProps = {
  onChangeHandler?: () => void;
  value?: string;
};
interface ICategory {
  _id: string;
  name: string;
}

export default function Dropdown({ onChangeHandler, value }: DropdownProps) {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [newCategory, setNewCategory] = useState("");

  const categoryMutation = useMutation({
    mutationFn: createCategory,
    onSuccess: (data) => {
      toast.success("Category added successfully");
    },
    onError: (error) => {
      toast.error(error.message || "An error occurred");
    },
  });

  const handleAddCategory = () => {
    categoryMutation.mutate({ name: newCategory });
    // createCategory({ name: newCategory }).then((category) => {
    //   setCategories((prevState) => [...prevState, category]);
    // });
  };

  // const categoriesQuery = useQuery({
  //   queryKey: ["categories"],
  //   queryFn: getAllCategories,
  // });

  // useEffect(() => {
  //   if (categoriesQuery.isSuccess) {
  //     setCategories(categoriesQuery.data);
  //   }
  // }, [categoriesQuery.isSuccess, categoriesQuery.data]);
  useEffect(() => {
    const allCategoriesFunc = async () => {
      const allCategories = await getAllCategories();

      allCategories && setCategories(allCategories as ICategory[]);
    };
    allCategoriesFunc();
  }, [newCategory, setCategories]);

  return (
    <>
      <Select onValueChange={onChangeHandler} defaultValue={value}>
        <SelectTrigger className="select-field">
          <SelectValue placeholder="Event category" />
        </SelectTrigger>
        <SelectContent>
          {categories.length > 0 &&
            categories?.map((category) => (
              <SelectItem
                key={category._id}
                value={category._id}
                className="select-item p-regular-14"
              >
                {category.name}
              </SelectItem>
            ))}

          <AlertDialog>
            <AlertDialogTrigger className="p-medium-14 flex w-full rounded-sm py-3 pl-8 text-gray-300 italics hover:bg-primary-50 focus:text-primary-500">
              New Category
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-white">
              <AlertDialogHeader>
                <AlertDialogTitle>New Category</AlertDialogTitle>
                <AlertDialogDescription>
                  <Input
                    type="text"
                    placeholder="Category name"
                    className="input-field mt-3"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                  />
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => startTransition(handleAddCategory)}
                >
                  Add
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </SelectContent>
      </Select>
    </>
  );
}
